const router = require('express').Router()
const {Story, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Story.findAll()
    .then(stories => res.json(stories))
    .catch(next)
})

router.get('/:storyId', (req, res, next) => {
  Story.findById(req.params.storyId)
    .then(theStory => res.json(theStory))
    .catch(next)
})

router.get('/myAuthoredStories/:userId', (req, res, next) => {
  Story.findAll({where: {userId: req.params.userId}})
    .then(storyList => res.json(storyList))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Story.create(req.body.story)
  	.then(newStory => {
  		User.findById(newStory.writerId)
  		.then(author => {
  			newStory.setUser(author)
  		})
      .then(result => res.json(newStory))
  	})
    .catch(next)
})
