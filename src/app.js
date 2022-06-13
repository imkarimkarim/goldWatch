"use strict";

const puppeteer = require("puppeteer");

const extractfPrice = (html) => {
  if (!html) {
    return false;
  }
  return parseInt(html[0] + html[1] + html[2] + html[4] + html[5] + html[6]);
};

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log('goint to tsetmc.com!');
  const url =
    "http://tsetmc.com/Loader.aspx?ParTree=151311&i=46700660505281786";
  await page.goto(url);
  console.log('getting the price in 10 second...');
  await page.waitForTimeout(10000);
  const searchValue = await page.$eval("#d02", (el) => el.innerHTML);
  console.log("current price: ", extractfPrice(searchValue));

  // await browser.waitForTarget(
  //   () => {
  //     return false;
  //   },
  //   { timeout: 0 }
  // );
  await browser.close();
})();
