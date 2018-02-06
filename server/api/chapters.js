const router = require('express').Router()
const {Story, User, Chapter} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  const {content, nextArr, story, userId} = req.body
  Chapter.create({content, place: story.currentChapter})
  	.then(newChapter => {
  		User.findById(userId)
  		.then(author => {
  			newChapter.setUser(author)
  		})
      Story.findById(story.id)
      .then(theStory => {
        const nextChapter = theStory.currentChapter + 1
        return theStory.update({currentChapter: nextChapter, currentWriter: nextArr[1], writerId: nextArr[0]})
      })
      .then(theStory => {
        newChapter.setStory(theStory)
      })
  	})
    .then(newChapter => res.json(newChapter))
    .catch(next)
})
