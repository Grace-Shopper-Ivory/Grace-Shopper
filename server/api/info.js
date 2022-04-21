const router = require('express').Router();
const {
  models: { Order, User, Product },
} = require('../db');

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    });
    // user.dataValues.orders = await Order.findAll({
    //   where: {
    //     userId: req.params.id,
    //     inCart: false,
    //   },
    //   include: [Product],
    // });

    // let cartItems = await Order.findAll({
    //   where: {
    //     userId: req.params.id,
    //     inCart: true,
    //   },
    // });
    // console.log(cartItems.map((cartItems) => cartItems.order.);

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
