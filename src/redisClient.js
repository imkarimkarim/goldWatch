import Redis from "ioredis";
import "dotenv/config";

const redis = new Redis({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
});

redis.on("connect", function () {
  console.log("Connected to Redis!");
});

redis.on("error", (err) => {
  console.log("Error " + err);
});

export default redis;
