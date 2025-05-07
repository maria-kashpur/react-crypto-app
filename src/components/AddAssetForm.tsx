import {
  Button,
  DatePicker,
  Divider,
  Form,
  FormProps,
  InputNumber,
  Result,
  Select,
  Space,
} from "antd";
import { useRef, useState } from "react";
import { useCrypto } from "../hooks/useCripto";
import { Asset, Cripto } from "../data";
import CoinInfo from "./CoinInfo";

type FieldType = {
  amount: number;
  price: string;
  total: string;
  date?: {$d?: Date};
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
  number: {
    range: "'${label}' must be between ${min} and ${max}!",
  },
};

interface AddAssetFormProps {
  onClose: () => void;
}

export default function AddAssetForm({ onClose }: AddAssetFormProps) {
  const { cripto, addAsset } = useCrypto();
  const [coin, setCoin] = useState<Cripto | null>(null);
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef<null | Asset>(null)

  const select = (
    <Select
      style={{ width: "100%" }}
      placeholder={"Select coin"}
      onSelect={(value) =>
        setCoin(cripto.find((item) => item.id === value) ?? null)
      }
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
  );

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const data: Asset = {
      id: `${coin?.id}`,
      amount: values.amount,
      price: +values.price,
      date: (values.date && "$d" in values.date && values.date?.$d) ? values.date?.$d : new Date(),
    };

    assetRef.current = data;

    if (addAsset === undefined) {
      throw new Error("addAsset is not found");
    }
    addAsset(data)
    setSubmitted(true);
  };

  function handleAmountChange(value: number | null) {
    const currentPrice = Number(form.getFieldValue("price"));

    const newTotal = (currentPrice * Number(value)).toFixed(2);
    form.setFieldValue("total", newTotal);
  }

  function handlePriceChange(value: number | null) {
    const currentAmount = Number(form.getFieldValue("amount"));

    const newTotal = (currentAmount * Number(value)).toFixed(2);
    form.setFieldValue("total", newTotal);
  }

  const formEl = (
    <Form
      form={form}
      validateMessages={validateMessages}
      name="basic"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 10 }}
      style={{ width: "100%" }}
      initialValues={{ price: coin?.price.toFixed(2) ?? 0 }}
      onFinish={onFinish}>

      {coin && <CoinInfo coin={coin}/>}

      <Divider />

      <Form.Item<FieldType>
        style={{ width: "100%" }}
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}>
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
        />
      </Form.Item>

      <Form.Item<FieldType> label="Price" name="price">
        <InputNumber style={{ width: "100%" }} onChange={handlePriceChange} />
      </Form.Item>

      <Form.Item<FieldType> label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item<FieldType> label="Total" name="total">
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add asset
        </Button>
      </Form.Item>
    </Form>
  );

  const result = (
    <Result
      status="success"
      title="New asset added!"
      subTitle={`Added ${assetRef.current?.amount} of ${coin?.name} by price ${assetRef.current?.price}`}
      extra={[
        <Button type="primary" key="console" onClick={onClose}>
          Close
        </Button>
      ]}
    />
  );

  if (submitted) {
    return result;
  }
  return !coin ? select : formEl;
}
