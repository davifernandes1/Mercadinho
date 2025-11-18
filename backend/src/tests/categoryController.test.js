import { describe, it, expect, afterEach, jest } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js'; 
import Category from '../models/Category.js'; 


const mockCategories = [
  { _id: 'bebidas', name: 'Bebidas', icon: 'Coffee', image_url: '...' },
  { _id: 'padaria', name: 'Padaria', icon: 'Sandwich', image_url: '...' },
];

describe('API de Categorias (/api/categories)', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });


  it('Deve buscar todas as categorias', async () => {
    Category.find.mockResolvedValue(mockCategories);

    const res = await request(app).get('/api/categories');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toEqual(2);
    expect(res.body[0].name).toEqual('Bebidas');
  });

  // Teste do GET (Caminho Triste - Erro de Servidor)
  it('Deve retornar 500 se o banco de dados falhar', async () => {

    Category.find.mockRejectedValue(new Error('Falha de conexão'));

    const res = await request(app).get('/api/categories');

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toContain('Erro ao buscar categorias');
  });
});