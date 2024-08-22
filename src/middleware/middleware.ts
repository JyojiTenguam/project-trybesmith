import { Request, Response, NextFunction } from 'express';

const AuthService = (req: Request, res: Response, next: NextFunction): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: '"username" and "password" are required' });
    return;
  }

  next();
};

export default AuthService;