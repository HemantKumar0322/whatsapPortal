
export const LabelInput = (props: any) => {

  const { children, className, required = false, ...rest } = props;

  return (
    <label
      className={`text-[14px] font-medium text-gray-700 ${className}`}
      {...rest}
    >{children} {required && <span className="text-red-600">*</span>}</label>
  )
};

export const FormError = ({ errors }: { errors: any }) => {
  return <p className="text-[11px] text-red-600 !m-0">{errors as any}</p>
};

