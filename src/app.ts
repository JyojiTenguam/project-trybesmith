import express from 'express';
import createProduct from './controllers/productsController';

const app = express();

app.use(express.json());

app.post('/products/', createProduct);

export default app;
