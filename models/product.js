module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
  });
  return Product;
};
