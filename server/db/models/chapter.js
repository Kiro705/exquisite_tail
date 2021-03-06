const Sequelize = require('sequelize')
const db = require('../db')

const Chapter = db.define('chapter', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  place: {
  	type: Sequelize.INTEGER,
		allowNull: false
  },
})

module.exports = Chapter
