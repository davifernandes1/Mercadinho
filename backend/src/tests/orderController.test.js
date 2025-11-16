const request = require('supertest');
const app = require('../app');
const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose'); // Importamos o mock do mongoose

// Mock de dados
const mockCart = {
  items: [
    { id: 'prod1', name: 'Coca-Cola 2L', price: 10, quantity: 2, image: '...' },
    { id: 'prod2', name: 'Doritos', price: 5, quantity: 1, image: '...' }
  ],
  total: 25.00
};

const mockProductsInDb = [
  { _id: 'prod1', name: 'Coca-Cola 2L', price: 10, stock: 5 },
  { _id: 'prod2', name: 'Doritos', price: 5, stock: 10 }
];

describe('API de Pedidos (/api/orders)', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // --- Teste do POST (Caminho Feliz) ---
  it('Deve criar um pedido e abater o estoque', async () => {
    // Simula o Mongoose/DB
    Product.find.mockReturnValue({
      session: jest.fn().mockResolvedValue(mockProductsInDb)
    });
    Product.bulkWrite.mockResolvedValue({ nModified: 2 });
    Order.prototype.save.mockResolvedValue({ ...mockCart, _id: 'order123' });

    // Simula a transação (do setup.js)
    const mockSession = mongoose.startSession();

    const res = await request(app)
      .post('/api/orders')
      .send(mockCart);

    expect(res.statusCode).toEqual(201);
    expect(res.body._id).toEqual('order123');
    // Verifica se o estoque foi abatido
    expect(Product.bulkWrite).toHaveBeenCalledWith([
      { updateOne: { filter: { _id: 'prod1' }, update: { $inc: { stock: -2 } } } },
      { updateOne: { filter: { _id: 'prod2' }, update: { $inc: { stock: -1 } } } }
    ], { session: mockSession });
    // Verifica se a transação foi concluída
    expect(mockSession.commitTransaction).toHaveBeenCalled();
    expect(mockSession.abortTransaction).not.toHaveBeenCalled();
    expect(mockSession.endSession).toHaveBeenCalled();
  });

  // --- Teste do POST (Caminho Triste - Estoque Insuficiente) ---
  it('Deve retornar 400 se o estoque for insuficiente', async () => {
    // Simula um produto com estoque baixo
    const lowStockDb = [
      { _id: 'prod1', name: 'Coca-Cola 2L', price: 10, stock: 1 }, // Pedido quer 2
      { _id: 'prod2', name: 'Doritos', price: 5, stock: 10 }
    ];
    Product.find.mockReturnValue({
      session: jest.fn().mockResolvedValue(lowStockDb)
    });
    const mockSession = mongoose.startSession();

    const res = await request(app)
      .post('/api/orders')
      .send(mockCart);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Estoque insuficiente para Coca-Cola 2L');
    // Verifica se NADA foi salvo e a transação foi abortada
    expect(Order.prototype.save).not.toHaveBeenCalled();
    expect(Product.bulkWrite).not.toHaveBeenCalled();
    expect(mockSession.commitTransaction).not.toHaveBeenCalled();
    expect(mockSession.abortTransaction).toHaveBeenCalled();
  });

  // --- Teste do POST (Caminho Triste - Produto Não Encontrado) ---
  it('Deve retornar 400 se um produto não for encontrado', async () => {
    // Simula um produto que não existe mais
    const missingProductDb = [
      { _id: 'prod2', name: 'Doritos', price: 5, stock: 10 }
      // prod1 (Coca-Cola) está faltando
    ];
    Product.find.mockReturnValue({
      session: jest.fn().mockResolvedValue(missingProductDb)
    });
    const mockSession = mongoose.startSession();

    const res = await request(app)
      .post('/api/orders')
      .send(mockCart);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Produto Coca-Cola 2L não encontrado');
    expect(mockSession.abortTransaction).toHaveBeenCalled();
  });

  // --- Teste do GET (Caminho Feliz) ---
  it('Deve buscar o histórico de vendas', async () => {
    const mockOrders = [{ _id: 'order123', total: 25.00, items: [] }];
    Order.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockOrders)
    });

    const res = await request(app).get('/api/orders');

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].total).toEqual(25.00);
  });
});