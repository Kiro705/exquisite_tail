const router = require('express').Router()
const {User, FriendRequest} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  const senderId = req.body.userId
  User.findOne({ where: {email: req.body.email} })
  .then(recipient => {
    if(recipient === null){
      res.json('user-not-found')
    } else {
      if(recipient.id === senderId) {
        res.json('self-user-failure')
      } else {
        FriendRequest.create({userId: recipient.id, senderId})
        .then(result => {
          res.json('success')
        })
        .catch(error => {
          res.send(error.name)
          //Should be 'SequelizeUniqueConstraintError'
        })
      }
    }
  })
  .catch(next)
})
