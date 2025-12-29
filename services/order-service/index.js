const express = require("express");

const app = express();
app.use(express.json());

const orders = [{ id: 1, userId: 1, productId: 1 }];

app.get("/orders", (req, res) => {
  console.log(`Order Data: ${JSON.stringify(orders)}`);
  res.json(orders);
});

app.listen(3003, () => console.log("Order-Service läuft auf Port 3003"));
