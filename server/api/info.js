const router = require('express').Router();
const {
  models: { Order, User, Product },
} = require('../db');

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    user.dataValues.orders = await Order.findAll({
      where: {
        userId: req.params.id,
        inCart: false,
      },
    });

    user.dataValues.cartItems = await Order.findAll({
      where: {
        userId: req.params.id,
        inCart: true,
      },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
