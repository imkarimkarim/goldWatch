"use strict";

import store from "./store.js";
import { isStatementTrue } from "./statmentChecker.js";
import { humanRedable, convertToInt } from "./utils.js";
import { notif } from "./notif.js";
import { symbols } from "./symbols.js";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import colors from "colors";

// reading value from command line args(optional)
const maxArg = process.argv[2];
const minArg = process.argv[3];
const symbolArg = process.argv[4];
if (maxArg !== undefined) await store.set("max", humanRedable(maxArg));
if (minArg !== undefined) await store.set("min", humanRedable(minArg));
if (symbolArg !== undefined) await store.set("symbol", symbolArg);

// reading data from store
const symbol = await store.get("symbol");
const min = convertToInt(await store.get("min"));
const max = convertToInt(await store.get("max"));

console.log(
  "\n",
  `working on:
  ${humanRedable(max)} <= ${symbol}
  ${humanRedable(min)} >= ${symbol}`.cyan,
  "\n",
  "\n",
  "------------------- goldWatch -------------------".yellow,
  "\n"
);
const url = symbols[symbol];

const loop = setInterval(async () => {
  let price = 0;
  await axios.get(url).then((res) => {
    price = res.data.split(",")[2];
  });

  console.log(symbol.yellow, " current price: ", humanRedable(price).yellow);
  await store.set("currentPrice", humanRedable(price));
  isStatementTrue(min, max, price, (statement) => {
    if (statement) {
      console.log("notif!".cyan);
      notif(`قیمت ${symbol}: ${humanRedable(price)}`);
      clearInterval(loop);
    } else {
      console.log("not yet...", "\n");
    }
  });

  // 1000 mili second = 1 second
}, 1000 * 4);
