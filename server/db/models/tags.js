const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('tag', {
  lat: {
    type: Sequelize.FLOAT,
  },
  long: {
    type: Sequelize.FLOAT,
  },
  assetUrl: {
    type: Sequelize.TEXT
  },
  arTagUrl: {
    type: Sequelize.TEXT
  }
})

module.exports = Tag

