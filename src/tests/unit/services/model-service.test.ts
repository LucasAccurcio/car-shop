import { expect } from 'chai';
import * as sinon from 'sinon';
import data from '../mocks/dataMotorcycle';
import mongoose from 'mongoose';

import ModelService from '../../../services/Model';

describe('Teste da camada ModelService', () => {
  const modelService = new ModelService();

  describe('Camada Modelo para teste do Index - função Update', () => {
    const id = '6254d007034e807781e282fd';

    describe('Atualização com sucesso', () => {
      before(() => {
        sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(data.updated as any);
      });
      
      after(() => {
        sinon.restore();
      });

      it('deveria atualizar os dados gravados no banco de dados', async () => {
        const result = await modelService.update(id, data.objUpdate);

        expect(result).to.be.deep.equal(data.updated);
      });
    });
  });

  describe('Camada Modelo para teste do Index - função Create', () => {
    describe('Criação com sucesso', () => {
      before(() => {
        sinon.stub(mongoose.Model, 'create').resolves(data.created);
      });
      
      after(() => {
        sinon.restore();
      });

      it('deveria gravar os dados no banco de dados', async () => {
        const result = await modelService.create(data.create);

        expect(result).to.be.deep.equal(data.created);
      });
    });
  });
});