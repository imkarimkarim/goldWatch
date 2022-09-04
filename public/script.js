const main = () => {
  const api = document.URL + "api";

  let flag = true;

  setInterval(() => {
    if (flag) {
      // eslint-disable-next-line no-undef
      axios
        .get(api)
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
            <h2 id="sent">sent: ${data.sent}</h2>
          <h2></h2></div>`;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, 1000 * 5);

  const puff = `<img src="puff.svg" alt="loading image..." />`;

  document.getElementById("editButton").addEventListener("click", () => {
    document.querySelector("form").classList.toggle("hide");
  });

  document.getElementById("submitButton").addEventListener("click", (e) => {
    e.preventDefault();

    const symbol = document.getElementById("symbolInput").value;
    const max = document.getElementById("maxInput").value;
    const min = document.getElementById("minInput").value;
    const password = document.getElementById("passwordInput").value;

    // eslint-disable-next-line no-undef
    axios
      .post(api, {
        symbol: symbol,
        max: max,
        min: min,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          document.querySelector("form").classList.toggle("hide");
          document.getElementById("data").innerHTML = puff;
          flag = false;
          setTimeout(() => {
            flag = true;
          }, 1000 * 5);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

// Check if the DOMContentLoaded has already been completed
if (document.readyState !== "loading") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}
