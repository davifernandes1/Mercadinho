const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// READ all
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Mais recentes primeiro
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar histórico de vendas' });
  }
};

// CREATE Order (REGRA DE NEGÓCIO DE ESTOQUE)
exports.createOrder = async (req, res) => {
  const { items, total } = req.body;
  
  // Inicia uma "Sessão" do MongoDB para garantir que todas as operações
  // de estoque funcionem, ou nenhuma delas (Transação)
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Verificar estoque e preparar IDs
    const productIds = items.map(item => item.id);
    const productsInDb = await Product.find({ _id: { $in: productIds } }).session(session);

    let operations = []; // Operações de atualização de estoque
    let orderItems = []; // Itens para salvar no pedido

    for (const item of items) {
      const product = productsInDb.find(p => p._id.toString() === item.id);
      
      if (!product) {
        throw new Error(`Produto ${item.name} não encontrado`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Estoque insuficiente para ${product.name}. Só temos ${product.stock} em estoque.`);
      }

      // 2. Preparar a operação de atualização de estoque
      operations.push({
        updateOne: {
          filter: { _id: product._id },
          update: { $inc: { stock: -item.quantity } }
        }
      });

      // 3. Preparar o item para o documento do Pedido
      orderItems.push({
        product: product._id,
        name_at_sale: product.name,
        price_at_sale: product.price,
        quantity: item.quantity
      });
    }

    // 4. Executar todas as atualizações de estoque de uma vez
    await Product.bulkWrite(operations, { session });

    // 5. Criar e salvar o pedido
    const order = new Order({
      total: total,
      items: orderItems,
      status: 'Pago'
    });
    await order.save({ session });
    
    // 6. Se tudo deu certo, "comitar" a transação
    await session.commitTransaction();
    res.status(201).json(order);

  } catch (err) {
    // 7. Se algo deu errado, reverter (abortar) a transação
    await session.abortTransaction();
    console.error(err);
    // Retorna o erro específico (ex: "Estoque insuficiente...")
    res.status(400).json({ message: err.message || 'Erro ao processar pedido' });
  } finally {
    // 8. Fechar a sessão
    session.endSession();
  }
};