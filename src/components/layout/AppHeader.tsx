import { Button, Layout, Select, Space, Modal, Drawer } from "antd";
import { useCrypto } from "../../hooks/useCripto";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import { Cripto } from "../../data";
import AddAssetForm from "../AddAssetForm";

const { Header} = Layout;

const headerStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};


export default function AppHeader() {
  const {cripto} = useCrypto();
  const [select, setSelect] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<Cripto | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const keypress = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setSelect(prev => !prev)
      }
    }

    document.addEventListener("keypress", keypress)

    return () => document.removeEventListener("keypress", keypress);
  }, [])

  function handleSelect (value: string) {
    setSelectedCoin(cripto.find(coin => coin.id === value) ?? null)
    showModal();
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Header style={headerStyle}>
      <Select
        style={{ width: "100%", maxWidth: "250px" }}
        value={"press / to open"}
        onClick={() => setSelect((prev) => !prev)}
        open={select}
        onSelect={handleSelect}
        options={cripto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
              aria-label={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
        Add asset
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}>
        <CoinInfoModal coin={selectedCoin} />
      </Modal>

      <Drawer
        title="Add Asset"
        destroyOnClose
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}>
        <AddAssetForm onClose={() => setIsDrawerOpen(false)} />
      </Drawer>
    </Header>
  );
}
