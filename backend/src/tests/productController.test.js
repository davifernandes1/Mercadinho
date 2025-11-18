import { describe, it, expect, afterEach, jest } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import Product from '../models/Product.js';

// Mock de dados
const mockProducts = [
  { _id: '1', name: 'Coca-Cola', price: 8.99, category: 'bebidas' },
  { _id: '2', name: 'Pão Francês', price: 0.75, category: 'padaria' },
];

describe('API de Produtos (/api/products)', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // --- TESTES DE LEITURA (GET) ---
  it('Deve buscar todos os produtos (GET)', async () => {
    Product.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockProducts)
    });

    const res = await request(app).get('/api/products');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
    expect(res.body[0].name).toEqual('Coca-Cola');
  });

  it('Deve lidar com erro ao buscar produtos', async () => {
    // Simula um erro no banco de dados para cair no catch(err)
    Product.find.mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error('Erro de conexão'))
    });

    const res = await request(app).get('/api/products');

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toBe('Erro ao buscar produtos');
  });

  // --- TESTES DE CRIAÇÃO (POST) ---
  it('Deve criar um novo produto (POST)', async () => {
    const newProduct = { name: 'Bolo', price: 10.00, stock: 5, category: 'padaria' };
    
    // Mock do save (método de instância)
    // O jest.fn() no setup.js já mocka o save, mas aqui reforçamos se necessário
    const res = await request(app).post('/api/products').send(newProduct);

    expect(res.statusCode).toEqual(201);
    expect(Product).toHaveBeenCalledWith(expect.objectContaining(newProduct));
  });

  it('Deve lidar com erro de validação ao criar produto', async () => {
    // Simula erro de validação do Mongoose
    const validationError = { name: 'ValidationError', message: 'Nome obrigatório' };
    
    // Mockando a implementação do construtor para lançar erro ao salvar
    Product.prototype.save.mockRejectedValueOnce(validationError);

    const res = await request(app).post('/api/products').send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Nome obrigatório');
  });

  // --- TESTES DE ATUALIZAÇÃO (PUT) ---
  it('Deve atualizar um produto existente (PUT)', async () => {
    const updateData = { price: 9.50 };
    const updatedProduct = { ...mockProducts[0], ...updateData };

    Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

    const res = await request(app).put('/api/products/1').send(updateData);

    expect(res.statusCode).toEqual(200);
    expect(res.body.price).toEqual(9.50);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, expect.any(Object));
  });

  it('Deve retornar 404 ao tentar atualizar produto inexistente', async () => {
    Product.findByIdAndUpdate.mockResolvedValue(null);

    const res = await request(app).put('/api/products/999').send({ price: 10 });

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Produto não encontrado');
  });

  // --- TESTES DE EXCLUSÃO (DELETE) ---
  it('Deve deletar um produto (DELETE)', async () => {
    Product.findByIdAndDelete.mockResolvedValue(mockProducts[0]);

    const res = await request(app).delete('/api/products/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Produto deletado com sucesso');
  });

  it('Deve retornar 404 ao tentar deletar produto inexistente', async () => {
    Product.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete('/api/products/999');

    expect(res.statusCode).toEqual(404);
  });
});