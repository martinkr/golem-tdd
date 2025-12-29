const express = require("express");
const axios = require("axios");
const CircuitBreaker = require("opossum");

const app = express();
app.use(express.json());

const fetchWithBreaker = (url) => {
  const breaker = new CircuitBreaker(() => axios.get(url), {
    timeout: 3000, // 3 seconds timeout
    errorThresholdPercentage: 50, // opens circuit if 50% of requests fail
    resetTimeout: 10000, // after 10 seconds, retry failed service
  });

  breaker.fallback(() => {
    console.error(`Service unavailable: ${url}`);
    return { data: [] };
  });

  return breaker.fire();
};

const getAggregatedOrders = async () => {
  try {
    const [users, products, orders] = await Promise.all([
      fetchWithBreaker("http://localhost:3001/users"),
      fetchWithBreaker("http://localhost:3002/products"),
      fetchWithBreaker("http://localhost:3003/orders"),
    ]);

    return orders.data.map((order) => {
      const user = users.data.find((u) => u.id === order.userId);
      const product = products.data.find((p) => p.id === order.productId);
      return {
        id: order.id,
        user: user ? { id: user.id, name: user.name } : null,
        product: product ? { id: product.id, name: product.name } : null,
      };
    });
  } catch (error) {
    console.error("Failed to fetch aggregated orders:", error.message);
    throw error;
  }
};

app.get("/aggregation", async (req, res) => {
  try {
    const json = await getAggregatedOrders();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch aggregated orders" });
  }
});

app.listen(3000, () => console.log("Aggregation-Service läuft auf Port 3000"));
