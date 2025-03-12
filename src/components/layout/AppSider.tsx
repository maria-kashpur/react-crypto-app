import React from "react";
import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { BaseType } from "antd/es/typography/Base";
import { useCrypto } from "../../hooks/useCripto";

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  padding: "1rem",
};

export default function AppSider() {
  const { assets } = useCrypto();

  return (
    <Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card style={{ marginBottom: "1rem" }} key={asset.id}>
          <Statistic
            title={asset.id.replace(/^\w/, (char) => char.toUpperCase())}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            dataSource={[
              {
                title: "Total Profit",
                value: asset.totalProfit.toFixed(2),
                plain: "$",
                color: asset.grow ? "success" : "danger",
                tag: (
                  <Tag color={asset.grow ? "green" : "red"}>
                    {asset.growPercent}%
                  </Tag>
                ),
              },
              { title: "Asset Amount", value: asset.amount },
            ]}
            size="small"
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.tag ?? ""}
                  <Typography.Text type={item.color as BaseType | undefined}>
                    {item.value}
                    {item.plain ?? ""}
                  </Typography.Text>
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Sider>
  );
}
