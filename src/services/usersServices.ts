import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';

type UserWithProductIds = { username: string, productIds: number[] };

export default class UsersService {
  static async getAll(): Promise<UserWithProductIds[]> {
    const users = await UserModel.findAll({
      attributes: ['username'],
      include: [{
        model: ProductModel,
        as: 'productIds',
        attributes: ['id'],
      }],
    });

    return users.map((user) => {
      const userData = user.get({ plain: true });
      return {
        username: userData.username,
        productIds: Array.isArray(userData.productIds) 
          ? userData.productIds.map((product: { id: number }) => product.id)
          : [],
      };
    });
  }
}