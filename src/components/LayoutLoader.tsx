import { Spin } from "antd";

const LayoutLoader = () => {
  return (
    <div className="absolute top-0 right-0 bg-[#FFFFFF50] w-full h-full flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
};

export default LayoutLoader;