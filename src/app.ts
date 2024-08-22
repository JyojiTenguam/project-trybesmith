import express from 'express';
import productsController from './controllers/productsController';
import usersController from './controllers/usersControllers';
import loginsController from './controllers/loginsController';
import AuthService from './middleware/middleware';
import productValidate from './middleware/productMiddleware';

const app = express();

app.use(express.json());

app.post('/products/', productValidate, productsController.createProduct);
app.get('/products', productsController.listProduct);

app.get('/users', usersController.fetchAllUsers);

app.post('/login', AuthService, loginsController.login);

export default app;
