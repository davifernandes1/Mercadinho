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

  // Teste do GET (Caminho Feliz)
  it('Deve buscar todos os produtos', async () => {
    Product.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockProducts)
    });

    const res = await request(app).get('/api/products');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
    expect(res.body[0].name).toEqual('Coca-Cola');
  });

  // Teste do POST
  it('Deve criar um novo produto', async () => {
    const newProduct = { name: 'Bolo de Chocolate', price: 7.00, stock: 15, category: 'padaria' };
    

    
    const res = await request(app).post('/api/products').send(newProduct);

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('Bolo de Chocolate');
  
    expect(Product).toHaveBeenCalledWith(newProduct);
  });
});