const request = require('supertest');
const app = require('../app'); // Importa o app (sem o .listen())
const Category = require('../models/Category'); // Importa o mock

// Mock de dados
const mockCategories = [
  { _id: 'bebidas', name: 'Bebidas', icon: 'Coffee', image_url: '...' },
  { _id: 'padaria', name: 'Padaria', icon: 'Sandwich', image_url: '...' },
];

describe('API de Categorias (/api/categories)', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste do GET (Caminho Feliz)
  it('Deve buscar todas as categorias', async () => {
    // Simula o Mongoose retornando os dados
    Category.find.mockResolvedValue(mockCategories);

    const res = await request(app).get('/api/categories');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toEqual(2);
    expect(res.body[0].name).toEqual('Bebidas');
  });

  // Teste do GET (Caminho Triste - Erro de Servidor)
  it('Deve retornar 500 se o banco de dados falhar', async () => {
    // Simula o Mongoose dando um erro
    Category.find.mockRejectedValue(new Error('Falha de conexão'));

    const res = await request(app).get('/api/categories');

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toContain('Erro ao buscar categorias');
  });
});