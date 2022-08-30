import express from "express";
import store from "./store.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
const saltRounds = 10;

const server = express();
server.use(express.static("public"));
server.use(bodyParser.json());
const port = 3000;

import "./app.js";

server.get("/", (req, res) => {
  res.send("index.html");
});

server.get("/api", async (req, res) => {
  res.send({
    symbol: await store.get("symbol"),
    min: await store.get("min"),
    max: await store.get("max"),
    currentPrice: await store.get("currentPrice"),
  });
});

server.post("/api", (req, res) => {
  console.log(req.body);
  // directly edit store
  // bcrypt.genSalt(saltRounds, function (err, salt) {
  //   bcrypt.hash(req.password, salt, function (err, hash) {
  //     console.log(hash);
  //   });
  // });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
