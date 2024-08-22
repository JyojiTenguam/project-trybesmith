import { Request, Response } from 'express';
import loginService from '../services/loginsService';

const validateLoginInput = (username: string, password: string): string | null => {
  if (!username || !password) {
    return '"username" and "password" are required';
  }
  return null;
};

const handleLoginResponse = (res: Response, token: string | null): Response => {
  if (!token) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }
  return res.status(200).json({ token });
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  const validationError = validateLoginInput(username, password);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const token = await loginService.authenticateUser(username, password);
    return handleLoginResponse(res, token);
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export default { login };