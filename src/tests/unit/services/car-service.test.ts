import { expect } from 'chai';
import * as sinon from 'sinon';
import data from '../mocks/dataCar';

import CarService from '../../../services/Car';

describe('Teste da camada CarService', () => {
  const carService = new CarService();

  describe('Car - função delete', () => {
    const id = '6254d007034e807781e282fd';
    
    before(() => {
      sinon.stub(carService, 'delete').resolves(null);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria deletar um objeto passado por id, sem um retorno', async () => {
      const result = await carService.delete(id);

      expect(result).to.be.equal(null);
    });
  });

  describe('Car - função read', () => {
    before(() => {
      sinon.stub(carService, 'read').resolves(data.find);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria exibir a lista de todos os carros', async () => {
      const result = await carService.read();

      expect(result).to.be.equal(data.find);
    });
  });

  describe('Car - função readOne', () => {
    const id = '6254d007034e807781e282fd';

    before(() => {
      sinon.stub(carService, 'readOne').resolves(data.findOne);
    });
    
    after(() => {
      sinon.restore();
    });
    

    it('deveria deletar um objeto passado por id, sem um retorno', async () => {
      const result = await carService.readOne(id);

      expect(result).to.be.equal(data.findOne);
    });
  });

  describe('Car - função Update', () => {
    const id = '6254d007034e807781e282fd';

    describe('Erros de validação dos dados', () => {
      it('deveria retornar um erro, ano maior que o permitido', async () => {
        const result = await carService.update(id, { ...data.objUpdate, year: 3022 });
        expect(result).to.be.have.a.property('error');
      });

      it('deveria retornar um erro, model tem menos de 3 caracteres', async () => {
        const result = await carService.update(id, { ...data.objUpdate, model: 'ab' });
        expect(result).to.be.have.a.property('error');
      });

      it('deveria retornar um erro, color tem menos de 3 caracteres', async () => {
        const result = await carService.update(id, { ...data.objUpdate, color: 'ab' });
        expect(result).to.be.have.a.property('error');
      });
    });

    describe('Atualização com sucesso', () => {
      before(() => {
        sinon.stub(carService, 'update').resolves(data.updated);
      });
      
      after(() => {
        sinon.restore();
      });

      it('deveria atualizar os dados gravados no banco de dados', async () => {
        const result = await carService.update(id, data.objUpdate);

        expect(result).to.be.equal(data.updated);
      });
    });
  });

  describe('Car - função Create', () => {
    describe('Erros de validação dos dados', () => {
      it('deveria retornar um erro, ano maior que o permitido', async () => {
        const result = await carService.create({ ...data.objUpdate, year: 3022 });
        expect(result).to.be.have.a.property('error');
      });

      it('deveria retornar um erro, model tem menos de 3 caracteres', async () => {
        const result = await carService.create({ ...data.objUpdate, model: 'ab' });
        expect(result).to.be.have.a.property('error');
      });

      it('deveria retornar um erro, color tem menos de 3 caracteres', async () => {
        const result = await carService.create({ ...data.objUpdate, color: 'ab' });
        expect(result).to.be.have.a.property('error');
      });
    });

    describe('Criação com sucesso', () => {
      before(() => {
        sinon.stub(carService, 'create').resolves(data.created);
      });
      
      after(() => {
        sinon.restore();
      });

      it('deveria gravar os dados no banco de dados', async () => {
        const result = await carService.create(data.create);

        expect(result).to.be.equal(data.created);
      });
    });
  });
});