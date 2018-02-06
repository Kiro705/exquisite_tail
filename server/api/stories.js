const router = require('express').Router()
const {Story, User, Chapter} = require('../db/models')
module.exports = router

// router.get('/', (req, res, next) => {
//   Story.findAll()
//     .then(stories => res.json(stories))
//     .catch(next)
// })

router.get('/myStories/:userId', (req, res, next) => {
  const userId = req.params.userId
  Story.findAll({where: {userId}})
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

router.get('/:storyId/:userId', (req, res, next) => {
  const userId = +req.params.userId
  const storyId = +req.params.storyId
  Story.findById(storyId, {
    include: {model: Chapter, as: 'content', include:{model: User}}
  })
    .then(theStory => {
      if(theStory === null) {
        res.json(null)
      } else {
        const userList = []
        let userBelongs
        if(theStory.content){
          theStory.content.forEach(chapter => {
            userList.push(chapter.userId)
          })
          userBelongs = userList.includes(userId)
          if(userBelongs || theStory.writerId === userId){
            if(theStory.writerId === userId){
              let tempContent = null
              theStory.content.forEach(chapter => {
                if(chapter.place === theStory.currentChapter - 1) {
                  tempContent = chapter.content
                }
              })
              theStory.content = tempContent
              res.json(theStory)
            } else if(theStory.currentWriter === 'story-finished') {
              res.json(theStory)
            } else {
              theStory.content = null
              res.json(theStory)
            }
          } else {
            res.json({id: -1, currentWriter: 'story-is-hidden'})
          }
        }
      }
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
