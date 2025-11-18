import { describe, it, expect, afterEach, jest } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js'; 
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose'; 

// Mock de dados
const mockOrders = [
  { _id: '1', total: 100, status: 'Pago', items: [] },
  { _id: '2', total: 50, status: 'Pago', items: [] },
];

const mockProductsInDb = [
  { _id: 'prod1', name: 'Produto 1', price: 10, stock: 50, save: jest.fn() },
  { _id: 'prod2', name: 'Produto 2', price: 20, stock: 10, save: jest.fn() },
];

describe('API de Pedidos (/api/orders)', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste GET
  it('Deve buscar todos os pedidos', async () => {
    Order.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockOrders)
    });

    const res = await request(app).get('/api/orders');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
    expect(res.body[0].total).toEqual(100);
  });

  // Teste POST (Caminho Feliz)
  it('Deve criar um pedido e atualizar o estoque', async () => {
    const newOrderPayload = {
      total: 30,
      items: [
        { id: 'prod1', name: 'Produto 1', quantity: 1, price: 10 },
        { id: 'prod2', name: 'Produto 2', quantity: 1, price: 20 },
      ]
    };

    // Simula a busca de produtos no banco
    Product.find.mockReturnValue({
      session: jest.fn().mockResolvedValue(mockProductsInDb)
    });
    
   
    Product.bulkWrite.mockResolvedValue({});

  
    
    const res = await request(app).post('/api/orders').send(newOrderPayload);

    expect(res.statusCode).toEqual(201);
    expect(res.body.total).toEqual(30);
   
    expect(mongoose.startSession).toHaveBeenCalled();
  });

  // Teste POST (Estoque Insuficiente)
  it('Deve retornar 400 se o estoque for insuficiente', async () => {
    const newOrderPayload = {
      total: 30,
      items: [ { id: 'prod2', name: 'Produto 2', quantity: 100, price: 20 } ] // Estoque é 10
    };

 
    Product.find.mockReturnValue({
      session: jest.fn().mockResolvedValue(mockProductsInDb)
    });

    const res = await request(app).post('/api/orders').send(newOrderPayload);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Estoque insuficiente');

    expect(mongoose.startSession).toHaveBeenCalled();
  });
});