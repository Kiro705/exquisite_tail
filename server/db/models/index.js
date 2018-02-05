const User = require('./user')
const Story = require('./story')
const Chapter = require('./chapter')
const FriendRequest = require('./friendRequest')
const Friend = require('./friend')

User.belongsToMany(User, {as: 'friend', through: Friend})
User.belongsToMany(User, {as: 'sender', through: FriendRequest})

FriendRequest.belongsTo(User, {as: 'sender'})
Friend.belongsTo(User, {as: 'friend'})

Story.belongsTo(User)

Chapter.belongsTo(User)
Chapter.belongsTo(Story)
Story.hasMany(Chapter, {as: 'content'})

module.exports = {
  User,
  Story,
  Chapter,
  FriendRequest,
  Friend
}
