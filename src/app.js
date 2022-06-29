"use strict";

import puppeteer from "puppeteer";
import SETTINGS from "./settings.js";
import { isStatementTrue } from "./statmentChecker.js";
import { extractfPrice, addComma } from "./utils.js";
import { notif } from "./notif.js";

const setts = new SETTINGS();
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

console.log("goint to tsetmc.com!");
const url = "http://tsetmc.com/Loader.aspx?ParTree=151311&i=46700660505281786";
await page.goto(url, { waitUntil: "load", timeout: 0 });
console.log("getting the price in 10 second...");
await page.waitForTimeout(10000);

const loop = setInterval(async () => {
  setts.getSent(async (sent) => {
    if (!sent) {
      const html = await page.$eval("#d02", (el) => el.innerHTML);
      const price = extractfPrice(html);
      console.log("current price: ", price);

      isStatementTrue(price, (bool) => {
        if (bool) {
          console.log("notif!");
          notif(`قیمت طلا: ${addComma(price)}`);
        } else {
          console.log("not yet...");
        }
      });
    } else {
      setts.setSent(false);
      await browser.close();
      clearInterval(loop);
    }
  });
}, 1000 * 20);
