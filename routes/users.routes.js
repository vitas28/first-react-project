const { Router } = require('express');
const User = require('../models/User');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find(
      {},
      {
        email: 1,
        username: 1,
        date: 1,
      }
    );
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: 'Something wrong. Try again' });
  }
});

module.exports = router;
