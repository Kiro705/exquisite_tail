const User = require('./user')
const Story = require('./story')
const Chapter = require('./chapter')


Story.belongsTo(User)

Chapter.belongsTo(User)
Chapter.belongsTo(Story)

module.exports = {
  User,
  Story,
  Chapter
}
