"use strict";

import puppeteer from "puppeteer";
import SETTINGS from "./settings.js";
import { isStatementTrue } from "./statmentChecker.js";
import { extractfPrice, addComma } from "./utils.js";
import { notif } from "./notif.js";
import { symbols } from "./symbols.js";

(async () => {
  const setts = new SETTINGS();
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const symbol = await setts.getSymbol();

  console.log("goint to tsetmc.com!");
  const url = symbols[symbol];
  await page.goto(url, { waitUntil: "load", timeout: 0 });
  console.log("getting the price in 10 second...");
  await page.waitForTimeout(10000);

  const loop = setInterval(async () => {
    const sent = await setts.getSent();
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
  }, 1000 * 20);
})();
