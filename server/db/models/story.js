const Sequelize = require('sequelize')
const db = require('../db')

const Story = db.define('story', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  chapterAmount: {
  	type: Sequelize.INTEGER,
		allowNull: false
  },
  chapterLength: {
  	type: Sequelize.INTEGER,
		allowNull: false
  },
  public: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: true
  }
})

module.exports = Story
