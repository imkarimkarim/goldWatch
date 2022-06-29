"use strict";
import fs from "fs";

const removeComma = (strPrice) => {
  if (!strPrice) {
    return false;
  }
  return strPrice.replace(/,/g, "");
};

export const addComma = (price) => {
  if (!price) {
    return false;
  }
  price = price.toString();
  return price.slice(0,3) + ',' + price.slice(3, 6);
};

export const extractfPrice = (html) => {
  if (!html) {
    return false;
  }
  const regex = /\d{1,3},\d{1,3},?\d{1,3},?/;
  const strPrice = html.match(regex);
  const price = parseInt(removeComma(strPrice[0]));
  return price;
};

export const isFunction = (callback) => {
  if (typeof callback === "function") {
    return true;
  }
  return false;
};

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