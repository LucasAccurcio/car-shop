import { expect } from 'chai';
import mongoose from 'mongoose';
import * as sinon from 'sinon';
import data from './mocks/data';

import CarModel from '../../../models/Car';
import MotorcycleModel from '../../../models/Motorcycle';
import MongoModel from '../../../models/MongoModel';

describe('Teste da camada CarModel', () => {
  const carModel = new CarModel();

  describe('Car - função delete', () => {
    const id = '6254d007034e807781e282fd';
    
    sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(null);

    it('deveria deletar um objeto passado por id, sem um retorno', async () => {
      const result = await carModel.delete(id);

      expect(result).to.be.equal(null);
    });
  });

  describe('Car - função read', () => {
    sinon.stub(mongoose.Model, 'find')
      .resolves(data.find);

    it('deveria ler os dados gravados no banco de dados', async () => {
      const result = await carModel.read();

      expect(result).to.be.equal(data.find);
    });
  });

  describe('Car - função readOne', () => {
    const id = '6254d007034e807781e282fd';
    
    sinon.stub(mongoose.Model, 'findOne')
      .resolves(data.findOne);

    it('deveria ler os dados gravados do ID informado', async () => {
      const result = await carModel.readOne(id);

      expect(result).to.be.equal(data.findOne);
    });
  });

  describe('Car - função Update', () => {
    const id = '6254d007034e807781e282fd';
    
    sinon.stub(mongoose.Model, 'findOneAndUpdate')
      .resolves(data.update);

    it('deveria atualizar os dados gravados no banco de dados', async () => {
      const result = await carModel.update(id, data.objUpdate);

      expect(result).to.be.equal(data.update);
    });
  });
});