import fs from "fs";

let appDataPath, path;
if (process.platform === "win32") {
  appDataPath = process.env.TEMP + "\\goldWatch";
  path = appDataPath + "\\store.json";
} else {
  appDataPath = process.env.TEMP + "/goldWatch";
  path = appDataPath + "/store.json";
}

console.log(appDataPath);
console.log(path);

if (!fs.existsSync(appDataPath)) {
  fs.mkdirSync(appDataPath);
}

export const initStore = async () => {
  const initialStore = {
    symbol: "طلا",
    min: "0",
    max: "0",
    sent: false,
    currentPrice: "0",
  };

  if (!(await fs.existsSync(path))) {
    const content = JSON.stringify(initialStore);
    fs.writeFile(path, content, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  await store.set("sent", false);
};
