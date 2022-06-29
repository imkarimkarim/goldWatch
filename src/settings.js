"use strict";

import { readSettings, writeSettings } from "./utils.js";

export default class SETTINGS {
  get() {
    return new Promise((resolve) => {
      readSettings((data) => {
        resolve(data);
      });
    });
  }

  getSymbol() {
    return new Promise((resolve) => {
      readSettings((data) => {
        resolve(data.symbol);
      });
    });
  }

  getSent() {
    return new Promise((resolve) => {
      readSettings((data) => {
        resolve(data.sent);
      });
    });
  }

  setSent(value, callback) {
    writeSettings("sent", value, callback);
  }
}
