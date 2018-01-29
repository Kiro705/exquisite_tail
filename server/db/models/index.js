const User = require('./user')
const Story = require('./story')
const Chapter = require('./chapter')
const FriendRequest = require('./friendRequest')

User.belongsToMany(User, {as: 'friend', through: 'friends'})
User.belongsToMany(User, {as: 'sender', through: FriendRequest})

Story.belongsTo(User)

Chapter.belongsTo(User)
Chapter.belongsTo(Story)

module.exports = {
  User,
  Story,
  Chapter,
  FriendRequest
}
