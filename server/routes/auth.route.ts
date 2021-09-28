import Router from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/User';
import convertImgToBase64 from '../utilities/imgToBase64';
import { StatusCodes } from 'http-status-codes';
const router = Router();

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
      console.log(req);

      if (errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: errors.array(),
          message: 'Incorrect data'
        });
      }

      const { firstName, secondName, email, img, password, password_confirm, isSignIn } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'This user has already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const imgBase64 = convertImgToBase64(img);

      const user = new User({
        firstName,
        secondName,
        email,
        img: imgBase64,
        password: hashedPassword,
        password_confirm: hashedPassword,
        isSignIn: true,
      });

      await user.save();

      res.status(StatusCodes.CREATED).json({ message: 'User successfuly created' });
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
  
      if (errors.isEmpty()) {
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

      res.json({ token, userId: user.id });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' })
    }
  }
);

export default router;
