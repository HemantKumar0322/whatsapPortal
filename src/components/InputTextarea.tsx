import { Input } from "antd";

const InputTextarea = (props: any) => {

  const { className, ...rest } = props;
  const { TextArea } = Input;
  return (
    <TextArea
      {...rest}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm ${className}`}
    />
  );
};

export default InputTextarea;
