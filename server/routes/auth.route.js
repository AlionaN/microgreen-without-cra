const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const config = require('config');
const { imgToBase64 } = require('../utilities/imgToBase64');
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

      if (errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data'
        });
      }

      const { firstName, secondName, email, img, password, password_confirm, isSignIn } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'This user has already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const imgBase64 = imgToBase64(img);

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

      res.status(201).json({ message: 'User successfuly created' });
    } catch(e) {
      res.status(500).json({ message: 'Something went wrong. Try again.' })
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
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data'
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if(!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(400).json({ message: 'Password is incorrect' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      );

      res.json({ token, userId });

    } catch(e) {
      res.status(500).json({ message: 'Something went wrong. Try again.' })
    }
  }
);

module.exports = router;
