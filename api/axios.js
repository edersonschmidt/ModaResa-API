const axios = require("axios");

const URL = "https://api.binance.com/api";

module.exports = axios.create({
  baseURL: URL,
  timeout: 1000
});
