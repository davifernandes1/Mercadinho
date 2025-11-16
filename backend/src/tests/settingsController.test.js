const request = require('supertest');
const app = require('../app');
const Settings = require('../models/Settings'); // Importa o mock

// ID Fixo que o controlador usa
const SETTINGS_ID = "60d5f9f6e3b3c3b3c3b3c3b3";

describe('API de Configurações (/api/settings)', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // --- Teste do GET (Caminho Feliz - Encontrado) ---
  it('Deve buscar as configurações existentes', async () => {
    const mockSettings = { _id: SETTINGS_ID, marketName: 'Meu Mercadinho', adminPin: '1234' };
    Settings.findById.mockResolvedValue(mockSettings);

    const res = await request(app).get('/api/settings');

    expect(res.statusCode).toEqual(200);
    expect(res.body.marketName).toEqual('Meu Mercadinho');
    expect(Settings.prototype.save).not.toHaveBeenCalled();
  });

  // --- Teste do GET (Caminho Feliz - Criar Pela Primeira Vez) ---
  it('Deve criar as configurações se elas não existirem', async () => {
    Settings.findById.mockResolvedValue(null); // Simula não encontrar
    Settings.prototype.save.mockResolvedValue({ _id: SETTINGS_ID, adminPin: '1234' });

    const res = await request(app).get('/api/settings');

    expect(res.statusCode).toEqual(200);
    expect(Settings.prototype.save).toHaveBeenCalled(); // Verifica se foi criado
  });

  // --- Teste do PUT (Caminho Feliz) ---
  it('Deve atualizar as configurações', async () => {
    const updatedSettings = { _id: SETTINGS_ID, marketName: 'Novo Nome', adminPin: '4321' };
    Settings.findByIdAndUpdate.mockResolvedValue(updatedSettings);

    const res = await request(app)
      .put('/api/settings')
      .send({ marketName: 'Novo Nome', adminPin: '4321' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.marketName).toEqual('Novo Nome');
    expect(Settings.findByIdAndUpdate).toHaveBeenCalledWith(SETTINGS_ID, expect.any(Object), expect.any(Object));
  });
});