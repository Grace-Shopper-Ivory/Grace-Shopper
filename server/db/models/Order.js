const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  Orderid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  productId: {
    type: Sequelize.INTEGER,
  },
  amount: {
    type: Sequelize.INTEGER,
  },
  dateOrdered: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  priceOfItem: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  inCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Order;
