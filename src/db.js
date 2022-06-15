"use strict";

import { readDb, writeDb, isFunction } from "./utils.js";

export default class DB {
  get(callback) {
    readDb((data) => {
      if (isFunction(callback)) {
        callback(data);
      }
    });
  }

  getMin(callback) {
    readDb((data) => {
      if (isFunction(callback)) {
        callback(data.min);
      }
    });
  }

  getMax(callback) {
    readDb((data) => {
      if (isFunction(callback)) {
        callback(data.max);
      }
    });
  }

  getSent(callback) {
    readDb((data) => {
      if (isFunction(callback)) {
        callback(data.sent);
      }
    });
  }

  getInterval(callback) {
    readDb((data) => {
      if (isFunction(callback)) {
        callback(data.interval);
      }
    });
  }

  setSent(value, callback) {
    writeDb("sent", value, callback);
  }
}
