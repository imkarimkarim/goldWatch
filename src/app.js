"use strict";

import puppeteer from "puppeteer";
import DB from "./db.js";
import { isStatementTrue } from "./statmentChecker.js";
import { extractfPrice, addComma } from "./utils.js";
import { notif } from "./notif.js";

const db = new DB();
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

console.log("goint to tsetmc.com!");
const url = "http://tsetmc.com/Loader.aspx?ParTree=151311&i=46700660505281786";
await page.goto(url);
console.log("getting the price in 10 second...");
await page.waitForTimeout(10000);

const loop = setInterval(async () => {
  db.getSent(async (sent) => {
    if (!sent) {
      const html = await page.$eval("#d02", (el) => el.innerHTML);
      console.log("current price: ", extractfPrice(html));
      const price = extractfPrice(html);

      isStatementTrue(price, (bool) => {
        if (bool) {
          console.log('notif!');
          notif(`قیمت طلا: ${addComma(price)}`);
        } else {
          console.log('not yet...');
        }
      });
    } else {
      db.setSent(false);
      await browser.close();
      clearInterval(loop);
    }
  });
}, 1000 * 20);
