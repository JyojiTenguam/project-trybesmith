import { Request, Response } from 'express';
import ProductModel from '../database/models/product.model';

async function createProduct(req: Request, res: Response): Promise<Response> {
  try {
    const { name, price, userId } = req.body;

    if (!name || !price || !userId) {
      return res.status(400).json({ message: 'Dados inválidos' });
    }

    const newProduct = await ProductModel.create({ name, price, userId });
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar produto' });
  }
}

export default createProduct;