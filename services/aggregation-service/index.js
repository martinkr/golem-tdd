const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

async function getAggregatedOrders(userId) {
  const users = await axios.get("http://localhost:3001/users");
  const products = await axios.get("http://localhost:3002/products");
  const orders = await axios.get("http://localhost:3003/orders");

  // Filtere Bestellungen nach userId, falls angegeben
  const filteredOrders = userId
    ? orders.data.filter((order) => order.userId === userId)
    : orders.data;

  // Erzeuge aggregierte Struktur für jede Bestellung
  return filteredOrders.map((order) => {
    const user = users.data.find((u) => u.id === order.userId);
    const matchedProducts = orders.data
      .filter((o) => o.userId === order.userId)
      .map((o) => {
        const product = products.data.find((p) => p.id === o.productId);
        return product ? { id: product.id, name: product.name } : null;
      })
      .filter(Boolean);

    return {
      id: order.id,
      user: user ? { id: user.id, name: user.name } : null,
      product: matchedProducts,
    };
  });
}

app.get("/aggregation", async (req, res) => {
  try {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const json = await getAggregatedOrders(userId);
    // const json = await getAggregatedOrders();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if (require.main === module) {
  app.listen(3000, () =>
    console.log("Aggregation-Service läuft auf Port 3000")
  );
}

module.exports = { getAggregatedOrders, app };
