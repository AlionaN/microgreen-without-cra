import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import AuthRoutes from './server/routes/auth.route';
import CategoryRoutes from './server/routes/category.route';
import ProductRoutes from './server/routes/product.router';
import CartRoutes from './server/routes/cart.route';
import UserRoutes from './server/routes/user.route';
// import { StatusCodes } from 'http-status-codes';

dotenv.config();
const app = express();
const PORT: number = +process.env.PORT || 5000;

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));

app.use('/api/auth', AuthRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/user', UserRoutes);

// app.all('*', (req, res) => {
//   res.sendStatus(StatusCodes.NOT_FOUND);
// });

async function start() {
  try {
    await mongoose.connect(process.env.DATABASE);

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}...`);
    });
  } catch(error) {
    console.log('Server Error', error.message);
    process.exit(1);
  }
}

start();
