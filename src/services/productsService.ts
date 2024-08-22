import { Model, Optional } from 'sequelize';
import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';

type ProductModelInstance = Model<Product, Optional<Product, 'id'>>;

function transformProduct(modelInstance: ProductModelInstance): Product {
  const { id, name, price, userId } = modelInstance.get();
  return { id, name, price, userId };
}

async function getAllProducts(): Promise<Product[]> {
  const products = await ProductModel.findAll();
  return products.map(transformProduct);
}

export default {
  getAllProducts,
};