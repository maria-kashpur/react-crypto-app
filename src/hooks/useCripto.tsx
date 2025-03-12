import { useContext } from "react";
import CriptoContext from "../context/cripto-context";

export function useCrypto() {
  return useContext(CriptoContext);
}
