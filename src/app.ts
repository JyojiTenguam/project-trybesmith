import express from 'express';
import productsController from './controllers/productsController';

const app = express();

app.use(express.json());

app.post('/products/', productsController.createProduct);
app.get('/products', productsController.listProduct);

export default app;
