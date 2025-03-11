import {cryptoData, cryptoAssets, Asset, CryptoData } from "./data";

export function fetchCriptData(): Promise<CryptoData> {
  return new Promise((res) => {
    setTimeout(() => {
      res(cryptoData);
    }, 1000);
  });
}

export function fetchCriptoAssets(): Promise<Asset[]> {
  return new Promise((res) => {
    setTimeout(() => {
      res(cryptoAssets);
    }, 1000);
  });
}