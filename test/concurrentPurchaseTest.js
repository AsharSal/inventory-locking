const axios = require("axios");

const CONCURRENT_REQUESTS = 10;
const API_URL = "http://localhost:5000/api/purchase";
const requestData = {
  productId: 1, // Make sure this product exists and has limited stock
  quantity: 1,
};

async function sendPurchaseRequest(id) {
  try {
    const response = await axios.post(API_URL, requestData);
    console.log(
      `Request ${id}: ✅ Success - Remaining stock: ${response.data.remainingStock}`
    );
  } catch (error) {
    console.log(
      `Request ${id}: ❌ Failed - ${
        error.response?.data?.error || error.message
      }`
    );
  }
}

async function runConcurrentPurchases() {
  const requests = [];

  for (let i = 1; i <= CONCURRENT_REQUESTS; i++) {
    requests.push(sendPurchaseRequest(i));
  }

  await Promise.all(requests);
}

runConcurrentPurchases();
