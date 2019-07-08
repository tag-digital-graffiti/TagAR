const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router


router.get('/:userId', async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId)
    if (user) {
      res.send(user)
    } else {
      next();
    }
  } catch (error) {
    next(error)
  }
})
