import { Button, ButtonProps } from "antd";

const ButtonSimple = (props: ButtonProps) => {

  const {
    children,
    className,
    ...rest
  } = props;

  return (
    <Button
      className={`w-full py-2 rounded-md disabled:opacity-60 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 ${className}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonSimple;

// !bg-[#4a5568] !hover:bg-[#2d3748] font-semibold !hover:text-white !text-white !focus:text-white