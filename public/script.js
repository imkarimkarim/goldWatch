const main = () => {
  const baseUrl = "http://localhost:3000/api";

  setInterval(() => {
    // eslint-disable-next-line no-undef
    axios
      .get(baseUrl)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          document.getElementById("data").innerHTML = `
          <div>
            <h2 id="symbol">${data.symbol}</h2>
            <h2 id="currentPrice">${data.currentPrice}</h2>
            <div id="min-max-container">
              <h2 id="max">${data.max}</h2>
              <h2 id="min">${data.min}</h2>
            </div>
          <h2></h2></div>`;
        }
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, 1000 * 3);

  document.getElementById("button").addEventListener("click", () => {
    // eslint-disable-next-line no-undef
    axios.post(baseUrl, {
      message: "karim chetori?",
    });
  });
};

// Check if the DOMContentLoaded has already been completed
if (document.readyState !== "loading") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}
