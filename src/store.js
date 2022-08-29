"use strict";

import fs from "fs";
import { isFunction } from "./utils.js";

export const readStoreFile = (callback) => {
  let data;
  fs.readFile("src/store.json", (err, josn) => {
    if (err) {
      throw err;
    }
    data = JSON.parse(josn);
    if (isFunction(callback)) callback(data);
  });
};

export const writeStoreFile = (key, value, callback) => {
  let data;
  fs.readFile("src/store.json", (err, josn) => {
    if (err) {
      throw err;
    }
    data = JSON.parse(josn);
    data[key] = value;
    const content = JSON.stringify(data);
    fs.writeFile("src/store.json", content, (err) => {
      if (err) {
        throw err;
      }
      if (isFunction(callback)) callback(data);
    });
  });
};

export default class store {
  static get(key) {
    return new Promise((resolve) => {
      readStoreFile((data) => {
        resolve(data[key]);
      });
    });
  }

  static set(key, value) {
    return new Promise((resolve) => {
      writeStoreFile(key, value, () => {
        resolve();
      });
    });
  }
}
