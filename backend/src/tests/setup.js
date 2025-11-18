import { jest, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';
jest.setTimeout(30000);


const mockModelStaticMethods = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  bulkWrite: jest.fn(),
  updateOne: jest.fn(),
  countDocuments: jest.fn().mockResolvedValue(0),
  insertMany: jest.fn().mockResolvedValue([{}]) 
};


const mockModelInstanceMethods = {
  save: jest.fn().mockResolvedValue({ _id: 'mockSavedId' }),
};


const MockModel = jest.fn((data) => ({
  ...data,
  ...mockModelInstanceMethods, 
}));


Object.assign(MockModel, mockModelStaticMethods);


MockModel.prototype.save = mockModelInstanceMethods.save;


mongoose.model = jest.fn(() => MockModel);


mongoose.connect = jest.fn(() => Promise.resolve());
mongoose.startSession = jest.fn(() => ({
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(() => Promise.resolve()),
  abortTransaction: jest.fn(() => Promise.resolve()),
  endSession: jest.fn()
}));


beforeEach(() => {

  MockModel.mockClear();


  for (const key in mockModelStaticMethods) {
    mockModelStaticMethods[key].mockClear();
  }
  

  for (const key in mockModelInstanceMethods) {
    mockModelInstanceMethods[key].mockClear();
  }


  mockModelStaticMethods.countDocuments.mockResolvedValue(0);
  mockModelStaticMethods.insertMany.mockResolvedValue([{}]);
  mockModelInstanceMethods.save.mockResolvedValue({ _id: 'mockSavedId' });
});