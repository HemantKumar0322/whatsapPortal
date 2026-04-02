import { Checkbox } from 'antd';



const InputCheckbox = (props: any) => {
  const { children, className, ...rest }: any = props;
  return (
    <Checkbox
      className={` ${className}`}
      {...rest}
    ><p className="text-[12px] m-0 p-0">{children}</p></Checkbox>
  )
};

export default InputCheckbox;