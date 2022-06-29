"use strict";

import { readSettings, writeSettings, isFunction } from "./utils.js";

export default class SETTINGS {
  get(callback) {
    readSettings((data) => {
      if (isFunction(callback)) {
        callback(data);
      }
    });
  }

  getMin(callback) {
    readSettings((data) => {
      if (isFunction(callback)) {
        callback(data.min);
      }
    });
  }

  getMax(callback) {
    readSettings((data) => {
      if (isFunction(callback)) {
        callback(data.max);
      }
    });
  }

  getSent(callback) {
    readSettings((data) => {
      if (isFunction(callback)) {
        callback(data.sent);
      }
    });
  }

  getInterval(callback) {
    readSettings((data) => {
      if (isFunction(callback)) {
        callback(data.interval);
      }
    });
  }

  setSent(value, callback) {
    writeSettings("sent", value, callback);
  }
}
