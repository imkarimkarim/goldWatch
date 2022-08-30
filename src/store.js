"use strict";

import fs from "fs";
import { isFunction } from "./utils.js";

export const initStore = async () => {
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

  await store.set("sent", false);
};

export const readStoreFile = async (callback) => {
  let data;
  await fs.readFile("src/store.json", (err, json) => {
    if (err) {
      throw err;
    }
    data = JSON.parse(json);
    if (isFunction(callback)) callback(data);
  });
};

export const writeStoreFile = async (key, value, callback) => {
  await readStoreFile(async (data) => {
    data[key] = value;
    const content = JSON.stringify(data);
    console.log("content: ", content);
    await fs.writeFile("src/store.json", content, (err) => {
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
