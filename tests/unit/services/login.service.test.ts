import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../../../src/database/models/user.model';
import LoginService from '../../../src/services/loginsService';

describe('LoginService', function () {
  let userModelStub: sinon.SinonStub;
  let bcryptStub: sinon.SinonStub;
  let jwtStub: sinon.SinonStub;

  beforeEach(function () {
    sinon.restore();
    userModelStub = sinon.stub(UserModel, 'findOne');
    bcryptStub = sinon.stub(bcrypt, 'compare');
    jwtStub = sinon.stub(jwt, 'sign');
  });

  afterEach(function () {
    userModelStub.restore();
    bcryptStub.restore();
    jwtStub.restore();
  });

  it('Retorne null se o usuário não for encontrado', async function () {
    userModelStub.withArgs({ where: { username: 'usuario_nao_existente' } }).returns(null);

    const result = await LoginService.authenticateUser('usuario_nao_existente', 'senha_qualquer');

    expect(result).to.be.null;
  });

  it('Retorne null se a senha for inválida', async function () {
    const fakeUser = {
      dataValues: {
        id: 1,
        username: 'usuario_existente',
        password: 'hashed_password'
      }
    };
    userModelStub.withArgs({ where: { username: 'usuario_existente' } }).returns(Promise.resolve(fakeUser));
    bcryptStub.withArgs('senha_invalida', 'hashed_password').returns(Promise.resolve(false));

    const result = await LoginService.authenticateUser('usuario_existente', 'senha_invalida');

    expect(result).to.be.null;
  });

  it('Se o login for bem-sucedido, deve ser retornado um token JWT válido', async function () {
    const fakeUser = {
      dataValues: {
        id: 1,
        username: 'usuario_existente',
        password: 'hashed_password'
      }
    };
    const fakeToken = 'fake_jwt_token';

    userModelStub.withArgs({ where: { username: 'usuario_existente' } }).returns(Promise.resolve(fakeUser));
    bcryptStub.withArgs('senha_valida', 'hashed_password').returns(Promise.resolve(true));
    jwtStub.withArgs({ id: 1, username: 'usuario_existente' }, sinon.match.any, sinon.match.any).returns(fakeToken);

    const result = await LoginService.authenticateUser('usuario_existente', 'senha_valida');

    expect(result).to.equal(fakeToken);
  });

  it('deve lançar um erro se a geração do token falhar', async function () {
    const fakeUser = {
      dataValues: {
        id: 1,
        username: 'usuario_existente',
        password: 'hashed_password'
      }
    };
  
    userModelStub.withArgs({ where: { username: 'usuario_existente' } }).returns(Promise.resolve(fakeUser));
    bcryptStub.withArgs('senha_valida', 'hashed_password').returns(Promise.resolve(true));
    jwtStub.withArgs({ id: 1, username: 'usuario_existente' }, sinon.match.any, sinon.match.any).throws(new Error('Falha na geração do token'));
    
    try {
      await LoginService.authenticateUser('usuario_existente', 'senha_valida');
      throw new Error('O teste falhou, o erro esperado não foi lançado');
    } catch (error) {
      expect((error as Error).message).to.equal('Falha na geração do token');
    }
  });
});