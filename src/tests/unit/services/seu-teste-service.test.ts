import { expect } from 'chai';
import mongoose from 'mongoose';
import * as sinon from 'sinon';
import Service from '../../../services';
import data from '../mocks/data';

import CarService from '../../../services/Car';
// import MotorcycleService from '../../../services/Motorcycle';


describe('Teste da camada CarService', () => {
  const carService = new CarService();

  describe('Car - função delete', () => {
    const id = '6254d007034e807781e282fd';
    
    const stub = sinon.stub(carService, 'delete').resolves(null);

    it('deveria deletar um objeto passado por id, sem um retorno', async () => {
      const result = await carService.delete(id);

      expect(result).to.be.equal(null);
    });
    stub.restore();
  });

  describe('Car - função read', () => {
    const stub = sinon.stub(carService, 'read').resolves(data.find);

    it('deveria deletar um objeto passado por id, sem um retorno', async () => {
      const result = await carService.read();

      expect(result).to.be.equal(data.find);
    });
    stub.restore();
  });

  describe('Car - função readOne', () => {
    const id = '6254d007034e807781e282fd';

    const stub = sinon.stub(carService, 'readOne').resolves(data.findOne);

    it('deveria deletar um objeto passado por id, sem um retorno', async () => {
      const result = await carService.readOne(id);

      expect(result).to.be.equal(data.findOne);
    });
    stub.restore();
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
      const stub = sinon.stub(carService, 'update').resolves(data.updated);

      it('deveria atualizar os dados gravados no banco de dados', async () => {
        const result = await carService.update(id, data.objUpdate);

        expect(result).to.be.equal(data.updated);
      });
      stub.restore();
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
      const stub = sinon.stub(carService, 'create').resolves(data.created);

      it('deveria gravar os dados no banco de dados', async () => {
        const result = await carService.create(data.create);

        expect(result).to.be.equal(data.created);
      });
      stub.restore();
    });
  });
});