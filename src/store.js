"use strict";

import fs from "fs";
import { isFunction } from "./utils.js";

const initialStore = {
  symbol: "طلا",
  min: "0",
  max: "0",
  sent: false,
  currentPrice: "0",
};

if (!(await fs.existsSync("src/store.json"))) {
  const content = JSON.stringify(initialStore);
  fs.writeFile("src/store.json", content, (err) => {
    if (err) {
      throw err;
    }
  });
}

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
  readStoreFile((data) => {
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
      writeStoreFile(key, value, (data) => {
        resolve(data);
      });
    });
  }
}
