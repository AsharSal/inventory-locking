const express = require("express");
const router = express.Router();
const { Product, sequelize } = require("../models");

router.post("/purchase", async (req, res) => {
  const { productId, quantity } = req.body;

  const t = await sequelize.transaction();

  try {
    const product = await Product.findOne({
      where: { id: productId },
      transaction: t,
      lock: t.LOCK.UPDATE, // THIS IS THE KEY: locks the row
    });

    if (!product) throw new Error("Product not found");
    if (product.stock < quantity) throw new Error("Insufficient stock");

    product.stock -= quantity;
    await product.save({ transaction: t });

    await t.commit();
    res.send({ message: "Purchase successful", remainingStock: product.stock });
  } catch (error) {
    await t.rollback();
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
