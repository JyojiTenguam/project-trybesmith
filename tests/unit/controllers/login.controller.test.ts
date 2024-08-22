import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginController from '../../../src/controllers/loginsController';
import LoginService from '../../../src/services/loginsService';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Deve retornar 400 se "username" ou "password" não forem fornecidos', async function () {
    req.body = { username: '', password: '' };

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"username" and "password" are required' });
  });

  it('Retorne um status 401 quando a autenticação não for bem-sucedida', function (done) {
    req.body = { username: 'testuser', password: 'password' };
    sinon.stub(LoginService, 'authenticateUser').resolves(null);
  
    loginController.login(req, res).then(() => {
      try {
        expect(res.status).to.have.been.calledWith(401);
        expect(res.json).to.have.been.calledWith({ message: 'Username or password invalid' });
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('Em caso de erro inesperado, deve-se retornar um código 500', async function () {
    req.body = { username: 'testuser', password: 'password' };
    sinon.stub(LoginService, 'authenticateUser').throws(new Error('Erro inesperado'));

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Erro interno no servidor' });
  });

  it('Em caso de sucesso, deve ser retornado um código 200 e um token válido', async function () {
    req.body = { username: 'testuser', password: 'password' };
    const validToken = 'valid_token';
    sinon.stub(LoginService, 'authenticateUser').resolves(validToken);
  
    await loginController.login(req, res);
  
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token: validToken });
  
    sinon.restore();
  });
});