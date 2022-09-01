import express from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import "dotenv/config";
import redis from "./redisClient.js";
import { humanRedable } from "./utils.js";

const server = express();
server.use(express.static("public"));
server.use(bodyParser.json());
const port = 3000;

redis.on("connect", function () {
  console.log("Connected to Redis!");
});

redis.on("error", (err) => {
  console.log("Error " + err);
});

// set default values
await redis.set("symbol", "طلا");
await redis.set("max", "0");
await redis.set("min", "0");
await redis.set("sent", "true");
await redis.set("currentPrice", "0");

import "./app.js";

server.get("/", (req, res) => {
  res.send("index.html");
});

server.get("/api", async (req, res) => {
  res.send({
    symbol: await redis.get("symbol"),
    max: await redis.get("max"),
    min: await redis.get("min"),
    sent: await redis.get("sent"),
    currentPrice: await redis.get("currentPrice"),
  });
});

server.post("/api", async (req, res) => {
  console.log(req.body);

  bcrypt.compare(req.body.password, process.env.HASH, async (err, result) => {
    if (result) {
      const max = req.body.max;
      const min = req.body.min;
      const symbol = req.body.symbol;

      await redis.set("sent", false);

      if (max !== undefined) await redis.set("max", humanRedable(max));
      if (min !== undefined) await redis.set("min", humanRedable(min));
      if (symbol !== undefined) await redis.set("symbol", symbol);

      res.sendStatus(200);
    }
  });
});

server.listen(port, () => {
  console.log(`app listening on port ${port}`, "\n");
});
