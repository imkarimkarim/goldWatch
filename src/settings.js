"use strict";

import fs from "fs";
import { isFunction } from "./utils.js";

export const readSettings = (callback) => {
  let data;
  fs.readFile("src/settings.json", (err, josn) => {
    if (err) {
      throw err;
    }
    data = JSON.parse(josn);
    if (isFunction(callback)) callback(data);
  });
};

export const writeSettings = (key, value, callback) => {
  let data;
  fs.readFile("src/settings.json", (err, josn) => {
    if (err) {
      throw err;
    }
    data = JSON.parse(josn);
    data[key] = value;
    const content = JSON.stringify(data);
    fs.writeFile("src/settings.json", content, (err) => {
      if (err) {
        throw err;
      }
      if (isFunction(callback)) callback(data);
    });
  });
};

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
