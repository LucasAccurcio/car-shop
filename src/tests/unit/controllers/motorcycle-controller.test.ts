import * as sinon from 'sinon';
import mongoose from 'mongoose';
import chai from 'chai';
import { Response } from 'superagent';
import chaiHttp = require('chai-http');
import MotorcycleController from '../../../controllers/Motorcycle'
import data from '../mocks/dataMotorcycle';
// import server from '../../../server';

// const app = server.startServer();

const motorcycleController = new MotorcycleController();

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Teste da Camada Controller', async () => {
  describe('Função checkId com dados inválidos', () => {
    const id = 'abc';
    it('deveria retornar um boolean "false"', () => {
      const result = motorcycleController.checkId(id);
      expect(result).to.be.equal(false);
    });
  });

  describe('Função checkId com dados válidos', () => {
    const id = '6254d007034e807781e282fd';
    it('deveria retornar um boolean "true"', () => {
      const result = motorcycleController.checkId(id);
      expect(result).to.be.equal(true);
    });
  });

  describe('GET /motorcycles', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'find')
        .resolves(data.find);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria retornar os dados dos veículos', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .get('/motorcycles');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body[0]).to.be.deep.eq(data.created);
    });  
  });

  describe('GET /cars - Erro interno no servidor', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'find')
        .throws(new Error);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria retornar um erro interno no servidor', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .get('/motorcycles');
      
      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.error).to.be.equal('Internal Server Error')
    });  
  });

  describe('POST /motorcycles', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'create')
        .resolves(data.created);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria armazenar e retornar os dados cadastrados', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .post('/motorcycles')
        .send(data.create);

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.eq(data.created);
    }); 

    it('deveria retornar um erro de validação dos dados', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .post('/motorcycles')
        .send({ ...data.create, year: 3020 });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.a.property('error');
    }); 
  });

  describe('POST /cars - Erro interno no servidor', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'create')
        .throws(new Error);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria retornar um erro interno no servidor', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .post('/motorcycles')
        .send(data.create);
      
      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.error).to.be.equal('Internal Server Error')
    });  
  });

  describe('GET /motorcycles/:id', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'findOne')
        .resolves(data.findOne);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria retornar os dados do veículo passado por id', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .get('/motorcycles/6254d007034e807781e282fd');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(data.findOne);
    }); 

    it('deveria retornar um erro - id inválido', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .get('/motorcycles/6254d007034e807781e282f');

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.a.property('error');
    });  
  });

  describe('PUT /motorcycles/:id', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'findOneAndUpdate')
        .resolves(data.updated);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria retornar os dados do veículo passado por id', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .put('/motorcycles/6254d007034e807781e282fd')
        .send(data.objUpdate);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(data.updated);
    }); 

    it('deveria retornar um erro - id inválido', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .put('/motorcycles/6254d007034e807781e282f')
        .send(data.objUpdate);

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.a.property('error');
    });  

    it('deveria retornar um erro de validação de dados', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .put('/motorcycles/6254d007034e807781e282fd')
        .send({ color: 'yellow'});

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.a.property('error');
    });  
  });

  describe('DELETE /motorcycles/:id', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'findOneAndDelete')
        .resolves(data.findOne);
    });
    
    after(() => {
      sinon.restore();
    });

    it('deveria deletar os dados - não retorna nenhuma mensagem, apenas status 200', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .del('/motorcycles/6254d007034e807781e282fd');

      expect(chaiHttpResponse.status).to.be.equal(204);
      expect(chaiHttpResponse.body).to.be.deep.eq({});
    }); 

    it('deveria retornar um erro - id inválido', async () => {
      let chaiHttpResponse = await chai.request('http://localhost:3001')
        .del('/motorcycles/6254d007034e807781e282f');

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.a.property('error');
    });  
  });

});