const router = require("express").Router();
// const { useImperativeHandle } = require("react");
const {
  models: { Order, User, Product },
} = require("../db");

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
    let users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
