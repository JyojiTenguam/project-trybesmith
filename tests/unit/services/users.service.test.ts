import sinon from 'sinon';
import { expect } from 'chai';
import UserModel from '../../../src/database/models/user.model';
import usersService from '../../../src/services/usersServices';
import { mockUsers, formattedMockUsers } from '../../mocks/user.mock';

describe('UsersService', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('getAll', () => {  
    it('Deve retornar uma lista vazia se nenhum usuário for encontrado', async () => {
      sinon.stub(UserModel, 'findAll').resolves([]);
  
      const result = await usersService.getAll();
      expect(result).to.deep.equal([]);
    });

    it('Deve lançar um erro se ocorrer um problema ao buscar usuários', async () => {
      const error = new Error('Database error');
      sinon.stub(UserModel, 'findAll').rejects(error);
  
      try {
        await usersService.getAll();
        throw new Error('Expected method to throw.');
      } catch (err) {
        expect(err).to.be.an('error');
        expect((err as Error).message).to.equal('Database error');
      }
    });
  });
});