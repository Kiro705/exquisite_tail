const User = require('./user')
const Story = require('./story')

Story.belongsTo(User)

module.exports = {
  User,
  Story
}
