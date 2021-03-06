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
  currentChapter: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  currentWriter: {
    type: Sequelize.STRING,
  },
  writerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'in-progress'
  },
  public: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: true
  }
})

module.exports = Story
