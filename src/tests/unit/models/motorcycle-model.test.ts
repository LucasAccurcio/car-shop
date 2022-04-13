import { expect } from 'chai';
import mongoose from 'mongoose';
import * as sinon from 'sinon';
import data from '../mocks/dataMotorcycle';

import MotorcycleModel from '../../../models/Motorcycle';

describe('Teste da camada motorcycleModel', () => {
  const motorcycleModel = new MotorcycleModel();

  describe('Motorcycle - função delete', () => {
    const id = '6254d007034e807781e282fd';
    
    before(() => {
      sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(null);
    });
    
    after(() => {
      sinon.restore();
    });

    
    it('deveria deletar um objeto passado por id, sem um retorno', async () => {
      const result = await motorcycleModel.delete(id);

      expect(result).to.be.equal(null);
    });
  });

  describe('Motorcycle - função read', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'find')
        .resolves(data.find);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria ler os dados gravados no banco de dados', async () => {
      const result = await motorcycleModel.read();

      expect(result).to.be.equal(data.find);
    });
  });

  describe('Motorcycle - função readOne', () => {
    const id = '6254d007034e807781e282fd';

      before(() => {
        sinon.stub(mongoose.Model, 'findOne')
        .resolves(data.findOne);
      });
      
      after(() => {
        sinon.restore();
      });

    it('deveria ler os dados gravados do ID informado', async () => {
      const result = await motorcycleModel.readOne(id);

      expect(result).to.be.equal(data.findOne);
    });
  });

  describe('Motorcycle - função Update', () => {
    const id = '6254d007034e807781e282fd';
    
      before(() => {
        sinon.stub(mongoose.Model, 'findOneAndUpdate')
        .resolves(data.updated);
      });
      
      after(() => {
        sinon.restore();
      });

    it('deveria atualizar os dados gravados no banco de dados', async () => {
      const result = await motorcycleModel.update(id, { ...data.objUpdate, category: "Trail" });

      expect(result).to.be.equal(data.updated);
    });
  });

  describe('Motorcycle - função Create', () => {
      before(() => {
        sinon.stub(mongoose.Model, 'create')
          .resolves(data.created);
      });
      
      after(() => {
        sinon.restore();
      });
    
    it('deveria cadastrar um novo veículo no banco de dados', async () => {
      const result = await motorcycleModel.create({ ...data.create, category: "Trail" });

      expect(result).to.be.equal(data.created);
    });
  });
});