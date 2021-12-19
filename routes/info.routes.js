const User = require('../models/User');
const { Router } = require('express');
const router = Router();
const auth = require('../middleware');

router.put('/upgrade/:id', auth, async (req, res) => {
  try {
    const edit = await User.findByIdAndUpdate(req.params.id, req.body);
    await edit.save();
    console.log(edit);
    res.status(201).json({ edit });
  } catch (e) {
    res.status(500).json({ message: 'Something wrong. Try again' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await User.findById(id, { password: 0, __v: 0 });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: 'Something wrong. Try again' });
  }
});

module.exports = router;
