const express = require("express");
const cors = require('cors');

const routers = require("./router/routers");

const HTTP_PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(routers);

app.listen(HTTP_PORT || 8080, () => {
  console.log(`Listening on port: ${HTTP_PORT}`);
});
