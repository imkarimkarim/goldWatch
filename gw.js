'use strict';

const util = require('util');
const axios = require('axios');
const sleep = util.promisify(setTimeout);
// const Ghasedak = require('ghasedak');
const { exec } = require('child_process');
require('dotenv').config();

const getPrice = async () => {
    const goldEndPoint = 'https://cdn.tsetmc.com/api/ClosingPrice/GetClosingPriceInfo/25559236668122210';

    return axios
        .get(goldEndPoint)
        .then((res) => {
            const price = res.data.closingPriceInfo.pDrCotVal;
            return parseInt(price);
        })
        .catch((err) => {
            console.error(err);
        });
};

const humanReadable = (price) => {
    if (!price) return price;
    price = price.toString();
    let newNum = '';
    let count = 1;
    for (let i = price.length - 1; i >= 0; i--) {
        newNum = price[i] + newNum;
        if (count % 3 === 0 && i !== price.length - 1 && i !== 0) {
            newNum = ',' + newNum;
        }
        count++;
    }
    return newNum;
};

const convertToInt = (strPrice) => {
    if (!strPrice) return;

    strPrice = strPrice.toString();
    return parseInt(strPrice.replace(/,/g, ''));
};

const logStatus = (min, max, price) => {
    console.log(
        `condition:
    ${humanReadable(price)} <= ${humanReadable(min)} 
    ${humanReadable(price)} >= ${humanReadable(max)} 
    `,
        '\n'
    );
};

const checkStatement = (min, max, price, callback) => {
    if (min === undefined || max === undefined || price === undefined) return;

    min = convertToInt(min);
    max = convertToInt(max);
    price = convertToInt(price);

    if (price <= min || price >= max) {
        if (typeof callback === 'function') callback(true);
    } else {
        if (typeof callback === 'function') callback(false);
    }
};

const notif = (msg) => {
    exec(`xdg-open ${__dirname}/ding.mp3`);
    exec(`xdg-open ${__dirname}/ding.png`);
    if (!msg) return false;
    // exec('xdg-open pwd');
    // const message = msg;
    // let ghasedak = new Ghasedak(process.env.API_KEY);
    // ghasedak.send({
    //   message: message,
    //   receptor: process.env.RECEPTOR,
    //   linenumber: process.env.LINE_NUMBER,
    // });
};

(async () => {
    let bool = true;

    if (process.argv[2] === '--price') {
        const price = await getPrice();
        console.log(humanReadable(price), 'Rials');
        return;
    }

    const [min, max] = [convertToInt(process.argv[2]), convertToInt(process.argv[3])];
    if (isNaN(min) || isNaN(max)) {
        console.log(`
    Usage: gw [options...] <min> <max>
    
    --price    show current gold price

    example:
        gw 100,000 150,000    if gold price gets lesser than 100,000 or greater than 150,000 will notify
    `);
        return;
    }

    while (bool) {
        await sleep(10000);
        const price = await getPrice();
        logStatus(min, max, price);
        checkStatement(min, max, price, (status) => {
            if (status) {
                notif(`Gold Price: ${humanReadable(price)}`);
                bool = false;
            }
        });
    }
})();
