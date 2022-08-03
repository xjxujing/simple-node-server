const express = require("express");
const app = express();
const port = 3000;

const client = require("prom-client");
const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
