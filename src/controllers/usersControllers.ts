import { Request, Response } from 'express';
import usersService from '../services/usersServices';

const fetchAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await usersService.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export default {
  fetchAllUsers,
};