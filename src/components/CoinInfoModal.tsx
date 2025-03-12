import { Cripto } from "../data"

interface Props {
  coin: Cripto | null
}

export default function CoinInfoModal({coin}: Props) {
  if (coin === null) return null;
  
  return (
    <div>{coin.name}</div>
  )
}
