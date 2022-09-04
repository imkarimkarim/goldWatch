# goldWatch Documentation

## About The App

the app has three main parts (app itself, server, and Front-end):

- app: the main app that collects data and sends notif based on "statement"
- server: express server glue that connects the app and the front-end together
- Front-end: Front-end of the app to see and change the data

## SMS notif

checkout .envExample file

## config

rename .envExample to .env in order for app to work properly <br>
by default the goldWatch use [ghasedak](https://ghasedak.me/) as an SMS service but you can change it to every SMS service you want(make sure to edit notif.js too). <br>
API_KEY = get it from the SMS service provider (ghasedak by default) <br>
RECEPTOR = receptor number <br>
LINE_NMBER = number provided by SMS service <br>
HASH = password which will be checked to change the values from the Front-end(method will change later) <br>
DB_PORT, DB_HOST, DB_PASS = Redis server info provided by [liara](https://liara.ir/)

(remember to don't use double quotes)

## tip

watch with the actual price but calculate the price by % سود و زیان
