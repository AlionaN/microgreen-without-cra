import { Router } from 'express';
const router = Router();
import convertImgToBase64 from '../utilities/imgToBase64';
import Product from '../models/Product';
import { StatusCodes } from 'http-status-codes';

// /api/products
router.get(
  '',
  async (req, res) => {
    try {
      const products = await Product.find();

      if (!products) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'There are no products' });
      }

      res.status(StatusCodes.OK).json({ message: 'Products successfully found' });

      return products;
    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
      console.log(e);
    }
  }
);


// /api/products/:id
router.get(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.query;
      const product = await Product.findById({ id });

      if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'This product not found' });
      }

      res.status(StatusCodes.OK).json({ message: 'Product successfully found' });

      return product;
    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
      console.log(e);
    }
  }
);

// /api/products
router.post(
  '',
  async (req, res) => {
    try {
      const { categoryId, title, description, amount, image, price } = req.body;
      const product = await Product.findOne({ title });

      if (product) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Product with this name has already created' });
      }

      const newProduct = new Product({
        categoryId,
        title,
        description,
        amount,
        image: convertImgToBase64(image),
        price,
      });

      await newProduct.save();

      res.status(StatusCodes.OK).json({ message: 'Product successfully created' });

      return newProduct;
    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
      console.log(e);
    }
  }
);


// /api/roducts/:id
router.put(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.query;
      const { categoryId, title, description, amount, image, price } = req.body;
      const product = await Product.findById({ id });

      if (!product) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'This product not found' });
      }

      const updatedProduct = new Product({
        categoryId,
        title,
        description,
        amount,
        image: convertImgToBase64(image),
        price,
      });

      await Product.findByIdAndUpdate(id, updatedProduct);

      res.status(StatusCodes.OK).json({ message: 'Product successfully updated' });

      return updatedProduct;
    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
      console.log(e);
    }
  }
);


// /api/products
router.delete(
  '',
  async (req, res) => {
    try {
      const { id } = req.body;
      const product = await Product.findById({ id });

      if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'This product not found' });
      }

      await Product.findByIdAndDelete(id);

      res.status(StatusCodes.OK).json({ message: 'Product successfully deleted' });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
      console.log(e);
    }
  }
);


export default router;
