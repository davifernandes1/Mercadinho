// Arquivo: src/tests/settingsController.test.js

import { describe, it, expect, afterEach, jest } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js'; // Caminho corrigido
import Settings from '../models/Settings.js';

const SETTINGS_ID = "60d5f9f6e3b3c3b3c3b3c3b3"; // ID Fixo
const mockSettings = {
  _id: SETTINGS_ID,
  marketName: 'Meu Mercadinho',
  adminPin: '1234'
};

describe('API de Configurações (/api/settings)', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve buscar as configurações existentes', async () => {
    Settings.findById.mockResolvedValue(mockSettings);

    const res = await request(app).get('/api/settings');

    expect(res.statusCode).toEqual(200);
    expect(res.body.marketName).toEqual('Meu Mercadinho');
    expect(Settings.prototype.save).not.toHaveBeenCalled();
  });

  it('Deve criar as configurações se elas não existirem', async () => {
    Settings.findById.mockResolvedValue(null); // Simula não encontrar
    // O mock de 'prototype.save' já está no setup.js
    
    const res = await request(app).get('/api/settings');

    expect(res.statusCode).toEqual(200);
    expect(res.body.adminPin).toEqual('1234');
    expect(Settings.prototype.save).toHaveBeenCalled();
  });

  it('Deve atualizar as configurações', async () => {
    const updatedSettings = { ...mockSettings, marketName: 'Novo Nome' };
    Settings.findByIdAndUpdate.mockResolvedValue(updatedSettings);

    const res = await request(app)
      .put('/api/settings')
      .send({ marketName: 'Novo Nome', adminPin: '4321' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.marketName).toEqual('Novo Nome');
    expect(Settings.findByIdAndUpdate).toHaveBeenCalledWith(SETTINGS_ID, expect.any(Object), expect.any(Object));
  });
});