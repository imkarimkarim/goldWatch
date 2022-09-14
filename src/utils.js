"use strict";

import redis from "./redisClient.js";

export const convertToInt = (strPrice) => {
  if (!strPrice) {
    return false;
  }
  strPrice = strPrice.toString();
  return parseInt(strPrice.replace(/,/g, ""));
};

export const humanRedable = (price) => {
  if (!price) return price;
  price = price.toString();
  let newNum = "";
  let count = 1;
  for (let i = price.length - 1; i >= 0; i--) {
    newNum = price[i] + newNum;
    if (count % 3 === 0 && i !== price.length - 1 && i !== 0) {
      newNum = "," + newNum;
    }
    count++;
  }
  return newNum;
};

export const isFunction = (callback) => {
  if (typeof callback === "function") {
    return true;
  }
  return false;
};

export const checkForShellArgs = async (processArgs) => {
  // reading value from command line args(optional)
  const maxArg = processArgs[2];
  const minArg = processArgs[3];
  const symbolArg = processArgs[4];
  if (maxArg !== undefined) await redis.set("max", humanRedable(maxArg));
  if (minArg !== undefined) await redis.set("min", humanRedable(minArg));
  if (symbolArg !== undefined) await redis.set("symbol", symbolArg);
};

export const logStatus = (max, min, symbol) => {
  console.log(
    "\n",
    `working on:
  ${max} <= ${symbol}
  ${min} >= ${symbol}`,
    "\n",
    "\n",
    "------------------- goldWatch -------------------",
    "\n"
  );
};
