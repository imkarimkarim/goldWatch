"use strict";

import store from "./store.js";
import { isStatementTrue } from "./statmentChecker.js";
import {
  humanRedable,
  convertToInt,
  checkForShellArgs,
  logStatus,
} from "./utils.js";
import { notif } from "./notif.js";
import { symbols } from "./symbols.js";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import colors from "colors";

await checkForShellArgs();

// reading data from store
const symbol = await store.get("symbol");
const min = convertToInt(await store.get("min"));
const max = convertToInt(await store.get("max"));

logStatus(max, min, symbol);

const loop = setInterval(async () => {
  let price;
  const endpoint = symbols[symbol];

  await axios.get(endpoint).then((res) => {
    price = res.data.split(",")[2];
  });

  const HRPrice = humanRedable(price);

  console.log(symbol.yellow, " current price: ", HRPrice.yellow);

  await store.set("currentPrice", HRPrice);

  isStatementTrue(min, max, price, (statement) => {
    if (statement) {
      console.log("notif!".cyan);
      notif(`قیمت ${symbol}: ${HRPrice}`);
      clearInterval(loop);
    } else {
      console.log("not yet...", "\n");
    }
  });

  // 1000 mili second = 1 second
}, 1000 * 4);
