import { Input } from "antd";

const InputCustom = (props: any) => {

  const { className, ...rest } = props;

  return (
    <Input
      {...rest}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm  !disabled:bg-gray-200 disabled:text-gray-500 ${className}`}
    />
  );
};

export default InputCustom;
