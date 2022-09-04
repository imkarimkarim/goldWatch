# goldWatch Documentation

watch with actuall price but calculate the price by % سود و زیان

## SMS notif

checkout .envExample file

## About The App

app has three main part(app itself, server, Front-end):

- app: main app which collects data and send notif based on "statment"
- server: express server
- Front-end: Front-end of the app

## config

rename .envExample to .env in order for app to work properly <br>
by default the goldWatch use [ghasedak](https://ghasedak.me/) as SMS service but you can change to every sms service you want(makr sure to edit notif.js too). <br>
API_KEY = get it from sms service provider (ghasedak by default) <br>
RECEPTOR = receptor number <br>
LINE_NMBER = number provided by sms service <br>
HASH = password which will be check to change the values from front-end(method will change later) <br>
DB_PORT, DB_HOST, DB_PASS = Redis server info provided by [liara](https://liara.ir/)
