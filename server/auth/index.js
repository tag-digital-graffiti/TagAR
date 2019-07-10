const router = require('express').Router()
const User = require('../db/models/users')
module.exports = router

router.post('/login', async (req, res, next) => {
  console.log(req.body)
  try {
    const user = await User.findOne({ where: { username: req.body.username } })
    if (!user) {
      console.log('No such user found:', req.body.username)
      res.send('No such user found!')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.username)
      res.send('Wrong password, try again')
    } else {
      res.send(user)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    })
    res.send(user)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.send('User already exists')
    } else {
      next(err)
    }
  }
})

