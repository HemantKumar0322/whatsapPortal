import { Select } from "antd";

const SelectCustom = (props: any) => {

  const { label, className, placeholder="Select",...rest } = props;

  return (
    <>
      <div className="mb-0 text-[12px] font-bold">{label}</div>
      <Select
        className={`w-full rounded-md focus:outline-none text-sm bg-gray-50 !h-[38px] ${className}`}
        {...rest}
        placeholder={placeholder}
      />
    </>
  );
};

export default SelectCustom;
