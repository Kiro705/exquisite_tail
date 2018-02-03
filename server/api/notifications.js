const router = require('express').Router()
const {Story, User, FriendRequest} = require('../db/models')
module.exports = router

router.get('/:userId', (req, res, next) => {

  const friendRequestPromise = FriendRequest.findAll({
    where: {userId: req.params.userId},
    include: [{model: User, as: 'sender', attributes: ['id', 'email']}]
  })

  Promise.all([friendRequestPromise])
  .then(resultArr => {
    let singleResults = []
    resultArr.forEach(result => {
      singleResults = singleResults.concat(result)
    })

    const sortFunc = function(a, b) {
      return a.createdAt - b.createdAt
    }
    
    singleResults.sort(sortFunc)
    res.json(singleResults)
  })
  .catch(next)
})
