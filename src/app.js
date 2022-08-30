"use strict";

import store from "./store.js";
import { isStatementTrue } from "./statmentChecker.js";
import { humanRedable, convertToInt } from "./utils.js";
import { notif } from "./notif.js";
import { symbols } from "./symbols.js";
import axios from "axios";

// reading value from command line args(optional)
const minArg = convertToInt(process.argv[2]);
const maxArg = convertToInt(process.argv[3]);
const symbolArg = process.argv[4];
if (minArg !== undefined) await store.set("min", humanRedable(minArg));
if (maxArg !== undefined) await store.set("max", humanRedable(maxArg));
if (symbolArg !== undefined) await store.set("symbol", symbolArg);

// reading data from store
const symbol = await store.get("symbol");
const min = convertToInt(await store.get("min"));
const max = convertToInt(await store.get("max"));

console.log("working on: ", min, ">", symbol, "<", max);
const url = symbols[symbol];

const loop = setInterval(async () => {
  const sent = await store.get("sent");
  if (!sent) {
    let price = 0;
    await axios.get(url).then((res) => {
      price = res.data.split(",")[2];
    });

    console.log(symbol, " current price: ", humanRedable(price));

    isStatementTrue(min, max, price, (statement) => {
      if (statement) {
        console.log("notif!");
        notif(`قیمت ${symbol}: ${humanRedable(price)}`);
        store.set("sent", true);
      } else {
        console.log("not yet...");
      }
    });
  } else {
    store.set("sent", false);
    clearInterval(loop);
  }

  // 1000 mili second = 1 second
}, 1000 * 4);
