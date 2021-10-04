import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import AuthRoutes from './server/routes/auth.route';
import CategoryRoutes from './server/routes/category.route';
import ProductRoutes from './server/routes/product.router';
// import { StatusCodes } from 'http-status-codes';

dotenv.config();
const app = express();
const PORT: number = +process.env.PORT || 5000;

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());

app.use('/api/auth', AuthRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/products', ProductRoutes);

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
