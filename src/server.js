import express from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import "dotenv/config";
import redis from "./redisClient.js";
import { humanRedable } from "./utils.js";

import "./app.js";

const server = express();
server.use(express.static("public"));
server.use(bodyParser.json());
const port = 3000;

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
  bcrypt.compare(req.body.password, process.env.HASH, async (err, result) => {
    if (result) {
      const max = req.body.max;
      const min = req.body.min;
      const symbol = req.body.symbol;

      if (max !== undefined) await redis.set("max", humanRedable(max));
      if (min !== undefined) await redis.set("min", humanRedable(min));
      if (symbol !== undefined) await redis.set("symbol", symbol);
      await redis.set("sent", "false");

      res.sendStatus(200);
    }
  });
});

server.listen(port, () => {
  console.log(`app listening on port ${port}`, "\n");
});
