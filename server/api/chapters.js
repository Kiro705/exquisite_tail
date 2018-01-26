const router = require('express').Router()
const {Story, User, Chapter} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Chapter.create(req.body.chapter)
  	.then(newChapter => {
  		User.findById(req.body.userId)
  		.then(author => {
  			newChapter.setUser(author)
  		})
      Story.findById(req.body.storyId)
      .then(theStory => {
        const nextChapter = theStory.currentChapter + 1
        theStory.update({currentChapter: nextChapter})
      })
      .then(theStory => {
        newChapter.setStory(theStory)
      })
  	})
    .then(newChapter => res.json(newChapter))
    .catch(next)
})
