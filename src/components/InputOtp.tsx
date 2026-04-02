import { Input } from 'antd';


const InputOtp = (props: any) => {

  const { onChange, onInput, ...rest } = props;

  return (
    <Input.OTP
      // formatter={(str) => str.toUpperCase()}
      onChange={onChange}
      onInput={onInput}
      {...rest}
    />
  )
};

export default InputOtp;