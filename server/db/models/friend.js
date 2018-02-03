const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

const Friend = db.define('friendship', {})

module.exports = Friend
