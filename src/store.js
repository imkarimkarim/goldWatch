"use strict";

import fs from "fs";
import { isFunction } from "./utils.js";

let appDataPath, path;
if (process.platform === "win32") {
  appDataPath = process.env.TEMP + "\\goldWatch";
  path = appDataPath + "\\store.json";
} else {
  appDataPath = process.env.TEMP + "/goldWatch";
  path = appDataPath + "/store.json";
}

if (!(await fs.existsSync(appDataPath))) {
  await fs.mkdirSync(appDataPath);
}

export const initStore = async () => {
  const initialStore = {
    symbol: "طلا",
    min: "0",
    max: "0",
    sent: false,
    currentPrice: "0",
  };

  if (!(await fs.existsSync(path))) {
    const content = JSON.stringify(initialStore);
    fs.writeFile(path, content, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  await store.set("sent", false);
};

export const readStoreFile = async (callback) => {
  let data;
  await fs.readFile(path, (err, json) => {
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
    await fs.writeFile(path, content, (err) => {
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
