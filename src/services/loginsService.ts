import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../database/models/user.model';
import { User } from '../types/User';

const JWT_SECRET = 'your_secret_key';

export default class LoginService {
  static async authenticateUser(username: string, password: string): Promise<string | null> {
    const user = await UserModel.findOne({ where: { username } });

    if (!user) {
      return null;
    }

    const userData = user.dataValues as User;
    const isPasswordValid = await this.verifyPassword(password, userData.password);
    if (!isPasswordValid) {
      return null;
    }

    const token = this.generateToken(userData.id, userData.username);
    return token;
  }

  private static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private static generateToken(id: number, username: string): string {
    return jwt.sign({ id, username }, JWT_SECRET, { expiresIn: '1h' });
  }
}