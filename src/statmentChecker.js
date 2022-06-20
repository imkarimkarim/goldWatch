"use strict";

import { extractfPrice, isFunction } from "./utils.js";

import DB from "./db.js";
const db = new DB();

export const isStatementTrue = (price, callback) => {
  if (!price) {
    return false;
  }
  db.get((data) => {
    const min = extractfPrice(data.min);
    const max = extractfPrice(data.max);
    if (price <= min || price >= max) {
      db.setSent(true);
      if (isFunction(callback)) callback(true);
    } else {
      if (isFunction(callback)) callback(false);
    }
  });
};
