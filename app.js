const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const purchaseRoutes = require("./routes/purchase");
const db = require("./models");

app.use(bodyParser.json());
app.use("/api", purchaseRoutes);

app.get("/", (req, res) => res.send("Inventory Locking API"));

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
  });
});
