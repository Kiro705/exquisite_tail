const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

const FriendRequest = db.define('friendRequest', {})

/**
 * instanceMethods
 */
FriendRequest.prototype.confirmRequest = function () {
	const sender = User.findById(FriendRequest.sender)
	const recipient = User.findById(FriendRequest.recipient)
	Promise.all([sender, recipient])
	.then(resultArr => {
		console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', resultArr)
	})
}

module.exports = FriendRequest
