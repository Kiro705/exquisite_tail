const router = require('express').Router()
const {User, Friend, FriendRequest} = require('../db/models')
module.exports = router

router.get('/:userId', (req, res, next) => {
  Friend.findAll({
    where: {userId: req.params.userId},
    include: [{model: User, as: 'friend', attributes: ['id', 'email', 'nickname']}]
  })
  .then(friendData => {
    let tempList = []
    friendData.forEach(data => {
      tempList.push(data.friend)
    })
    return tempList
  })
	.then(friendsList => res.json(friendsList))
	.catch(next)
})

//Confirm friend request
router.post('/', (req, res, next) => {
  const userPromise = Friend.create({userId: req.body.userId, friendId: req.body.senderId})
  const senderPromise = Friend.create({userId: req.body.senderId, friendId: req.body.userId})
  const notificationPromise = FriendRequest.findOne({
    where: {userId: req.body.userId, senderId: req.body.senderId}
  })

  Promise.all([userPromise, senderPromise, notificationPromise])
  .then(promArr => {
    promArr[2].destroy()
    User.findById(req.body.senderId)
    .then(sender => {
      const senderObj = {id: sender.id, email: sender.email}
      res.json([senderObj, sender.socketId])
    })
  })
  .catch(next)
})

//Reject friend request
router.put('/reject', (req, res, next) => {
  FriendRequest.findOne({where: {userId: req.body.userId, senderId: req.body.senderId}})
  .then(request => request.destroy())
  .then(something => {
    res.json(['senderId', req.body.senderId])
  })
  .catch(next)
})
