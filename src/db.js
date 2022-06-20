"use strict";

import { readDB, writeDB, isFunction } from "./utils.js";

export default class DB {
  get(callback) {
    readDB((data) => {
      if (isFunction(callback)) {
        callback(data);
      }
    });
  }

  getMin(callback) {
    readDB((data) => {
      if (isFunction(callback)) {
        callback(data.min);
      }
    });
  }

  getMax(callback) {
    readDB((data) => {
      if (isFunction(callback)) {
        callback(data.max);
      }
    });
  }

  getSent(callback) {
    readDB((data) => {
      if (isFunction(callback)) {
        callback(data.sent);
      }
    });
  }

  getInterval(callback) {
    readDB((data) => {
      if (isFunction(callback)) {
        callback(data.interval);
      }
    });
  }

  setSent(value, callback) {
    writeDB("sent", value, callback);
  }
}
