import { Button } from "antd";

const IconButton = (props: any) => {

  const { className, children, ...rest } = props;

  return (
    <Button
      {...rest}
      className={`!p-0 !m-0 !w-[1.5rem] !h-[1.5rem] !flex !items-center !justify-center !bg-[#0000000a] ${className}`}
    >
      {children}
    </Button>
  )
}

export default IconButton;