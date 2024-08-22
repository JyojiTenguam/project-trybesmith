import express from 'express';
import productsController from './controllers/productsController';
import usersController from './controllers/usersControllers';

const app = express();

app.use(express.json());

app.post('/products/', productsController.createProduct);
app.get('/products', productsController.listProduct);

app.get('/users', usersController.fetchAllUsers);

export default app;
