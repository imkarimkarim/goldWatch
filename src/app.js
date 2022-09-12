"use strict";

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
import redis from "./redisClient.js";

await checkForShellArgs(process.argv);

// reading data from store
let max, min, symbol;

// set default values if not setted yet
if (!(await redis.get("symbol"))) {
  await redis.set("symbol", "طلا");
}
if (!(await redis.get("max"))) {
  await redis.set("max", "0");
}
if (!(await redis.get("min"))) {
  await redis.set("min", "0");
}
if (!(await redis.get("sent"))) {
  await redis.set("sent", "true");
}
if (!(await redis.get("currentPrice"))) {
  await redis.set("currentPrice", "0");
}

const refreshData = async () => {
  max = convertToInt(await redis.get("max"));
  min = convertToInt(await redis.get("min"));
  symbol = await redis.get("symbol");
};

await refreshData();

logStatus(max, min, symbol);

setInterval(async () => {
  let price;
  await refreshData();
  const endpoint = symbols[symbol];

  await axios
    .get(endpoint)
    .then((res) => {
      price = res.data.split(",")[2];
    })
    .catch((err) => {
      console.error(err);
    });

  const HRPrice = humanRedable(price);

  console.log(symbol.yellow, " current price: ", HRPrice.yellow);

  await redis.set("currentPrice", HRPrice);

  isStatementTrue(min, max, price, async (statement) => {
    if (statement) {
      console.log("notif!".cyan, `(${max}, ${min})`);
      const sent = await redis.get("sent");
      if (sent === "false") {
        if (process.env.ENV == "dev") {
          console.log("hypothetical SMS has been sent successfully.", "\n");
        } else {
          await notif(`قیمت ${symbol}: ${HRPrice}`);
        }
        console.log();
        await redis.set("sent", "true");
      } else {
        console.log("SMS already been sent.", "\n");
      }
    } else {
      console.log("not yet...", "\n");
    }
  });

  // 1000 mili second = 1 second
}, 1000 * 5);
