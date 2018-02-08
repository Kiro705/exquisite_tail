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
  Chapter.findAll({where: {userId}, include: {model: Story}})
    .then(chapterList => {
      const storyMemo = {}
      const finshedStories = []
      const inProgressStories = []
      chapterList.forEach(chapter => {
        let theStory = chapter.story
        if(!storyMemo[theStory.id]){
          storyMemo[theStory.id] = true
          if(theStory.chapterAmount < theStory.currentChapter){
            finshedStories.push(theStory)
          } else {
            inProgressStories.push(theStory)
          }
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
                  tempContent = [chapter]
                }
              })
              const editedStory = {id: theStory.id, title: theStory.title, content: tempContent, currentChapter: theStory.currentChapter, chapterLength: theStory.chapterLength, chapterAmount: theStory.chapterAmount, writerId: theStory.writerId, currentWriter: theStory.currentWriter, userId: theStory.userId, status: theStory.status}
              res.json(editedStory)
            } else if(theStory.status === 'story-finished') {
              res.json(theStory)
            } else {
              theStory.content = null
              res.json(theStory)
            }
          } else {
            res.json({id: -1, status: 'story-is-hidden'})
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
