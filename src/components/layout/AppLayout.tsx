import { Layout, Spin } from "antd";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import { useCrypto } from "../../hooks/useCripto";

export default function AppLayout() {
  const { loading } = useCrypto();

  if (loading) return <Spin fullscreen />;

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
