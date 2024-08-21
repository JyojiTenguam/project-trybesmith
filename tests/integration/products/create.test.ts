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
      const createStub = sinon.stub(ProductModel, 'create').resolves(ProductModel.build(validProductMock));
  
      const response = await chai.request(app).post('/products').send({
        name: validProductMock.name,
        price: validProductMock.price,
        userId: validProductMock.userId,
      });
  
      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(validProductMock);
      expect(createStub.calledOnce).to.be.true;
      expect(createStub.calledWith({
        name: validProductMock.name,
        price: validProductMock.price,
        userId: validProductMock.userId,
      })).to.be.true;
    });
  });
});