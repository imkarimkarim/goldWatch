import bcrypt from "bcrypt";
const saltRounds = 10;
import "dotenv/config";

bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash("firooz@1400", salt, async function (err, hash) {
    console.log("firooz@1400", hash);
  });
});

bcrypt.compare("firooz@1400", process.env.HASH, function (err, result) {
  console.log(result);
});
