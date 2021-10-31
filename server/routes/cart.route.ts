import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
const router = Router();
import Product from '../models/Product';
import Cart, { ICart } from '../models/Cart';
import { Types } from 'mongoose';

// /api/cart/:cartId
router.get(
  '/:cartId',
  async (req, res) => {
    const { cartId } = req.params;
    try {
      const result = await Cart.findById({ _id: cartId }, { });

      if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'This Cart not found' });
      }

      res.status(StatusCodes.OK).send(result);

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
    }
  }
);

// Add to cart (1 item)
// /api/cart
router.post(
  '',
  async (req, res) => {
    try {
      const { cartId, productId, quantity } = req.body;
      const cart = await Cart.findById({ _id: cartId });

      if (!cart) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
      }
      
      const product = await Product.findOne({ _id: productId });
      const isProductInCart = cart.items.some((item) => item.product.title === product.title);
      const quantityNum = Number(quantity);

      if (isProductInCart) {
        cart.items.forEach((item) => { if (item.product.title === product.title) {
          const oldQuantity = item.quantity;
          item.quantity += quantityNum;
          item.itemPrice += item.product.price * (item.quantity - oldQuantity);
        }});
      } else {
        cart.items.push({ product, quantity: quantityNum, itemPrice: product.price * quantityNum });
      }

      cart.totalQuantity += quantityNum;
      cart.totalPrice += product.price * quantityNum;

      await Cart.findOneAndUpdate({ _id: cartId }, { ...cart });

      const result = await Cart.find({ _id: cartId });

      res.status(StatusCodes.OK).send(result).json({ message: 'Product added to cart' });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong. Try again.${e}` });
    }
  }
);

// /api/cart
router.put(
  '',
  async (req, res) => {
    try {
      const { cartId, productId, quantity } = req.body;

      const cart = await Cart.findById({ _id: cartId });

      if (!cart) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
      }
      const product = await Product.findOne({ _id: productId });

      const isProductInCart = cart.items.some((item) =>  item.product.title === product.title);

      if (!isProductInCart) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found in cart' });
      }

      const quantityNum = Number(quantity);

      cart.items.forEach((item) => { if (item.product.title === product.title) {
        const oldQuantity = item.quantity;
        item.quantity = quantityNum;
        item.itemPrice = item.product.price * item.quantity;
        cart.totalQuantity = cart.totalQuantity - oldQuantity + quantityNum;
        cart.totalPrice = cart.totalPrice - (oldQuantity * product.price) + (product.price * quantityNum);
      }});

      await Cart.findOneAndUpdate({ _id: cartId }, { ...cart });

      const result = await Cart.find({ _id: cartId });

      res.status(StatusCodes.OK).send(result).json({ message: 'Product in cart updated' });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong. Try again.${e}` });
    }
  }
);

// /api/cart
router.delete(
  '',
  async (req, res) => {
    try {
      const { cartId, productId } = req.body;
      const cart = await Cart.findById({ _id: cartId });

      if (!cart) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
      }

      const product = await Product.findOne({ _id: productId });

      const isProductInCart = cart.items.some((item) =>  item.product.title === product.title);

      if (!isProductInCart) {
        return res.status(StatusCodes.NOT_FOUND);
      }

      cart.items.forEach((item) => { if (item.product.title === product.title) {
        const { quantity } = item;
        cart.totalQuantity -= quantity;
        cart.totalPrice -= product.price * quantity;
      }});

      cart.items.splice(cart.items.findIndex((item) => item.product.title === product.title), 1);

      await Cart.findOneAndUpdate({ _id: cartId }, { ...cart });

      const result = await Cart.find({ _id: cartId });

      res.status(StatusCodes.OK).send(result).json({ message: 'Product deleted to cart' });

    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong. Try again.${e}` });
    }
  }
);

// /api/cart/clear/
router.put(
  '/clear',
  async (req, res) => {
    try {
      const { cartId } = req.body;
      const cart = await Cart.findById({ _id: cartId });

      if (!cart) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
      }

      await Cart.findByIdAndUpdate({ _id: cartId }, { items: [], totalQuantity: 0, totalPrice: 0 });

      const result = await Cart.findById({ _id: cartId });

      res.status(StatusCodes.OK).send(result).json({ message: 'Cart successfully cleared' });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.', });
    }
  }
);


export default router;
