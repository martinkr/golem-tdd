const axios = require("axios");

const getAggregatedOrders = async () => {
  try {
    const response = await axios.get("http://localhost:3000/aggregation");
    return response.data;
  } catch (error) {
    console.error("Error fetching aggregated orders:", error.message);
    throw error;
  }
};

(async () => {
  try {
    const aggregatedOrders = await getAggregatedOrders();
    console.log(aggregatedOrders);
  } catch (error) {
    console.error("Failed to fetch initial data");
  }
})();
