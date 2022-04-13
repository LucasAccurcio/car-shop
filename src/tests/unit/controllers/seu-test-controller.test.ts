import * as sinon from 'sinon';
import mongoose from 'mongoose';
import chai from 'chai';
import { Response } from 'superagent';
import chaiHttp = require('chai-http');
import CarController from '../../../controllers/Car'
import data from '../mocks/dataCar';
import CarService from '../../../services/Car';
import server from '../../../server';
const app = server.startServer();

const carController = new CarController();
const carService = new CarService();

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Teste da Camada Controller', async () => {
  describe('Função checkId com dados inválidos', () => {
    const id = 'abc';
    it('deveria retornar um boolean "false"', () => {
      const result = carController.checkId(id);
      expect(result).to.be.equal(false);
    });
  });

  describe('Função checkId com dados válidos', () => {
    const id = '6254d007034e807781e282fd';
    it('deveria retornar um boolean "true"', () => {
      const result = carController.checkId(id);
      expect(result).to.be.equal(true);
    });
  });

  describe('GET /cars', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'find')
        .resolves(data.find);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria retornar os dados dos veículos', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .get('/cars');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body[0]).to.be.deep.eq(data.created);
    });  
  });

  describe('POST /cars', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'create')
        .resolves(data.created);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria armazenar e retornar os dados cadastrados', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .post('/cars')
        .send(data.create);

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.eq(data.created);
    }); 

    it('deveria retornar um erro de validação dos dados', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .post('/cars')
        .send({ ...data.create, year: 3020 });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.a.property('error');
    }); 
  });

});