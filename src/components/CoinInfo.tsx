import { Flex, Typography } from 'antd';
import { Cripto } from '../data';

interface CoinInfoProps {
  coin: Cripto;
  withSymbol?: boolean;
}

export default function CoinInfo({ coin, withSymbol = false }: CoinInfoProps) {
  return (
    <Flex align="center">
      <img
        src={coin?.icon}
        alt={coin?.name}
        style={{ width: 40, marginRight: 10 }}
      />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol && <span>({coin.symbol})</span>} {coin?.name}
      </Typography.Title>
    </Flex>
  );
}
