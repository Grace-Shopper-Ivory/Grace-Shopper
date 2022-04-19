const Sequelize = require('sequelize')
const db = require('../db')
//const axios = require('axios');

const Product = db.define('product',{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:
        {notEmpty: true},
    },
    img: {
        type: Sequelize.STRING,
        defaultValue: "https://thumbs.dreamstime.com/b/no-thumbnail-image-148010362.jpg",
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: "no description provided, It's bread on a tree",
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate:
        {
            isDecimal: true,
            min: 0.00,
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
    },
    category: {
        type:Sequelize.STRING,
    }
})

module.exports = Product