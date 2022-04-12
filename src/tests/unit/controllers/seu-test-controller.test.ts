/* import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import mongoose from 'mongoose';

import server from '../../../server';
const app = server.startServer();

import { Response } from 'superagent';
import CarModel from '../../../models/Car';
import MongoModel from '../../../models/MongoModel'

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Teste da Camada Controller', async () => {

  describe('Teste da rota POST /cars', async () => {
    const data = {
      model: "Ferrari Maranello",
      year: 1963,
      color: "red",
      buyValue: 3500000,
      seatsQty: 2,
      doorsQty: 2
    };

    it('deveria retornar status 404 caso tenha um dado inválido', async () => {
      const chaiHttpResponse = await chai.request(app)
        .get('/cars');
      
      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('deveria retornar status 404 caso tenha um dado inválido', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/cars')
        .send({ ...data, year: 2050 });
      
      expect(chaiHttpResponse.status).to.be.equal(400);
    });

    it('deveria retornar status 201 caso tenha criado com sucesso', async () => {
      sinon.stub(mongoose.Model, 'create').resolves({ 
        ...data,
        _id: "6254d007034e807781e282fd",
      });
      const chaiHttpResponse = await chai.request(app)
        .post('/cars')
        .send(data);
      
      expect(chaiHttpResponse.status).to.be.equal(201);
    });
  });
}); */