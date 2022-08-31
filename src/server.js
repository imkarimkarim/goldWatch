import express from "express";
import store from "./store.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import "dotenv/config";
const saltRounds = 10;

const server = express();
server.use(express.static("public"));
server.use(bodyParser.json());
const port = 3000;

import "./app.js";
import { humanRedable } from "./utils.js";

server.get("/", (req, res) => {
  res.send("index.html");
});

server.get("/api", async (req, res) => {
  res.send({
    symbol: await store.get("symbol"),
    min: await store.get("min"),
    max: await store.get("max"),
    currentPrice: await store.get("currentPrice"),
    sent: await store.get("sent"),
  });
});

server.post("/api", async (req, res) => {
  console.log(req.body);

  bcrypt.compare(req.body.password, process.env.HASH, async (err, result) => {
    if (result) {
      const max = req.body.max;
      const min = req.body.min;
      const symbol = req.body.symbol;

      await store.set("sent", false);

      if (max !== undefined) await store.set("max", humanRedable(max));
      if (min !== undefined) await store.set("min", humanRedable(min));
      if (symbol !== undefined) await store.set("symbol", symbol);

      res.sendStatus(200);
    }
  });
});

server.listen(port, () => {
  console.log(`app listening on port ${port}`, "\n");
});
