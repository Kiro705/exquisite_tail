const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

const FriendRequest = db.define('friendRequest', {})

module.exports = FriendRequest
