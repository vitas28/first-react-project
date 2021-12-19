const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimum number of characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data',
        });
      }

      const {
        email,
        password,
        username,
        date,
        name,
        lastName,
        job,
        information,
      } = req.body;
      const candidate = await User.findOne({ email });
      const sameUsername = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'This email has been already using' });
      }

      if (sameUsername) {
        return res
          .status(400)
          .json({ message: 'This username has been already using' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword,
        username,
        date,
        name,
        lastName,
        job,
        information,
      });
      console.log(user);

      await user.save();

      res.status(201).json({ message: 'User had been created' });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Something wrong. Try again' });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login data',
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: 'This user has not created yet' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Password is not correct. Try again' });
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h',
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Something wrong. Try again' });
    }
  }
);

module.exports = router;
