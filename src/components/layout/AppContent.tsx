import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  return <Content style={contentStyle}>Content</Content>;
}
