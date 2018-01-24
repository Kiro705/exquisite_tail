const router = require('express').Router()
const {Story} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Story.findAll()
    .then(stories => res.json(stories))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Story.create(req.body)
    .then(newStory => res.json(newStory))
    .catch(next)
})
