const User = require('./user')
const Story = require('./story')

User.belongsToMany(Story, {as: 'author', through: 'authorTable'})

module.exports = {
  User,
  Story
}
