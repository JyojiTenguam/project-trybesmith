import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import UsersController from '../../../src/controllers/usersControllers';
import UsersService from '../../../src/services/usersServices';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('getUsers', function () {
    it('Deve retornar status 200 e a lista de usuários formatada corretamente', async function () {
      const formattedMockUsers = [{ username: 'user1', productIds: [1, 2] }];
      sinon.stub(UsersService, 'getAll').resolves(formattedMockUsers);
  
      await UsersController.fetchAllUsers(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(formattedMockUsers);
    });
  });
});
