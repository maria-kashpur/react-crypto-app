import React from "react";
import { Layout, Typography } from "antd";
import { useCrypto } from "../../hooks/useCripto";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  const { getTotalAmount } = useCrypto();

  return (
    <Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio: {getTotalAmount ? getTotalAmount() : 0}$
      </Typography.Title>
      <PortfolioChart/>
      <AssetsTable/>
    </Content>
  );
}
