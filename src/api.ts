import {cryptoData, cryptoAssets } from "./data";

export function fetchCriptData() {
  return new Promise (res => {
    setTimeout(() => {
      res(cryptoData)
    }, 1000)
  })
}

export function fetchCriptoAssets() {
  return new Promise((res) => {
    setTimeout(() => {
      res(cryptoAssets);
    }, 1000);
  });
}