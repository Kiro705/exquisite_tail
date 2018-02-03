const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/stories', require('./stories'))
router.use('/chapters', require('./chapters'))
router.use('/friendRequests', require('./friendRequests'))
router.use('/notifications', require('./notifications'))
router.use('/friends', require('./friends'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
