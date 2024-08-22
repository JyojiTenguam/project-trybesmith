import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/user.model';

export type Validation = {
  isValid: boolean;
  message?: string;
};

function validateProductName(name: string): Validation {
  if (!name) {
    return { isValid: false, message: '"name" is required' };
  }
  if (typeof name !== 'string') {
    return { isValid: false, message: '"name" must be a string' };
  }
  if (name.length < 3) {
    return { isValid: false, message: '"name" length must be at least 3 characters long' };
  }
  return { isValid: true };
}

function validateProductPrice(price: string): Validation {
  if (price === undefined || price === null) {
    return { isValid: false, message: '"price" is required' };
  }
  if (typeof price !== 'string') {
    return { isValid: false, message: '"price" must be a string' };
  }
  if (price.length < 3) {
    return { isValid: false, message: '"price" length must be at least 3 characters long' };
  }
  return { isValid: true };
}

function validateUserId(userId: number): Validation {
  if (userId === undefined || userId === null) {
    return { isValid: false, message: '"userId" is required' };
  }
  if (typeof userId !== 'number') {
    return { isValid: false, message: '"userId" must be a number' };
  }
  return { isValid: true };
}

async function checkUserExists(userId: number): Promise<Validation> {
  const user = await UserModel.findByPk(userId);
  if (!user) {
    return { isValid: false, message: '"userId" not found' };
  }
  return { isValid: true };
}

async function validProductField(req: Request, _res: Response): Promise<Validation | null> {
  const { name, price, userId } = req.body;

  const validations = [
    validateProductName(name),
    validateProductPrice(price),
    validateUserId(userId),
  ];

  const invalidValidation = validations.find((validation) => !validation.isValid);

  if (invalidValidation) {
    return invalidValidation;
  }

  return checkUserExists(userId);
}

async function validateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
  const validationResult = await validProductField(req, res);

  if (validationResult && !validationResult.isValid) {
    const message = validationResult.message ?? 'Invalid input';
    const statusCode = message.includes('required') ? 400 : 422;
    res.status(statusCode).json({ message });
    return;
  }

  next();
}

export default validateProduct;