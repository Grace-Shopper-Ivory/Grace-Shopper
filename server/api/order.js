const router = require('express').Router();
const {
  models: { Order, User, Product },
} = require('../db');
/*
refactor for shopping cart called orders:
here we need:
get requests to display product info that has been added to the  to a user and not purchased. ***
put requests to update quantityin cart.
delete to fully remove an unordered product from cart.
put request to 'purchace' an item and change the boollean to true
*/
// /api/orders
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId/:userId', async (req, res, next) => {
  try {
     const cart = await Order.findOne({
       where: {
         userId: req.params.userId,
         productId: req.params.productId,
         inCart: true
       },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
