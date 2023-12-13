import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface Props {
  color?: string;
}

const Spinner = ({ color }: Props) => {
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{ fontSize: 22, color: color || "#fff" }}
          spin
        />
      }
    />
  );
};

export default Spinner;
