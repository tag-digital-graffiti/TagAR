<<<<<<< HEAD
const router = require('express').Router();
module.exports = router;
=======
const router = require('express').Router()
module.exports = router

router.use('/tags', require('./tag'))
>>>>>>> 5a1e8712cb7ab15f5616ce05583d3f131755ee25

router.use('/tags', require('./tag'));
router.use('/user', require('./user'));
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
