"use strict";

import store, { initStore } from "./store.js";
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

await initStore();
await checkForShellArgs(process.argv);

// reading data from store
let max, min, symbol;

const refreshData = async () => {
  max = convertToInt(await store.get("max"));
  min = convertToInt(await store.get("min"));
  symbol = await store.get("symbol");
};

await refreshData();

logStatus(max, min, symbol);

setInterval(async () => {
  let price;
  await refreshData();
  const endpoint = symbols[symbol];

  await axios.get(endpoint).then((res) => {
    price = res.data.split(",")[2];
  });

  const HRPrice = humanRedable(price);

  console.log(symbol.yellow, " current price: ", HRPrice.yellow);

  await store.set("currentPrice", HRPrice);

  isStatementTrue(min, max, price, async (statement) => {
    if (statement) {
      console.log("notif!".cyan, `(${max}, ${min})`);
      const sent = await store.get("sent");
      if (!sent) {
        await notif(`قیمت ${symbol}: ${HRPrice}`);
        console.log();
        await store.set("sent", true);
      } else {
        console.log("SMS already been sent.", "\n");
      }
    } else {
      console.log("not yet...", "\n");
    }
  });

  // 1000 mili second = 1 second
}, 1000 * 5);
