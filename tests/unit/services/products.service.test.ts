import { expect } from 'chai';
import sinon from 'sinon';
import ProductsService from '../../../src/services/productsService';
import ProductModel from '../../../src/database/models/product.model';

describe('ProductsService', function () {
  beforeEach(function () {
    sinon.restore();
  });
  describe('getAllProducts', () => {
    it('Deve lançar um erro se ocorrer um erro ao buscar produtos', async function () {
      const error = new Error('Database error');
      const findAllStub = sinon.stub(ProductModel, 'findAll').rejects(error);

      try {
        await ProductsService.getAllProducts();
        throw new Error('Expected method to throw.');
      } catch (err) {
        expect(err).to.be.an('error');
        expect((err as Error).message).to.equal('Database error');
      }

      expect(findAllStub.calledOnce).to.be.true;
    });
  });
});