const router = require('express').Router();
const { User } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const user = User.findAll({
      attributes: ['id', 'username'],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    console.log(req.body);
    await User.create({ username, password });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
