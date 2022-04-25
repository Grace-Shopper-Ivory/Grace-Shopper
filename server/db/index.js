//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

//associations could go here!
User.belongsToMany(Product, { through: {model: Order, unique: false}});
Product.belongsToMany(User, { through: {model: Order, unique: false}});
module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
  },
};
