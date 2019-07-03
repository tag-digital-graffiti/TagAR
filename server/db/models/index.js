

// register models
// require('./models')
const User = require('./users')
const Tag = require('./tags')

// User.hasMany(Order)
// Order.belongsTo(User)
Tag.belongsTo(User)
User.hasMany(Tag)

module.exports = {

  User,
  Tag
}
