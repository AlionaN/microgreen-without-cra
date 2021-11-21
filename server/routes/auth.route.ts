import Router from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/User';
import StatisticsUser from '../models/StatisticsUser';
import { StatusCodes } from 'http-status-codes';
const router = Router();
import Cart from '../models/Cart';

enum UserRoles {
  admin = 'ADMIN',
  user = 'USER'
};

// /api/auth/register
router.post(
  '/register', 
  [
    check('email', 'Email is incorrect').isEmail(),
    check('password', 'Password must contain at least 6 characters')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: errors.array(),
          message: 'Incorrect data'
        });
      }

      const { firstName, secondName, email, img, password, password_confirm, role = UserRoles.user } = req.body;

      if (password !== password_confirm) {
        return res.status(StatusCodes.BAD_REQUEST);
      }

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'This user has already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const cartRequest = new Cart({
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      });

      const cart = await cartRequest.save();

      const user = new User({
        firstName,
        secondName,
        email,
        img,
        cart: cart._id,
        password: hashedPassword,
        password_confirm: hashedPassword,
        role
      });

      await user.save();

      const registeredUser = await User.findOne({ email });

      const userStatisticsRequest = new StatisticsUser({
        userId: registeredUser.id,
        date: new Date(),
      });

      await userStatisticsRequest.save();

      res.status(StatusCodes.CREATED).send({ userId: registeredUser.id }).json({ message: 'User successfuly created' });
    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong. Try again. ${e}` })
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Input correct email').normalizeEmail().isEmail(),
    check('password', 'Input password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: errors.array(),
          message: 'Incorrect data'
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if(!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password is incorrect' });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWTSECRET,
        { expiresIn: '1h' }
      );

      res.status(StatusCodes.OK).send({ token, userId: user._id });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' })
    }
  }
);

export default router;
