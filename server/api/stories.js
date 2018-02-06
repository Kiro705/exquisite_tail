const router = require('express').Router()
const {Story, User, Chapter} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Story.findAll()
    .then(stories => res.json(stories))
    .catch(next)
})

router.get('/:storyId', (req, res, next) => {
  Story.findById(req.params.storyId, {
    include: {model: Chapter, as: 'content'}
  })
    .then(theStory => res.json(theStory))
    .catch(next)
})

router.get('/myStories/:userId', (req, res, next) => {
  Story.findAll({where: {userId: req.params.userId}})
    .then(storyList => {
      const finshedStories = []
      const inProgressStories = []
      storyList.forEach(story => {
        if(story.chapterAmount < story.currentChapter){
          finshedStories.push(story)
        } else {
          inProgressStories.push(story)
        }
      })
      res.json({completed: finshedStories, inProgress: inProgressStories})
    })
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
