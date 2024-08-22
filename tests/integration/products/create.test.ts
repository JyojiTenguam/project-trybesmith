import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import { validProductMock } from '../../mocks/product.mock';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () {
    sinon.restore();
  });

  describe('create', () => {
    it('Deve cadastrar um produto com sucesso', async function () {
      sinon.stub(ProductModel, 'create').resolves(ProductModel.build(validProductMock));
  
      const response = await chai.request(app).post('/products').send({
        name: validProductMock.name,
        price: validProductMock.price,
        userId: validProductMock.userId,
      });
  
      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(validProductMock);
    });

    it('Deve retornar um erro ao falhar na criação do produto', async function () {
      const error = new Error('Erro ao criar produto');
      sinon.stub(ProductModel, 'create').rejects(error);
  
      const response = await chai.request(app).post('/products').send({
        name: validProductMock.name,
        price: validProductMock.price,
        userId: validProductMock.userId,
      });
  
      expect(response.status).to.equal(500);
      expect(response.body).to.deep.equal({ message: 'Erro ao criar produto' });
    });
  });
});