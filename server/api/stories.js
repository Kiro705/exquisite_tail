const router = require('express').Router()
const {story} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Story.findAll()
    .then(stories => res.json(stories))
    .catch(next)
})
