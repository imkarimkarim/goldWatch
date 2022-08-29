import Ghasedak from "ghasedak";
import "dotenv/config";

export const notif = (msg) => {
  if (!msg) return false;
  const message = msg;
  let ghasedak = new Ghasedak(process.env.API_KEY);
  ghasedak.send({
    message: message,
    receptor: process.env.RECEPTOR,
    linenumber: process.env.LINE_NMBER,
  });
};

notif("test");
