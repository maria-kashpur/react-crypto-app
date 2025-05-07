import {
  cryptoData,
  cryptoAssets,
  Asset,
  CryptoData,
} from "./data";

// In a real project this is bad practice because the key is visible in the browser.
const apiKey = import.meta.env.VITE_API_KEY;

// Get comprehensive data about all cryptocurrencies
export function fetchCriptData(): Promise<CryptoData> {

  if (typeof apiKey === "undefined") {
    console.error(
      "Аpi key is not valid or not found. Fake data is currently being used."
    );
    return new Promise((res) => {
      setTimeout(() => {
        res(cryptoData);
      }, 1000);
    });
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  };

  return fetch("https://openapiv1.coinstats.app/coins", options)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      return new Promise((res) => {
        setTimeout(() => {
          res(cryptoData);
        }, 1000);
      });
    });
}

export function fetchCriptoAssets(): Promise<Asset[]> {
  return new Promise((res) => {
    setTimeout(() => {
      res(cryptoAssets);
    }, 1000);
  });
}
