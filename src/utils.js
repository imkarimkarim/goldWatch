"use strict";
import fs from "fs";

const removeComma = (strPrice) => {
  if (!strPrice) {
    return false;
  }
  return strPrice.replace(",", "");
};

export const extractfPrice = (html) => {
  if (!html) {
    return false;
  }
  const regex = /\d{3},\d{3}/g;
  const strPrice = html.match(regex);
  const price = parseInt(removeComma(strPrice[0]));
  return price;
};

export const readDb = (callback) => {
  let data;
  fs.readFile("src/db.json", (err, josn) => {
    if (err) {
      throw err;
    }
    data = JSON.parse(josn);
    if (typeof callback === "function") {
      callback(data);
    }
  });
};

export const writeDb = (key, value, callback) => {
  let data;
  fs.readFile("src/db.json", (err, josn) => {
    if (err) {
      throw err;
    }
    data = JSON.parse(josn);
    data[key] = value;
    const content = JSON.stringify(data);
    fs.writeFile("src/db.json", content, (err) => {
      if (err) {
        throw err;
      }
      if (typeof callback === "function") {
        callback(data);
      }
    });
  });
};

export const isFunction = (callback) => {
  if (typeof callback === "function") {
    return true;
  }
  return false;
};
