import React, {
  createContext,
  useEffect,
  useState,
} from "react";
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

interface CriptoContext {
  assets: AssetPro[];
  cripto: Cripto[];
  loading: boolean;
}

const CRIPTO_CONTEXT_DEFAULT: CriptoContext = {
  assets: [],
  cripto: [],
  loading: false,
};

const CriptoContext = createContext<CriptoContext>(CRIPTO_CONTEXT_DEFAULT);
export default CriptoContext;

export function CriptoContextProvider({ children }: Props) {
  const [loading, setLoading] = useState<CriptoContext["loading"]>(false);
  const [cripto, setCripto] = useState<CriptoContext["cripto"]>([]);
  const [assets, setAssets] = useState<CriptoContext["assets"]>([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fetchCriptData();
      const assets = await fetchCriptoAssets();
      setCripto(result);
      setAssets(
        assets.map((asset) => {
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
        })
      );
    }

    preload().finally(() => setLoading(false));
  }, []);

  return (
    <CriptoContext.Provider value={{ assets, cripto, loading }}>
      {children}
    </CriptoContext.Provider>
  );
}