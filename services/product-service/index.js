const express = require("express");

const app = express();
app.use(express.json());

const products = [{ id: 1, name: "Laptop" }];

app.get("/products", (req, res) => {
  console.log(`Product Data: ${JSON.stringify(products)}`);
  res.json(products);
});

app.listen(3002, () => console.log("Product-Service läuft auf Port 3002"));
