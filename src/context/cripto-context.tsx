import React, { createContext, useEffect, useState } from "react";
import { Asset, Cripto } from "../data";
import { fetchCriptData, fetchCriptoAssets } from "../api";
import percentDifference from "../utils/percentDifference";

interface Props {
  children: React.ReactNode;
}

interface AssetPro extends Asset {
  grow: boolean;
  growPercent: number;
  totalAmount: number;
  totalProfit: number;
}

interface CryptoContext {
  assets: AssetPro[];
  cripto: Cripto[];
  loading: boolean;
  addAsset?: (data: Asset) => void;
  getTotalAmount?: () => number;
}

const CRYPTO_CONTEXT_DEFAULT: CryptoContext = {
  assets: [],
  cripto: [],
  loading: false,
};

const CriptoContext = createContext<CryptoContext>(CRYPTO_CONTEXT_DEFAULT);
export default CriptoContext;

export function CriptoContextProvider({ children }: Props) {
  const [loading, setLoading] = useState<CryptoContext["loading"]>(false);
  const [cripto, setCripto] = useState<CryptoContext["cripto"]>([]);
  const [assets, setAssets] = useState<CryptoContext["assets"]>([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fetchCriptData();
      const assets = await fetchCriptoAssets();
      setCripto(result);
      setAssets(assets.map((asset) => mapAsset(asset, result)));
    }

    preload().finally(() => setLoading(false));
  }, []);

  function mapAsset(asset: Asset, result: Cripto[]): AssetPro {
    const coin = result.find((c) => c.id === asset.id);

    if (coin === undefined) {
      throw new Error("id is not found");
    }

    return {
      grow: asset.price < coin.price,
      growPercent: percentDifference(asset.price, coin.price),
      totalAmount: asset.amount * coin.price,
      totalProfit: asset.amount * coin.price - asset.amount * asset.price,
      ...asset,
    };
        
  }

  function addAsset(data: Asset): void {
    const newAsset = mapAsset(data, cripto)

    setAssets(prev => [...prev, newAsset])
  }

  function getTotalAmount(): number {
    const cryptoPriceMap = cripto.reduce((acc: {[key: string]: number}, c) => {
      acc[c.id] = c.price;
      return acc;
    }, {});

    return +(assets
      .map((asset) => asset.amount * cryptoPriceMap[asset.id])
      .reduce((acc, v) => (acc += v), 0)
      .toFixed(2));
  }

  return (
    <CriptoContext.Provider
      value={{ assets, cripto, loading, addAsset, getTotalAmount }}>
      {children}
    </CriptoContext.Provider>
  );
}

