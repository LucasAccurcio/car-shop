import { expect } from 'chai';
import * as sinon from 'sinon';
import data from '../mocks/dataMotorcycle';

import MotorcycleService from '../../../services/Motorcycle';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';

describe('Teste da camada MotorcycleService', () => {
  const motorcycleService = new MotorcycleService();

  describe('Motorcycle - função delete', () => {
    const id = '6254d007034e807781e282fd';
    
    before(() => {
      sinon.stub(motorcycleService, 'delete').resolves(null);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria deletar um objeto passado por id, sem um retorno', async () => {
      const result = await motorcycleService.delete(id);

      expect(result).to.be.equal(null);
    });
  });

  describe('Motorcycle - função read', () => {
    const dataFind = { ...data.findOne, category: "Trail" } as Motorcycle;
    before(() => {
      sinon.stub(motorcycleService, 'read').resolves([dataFind]);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria exibir a lista de todas a motocicletas', async () => {
      const result = await motorcycleService.read();

      expect(result).to.be.deep.equal([dataFind]);
    });
  });

  describe('Motorcycle - função readOne', () => {
    const id = '6254d007034e807781e282fd';
    const dataFindOne = { ...data.findOne, category: "Trail" } as Motorcycle;
    before(() => {
      sinon.stub(motorcycleService, 'readOne').resolves(dataFindOne);
    });
    
    after(() => {
      sinon.restore();
    });
    

    it('deveria deletar um objeto passado por id, sem um retorno', async () => {
      const result = await motorcycleService.readOne(id);

      expect(result).to.be.equal(dataFindOne);
    });
  });

  describe('Motorcycle - função Update', () => {
    const id = '6254d007034e807781e282fd';

    describe('Erros de validação dos dados', () => {
      it('deveria retornar um erro, ano maior que o permitido', async () => {
        const result = await motorcycleService.update(id, { ...data.objUpdate, year: 3022, category: "Trail" });
        expect(result).to.be.have.a.property('error');
      });

      it('deveria retornar um erro, model tem menos de 3 caracteres', async () => {
        const result = await motorcycleService.update(id, { ...data.objUpdate, model: 'ab', category: "Trail" });
        expect(result).to.be.have.a.property('error');
      });

      it('deveria retornar um erro, color tem menos de 3 caracteres', async () => {
        const result = await motorcycleService.update(id, { ...data.objUpdate, color: 'ab', category: "Trail" });
        expect(result).to.be.have.a.property('error');
      });
    });

    describe('Atualização com sucesso', () => {
      before(() => {
        sinon.stub(motorcycleService, 'update').resolves({ ...data.updated, category: "Trail" });
      });
      
      after(() => {
        sinon.restore();
      });

      it('deveria atualizar os dados gravados no banco de dados', async () => {
        const result = await motorcycleService.update(id, { ...data.objUpdate, category: "Trail" });

        expect(result).to.be.deep.equal(data.updated);
      });
    });
  });

  describe('Motorcycle - função Create', () => {
    describe('Erros de validação dos dados', () => {
      it('deveria retornar um erro, ano maior que o permitido', async () => {
        const result = await motorcycleService.create({ ...data.objUpdate, year: 3022, category: "Trail" });
        expect(result).to.be.have.a.property('error');
      });

      it('deveria retornar um erro, model tem menos de 3 caracteres', async () => {
        const result = await motorcycleService.create({ ...data.objUpdate, model: 'ab', category: "Trail" });
        expect(result).to.be.have.a.property('error');
      });

      it('deveria retornar um erro, color tem menos de 3 caracteres', async () => {
        const result = await motorcycleService.create({ ...data.objUpdate, color: 'ab', category: "Trail" });
        expect(result).to.be.have.a.property('error');
      });
    });

    describe('Criação com sucesso', () => {
      before(() => {
        sinon.stub(motorcycleService, 'create').resolves({ ...data.created, category: "Trail" });
      });
      
      after(() => {
        sinon.restore();
      });

      it('deveria gravar os dados no banco de dados', async () => {
        const result = await motorcycleService.create({ ...data.create, category: "Trail" });

        expect(result).to.be.deep.equal(data.created);
      });
    });
  });
});