const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    let product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.put('/:productId', async (req, res, next) => {
  console.log('this is the body', req.body)
  try {
    let product = await Product.findByPk(req.params.productId);
    await product.update({quantity: product.quantity - req.body.amount})
  } catch (error) {
    next(error);
  }
})

module.exports = router;
