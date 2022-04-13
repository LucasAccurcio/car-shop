import { expect } from 'chai';
import mongoose from 'mongoose';
import * as sinon from 'sinon';
import data from '../mocks/dataCar';

import CarModel from '../../../models/Car';

describe('Teste da camada CarModel', () => {
  const carModel = new CarModel();

  describe('Car - função delete', () => {
    const id = '6254d007034e807781e282fd';
    
    before(() => {
      sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(null);
    });
    
    after(() => {
      sinon.restore();
    });

    
    it('deveria deletar um objeto passado por id, sem um retorno', async () => {
      const result = await carModel.delete(id);

      expect(result).to.be.equal(null);
    });
  });

  describe('Car - função read', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'find')
        .resolves(data.find);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria ler os dados gravados no banco de dados', async () => {
      const result = await carModel.read();

      expect(result).to.be.equal(data.find);
    });
  });

  describe('Car - função readOne', () => {
    const id = '6254d007034e807781e282fd';

      before(() => {
        sinon.stub(mongoose.Model, 'findOne')
        .resolves(data.findOne);
      });
      
      after(() => {
        sinon.restore();
      });

    it('deveria ler os dados gravados do ID informado', async () => {
      const result = await carModel.readOne(id);

      expect(result).to.be.equal(data.findOne);
    });
  });

  describe('Car - função Update', () => {
    const id = '6254d007034e807781e282fd';
    
      before(() => {
        sinon.stub(mongoose.Model, 'findOneAndUpdate')
        .resolves(data.updated);
      });
      
      after(() => {
        sinon.restore();
      });

    it('deveria atualizar os dados gravados no banco de dados', async () => {
      const result = await carModel.update(id, data.objUpdate);

      expect(result).to.be.equal(data.updated);
    });
  });

  describe('Car - função Create', () => {
      before(() => {
        sinon.stub(mongoose.Model, 'create')
          .resolves(data.created);
      });
      
      after(() => {
        sinon.restore();
      });
    
    it('deveria cadastrar um novo veículo no banco de dados', async () => {
      const result = await carModel.create(data.create);

      expect(result).to.be.equal(data.created);
    });
  });
});