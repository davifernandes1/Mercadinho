import { jest, beforeEach } from '@jest/globals';
import mongoose from 'mongoose'; // Importa o Mongoose real

jest.setTimeout(30000);

// --- ESTRATÉGIA DE MOCK CORRIGIDA ---

// 1. Criamos "mocks" reutilizáveis para os MÉTODOS ESTÁTICOS
const mockModelStaticMethods = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  bulkWrite: jest.fn(),
  updateOne: jest.fn(),
  countDocuments: jest.fn().mockResolvedValue(0),
  insertMany: jest.fn().mockResolvedValue([{}]) // <-- ADICIONADO PARA CORRIGIR ERRO 1
};

// 2. Criamos "mocks" reutilizáveis para os MÉTODOS DE INSTÂNCIA
const mockModelInstanceMethods = {
  save: jest.fn().mockResolvedValue({ _id: 'mockSavedId' }),
};

// 3. Criamos o "Mock de Classe" (Construtor)
// Isso é o que `new Product()` ou `new Order()` vai fazer
const MockModel = jest.fn((data) => ({
  ...data,
  ...mockModelInstanceMethods, // Anexa os métodos de instância (ex: .save())
}));

// 4. Anexamos os métodos estáticos ao Construtor
// (ex: Product.find(), Order.findById())
Object.assign(MockModel, mockModelStaticMethods);

// 5. Anexamos o mock de 'save' ao protótipo
// <-- ADICIONADO PARA CORRIGIR ERRO 2
// Isso permite que o test-file verifique `Settings.prototype.save`
MockModel.prototype.save = mockModelInstanceMethods.save;

// 6. Mandamos o Mongoose usar nosso "Mock de Classe"
mongoose.model = jest.fn(() => MockModel);

// 7. Simulamos as funções de conexão e transação
mongoose.connect = jest.fn(() => Promise.resolve());
mongoose.startSession = jest.fn(() => ({
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(() => Promise.resolve()),
  abortTransaction: jest.fn(() => Promise.resolve()),
  endSession: jest.fn()
}));

// 8. Limpa todos os mocks antes de cada teste
beforeEach(() => {
  // Limpa o construtor (ex: `new Product()`)
  MockModel.mockClear();

  // Limpa todos os métodos estáticos
  for (const key in mockModelStaticMethods) {
    mockModelStaticMethods[key].mockClear();
  }
  
  // Limpa todos os métodos de instância
  for (const key in mockModelInstanceMethods) {
    mockModelInstanceMethods[key].mockClear();
  }

  // Redefine implementações padrão
  mockModelStaticMethods.countDocuments.mockResolvedValue(0);
  mockModelStaticMethods.insertMany.mockResolvedValue([{}]);
  mockModelInstanceMethods.save.mockResolvedValue({ _id: 'mockSavedId' });
});