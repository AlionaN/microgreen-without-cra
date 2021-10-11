import { Router } from 'express';
const router = Router();
import Product from '../models/Product';
import { StatusCodes } from 'http-status-codes';

// /api/products
router.get(
  '',
  async (req, res) => {
    try {
      const { minPrice, maxPrice, category } = req.query;

      let products = [];

      if (minPrice) {
        products = await Product.find()
          .where('price')
          .gte(Number(minPrice));
      } else if (maxPrice) {
        products = await Product.find()
          .where('price')
          .lte(Number(maxPrice));
      } else if (category) {
        products = await Product.find()
          .where('categoryId', category);
      } else {
        products = await Product.find();
      }
      
      if (!products) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'There are no products' });
      }

      let generalMinPrice = Number.MAX_SAFE_INTEGER;
      products.forEach((item) => {
        if (item.price < generalMinPrice) { 
          generalMinPrice = item.price 
        }
      });

      res.status(StatusCodes.OK).send(products).json({ message: 'Products successfully found' });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong. Try again. ${e}` });
    }
  }
);


// /api/products/:id
router.get(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById({ _id: id });

      if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'This product not found' });
      }

      res.status(StatusCodes.OK).send(product).json({ message: 'Product successfully found' });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
    }
  }
);

// /api/products
router.post(
  '',
  async (req, res) => {
    try {
      const { categoryId, title, description, amount, size, image, price } = req.body;
      const product = await Product.findOne({ title });

      if (product) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Product with this name has already created' });
      }

      const newProduct = new Product({
        categoryId,
        title,
        description,
        amount,
        size,
        image,
        price,
      });

      const result = await newProduct.save();

      res.status(StatusCodes.OK).send(result).json({ message: 'Product successfully created' });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.', e });
    }
  }
);


// /api/roducts/:id
router.put(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const { categoryId, title, description, amount, size, image, price } = req.body;
      const product = await Product.findById({ _id: id });

      if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'This product not found' });
      }

      const updatedProduct = {
        categoryId,
        title,
        description,
        amount,
        image,
        size,
        price,
      };

      const result = await Product.findByIdAndUpdate({ _id: id }, updatedProduct);

      res.status(StatusCodes.OK).send(result).json({ message: 'Product successfully updated' });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong. Try again. ${e}` });
    }
  }
);


// /api/products/:id
router.delete(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById({ _id: id });

      if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'This product not found' });
      }

      const result = await Product.findByIdAndDelete(id);

      res.status(StatusCodes.OK).send(result).json({ message: 'Product successfully deleted' });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
    }
  }
);


export default router;
