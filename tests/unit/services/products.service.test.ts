import { expect } from 'chai';
import sinon from 'sinon';
import ProductsService from '../../../src/services/productsService';
import ProductModel from '../../../src/database/models/product.model';
import { productsMock } from '../../mocks/product.mock';

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

    it('Deve retornar uma lista vazia se nenhum produto for encontrado', async () => {
      sinon.stub(ProductModel, 'findAll').resolves([]);
  
      const result = await ProductsService.getAllProducts();
      expect(result).to.deep.equal([]);
    });

    it('Deve retornar uma lista de produtos se produtos forem encontrados', async () => {
      const productInstances = productsMock.map(product => ProductModel.build(product));
  
      sinon.stub(ProductModel, 'findAll').resolves(productInstances);
  
      const result = await ProductsService.getAllProducts();
      expect(result).to.deep.equal(productsMock);
    });
  });
});