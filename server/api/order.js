const router = require("express").Router();
const {
  models: { Order, User, Product },
} = require("../db");

// /api/order
router.get("/:id", async (req, res, next) => {
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

router.get("/", async (req, res, next) => {
  try {
    let orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.delete("/:productId/:userId", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId,
        inCart: true,
      },
    });
    cart.destroy();
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId/:productId", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId,
        inCart: true,
      },
    });

    res.json(await cart.update(req.body));
  } catch (err) {
    next(err);
  }
});


router.put("/:userId", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    });
    await Promise.all(
      orders.map((order) => {
        return order.update({inCart: false})
      })
    )
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})


router.post('/:productId/:userId', async (req, res, next) => {
  try {
    try {
      const inCart = await Order.findOne({
        where: {
          userId: req.params.userId,
          productId: req.params.productId,
          inCart: true,
        },
      });
      console.log("the body!", req.body);
      res.json(
        await inCart.update({ amount: inCart.amount + req.body.amount })
      );
    } catch (error) {
      res.status(201).send(await Order.create(req.body));
    }
  } catch (error) {
    next(error);
  }
});

router.post('/guest', async (req,res,next)=>{
  try{
    let guestOrders = req.body
    res.status(201).send(
      guestOrders.map((order) => {
      return Order.create(order)
    }))
  }
  catch(err){
    next(err)
  }
})

module.exports = router;
