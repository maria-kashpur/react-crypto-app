import { Layout } from "antd";
const { Header} = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 60,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

export default function AppHeader() {
  return <Header style={headerStyle}>Header</Header>;
}
