// Aumenta o tempo limite de espera do Jest
jest.setTimeout(30000);

// --- CORREÇÃO PRINCIPAL ---
// Precisamos simular 'Schema' e 'model' ANTES de qualquer
// arquivo de modelo (Product, Order) ser importado.

const mongoose = require('mongoose');

// Simula as partes do mongoose que usamos nos Modelos
mongoose.Schema.Types = {
  ObjectId: jest.fn((id) => id || `new_id_${Math.random()}`),
};

mongoose.model = jest.fn((name) => {
  // Retorna um construtor mockado (ex: new Product())
  const MockModel = (data) => ({
    ...data,
    save: jest.fn().mockResolvedValue(data),
  });
  
  // Anexa funções estáticas (ex: Product.find())
  MockModel.find = jest.fn();
  MockModel.findById = jest.fn();
  MockModel.findByIdAndUpdate = jest.fn();
  MockModel.findByIdAndDelete = jest.fn();
  MockModel.bulkWrite = jest.fn();
  MockModel.updateOne = jest.fn();
  
  return MockModel;
});

// Simula a conexão e as transações
mongoose.connect = jest.fn(() => Promise.resolve());
mongoose.startSession = jest.fn(() => ({
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(() => Promise.resolve()),
  abortTransaction: jest.fn(() => Promise.resolve()),
  endSession: jest.fn()
}));

// Agora, "mocamos" os módulos de modelo para que eles usem
// o mongoose simulado acima.
jest.mock('../models/Product', () => mongoose.model('Product', new mongoose.Schema()));
jest.mock('../models/Order', () => mongoose.model('Order', new mongoose.Schema()));
jest.mock('../models/Category', () => mongoose.model('Category', new mongoose.Schema()));
jest.mock('../models/Settings', () => mongoose.model('Settings', new mongoose.Schema()));