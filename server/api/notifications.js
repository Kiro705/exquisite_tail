const router = require('express').Router()
const {Story, User, FriendRequest} = require('../db/models')
module.exports = router

router.get('/:userId', (req, res, next) => {

  const friendRequestPromise = FriendRequest.findAll({
    where: {userId: req.params.userId},
    include: [{model: User, as: 'sender', attributes: ['id', 'email']}]
  })

  const currentWriterPromise = Story.findAll({
    where: {writerId: req.params.userId},
  })

  Promise.all([friendRequestPromise, currentWriterPromise])
  .then(resultArr => {
    let singleResults = []
    resultArr.forEach(result => {
      singleResults = singleResults.concat(result)
    })

    const sortFunc = function(a, b) {
      return b.createdAt - a.createdAt
    }
    
    singleResults.sort(sortFunc)
    res.json(singleResults)
  })
  .catch(next)
})
