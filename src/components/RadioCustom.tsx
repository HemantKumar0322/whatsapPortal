import React from 'react';
import { Radio } from 'antd';

interface RadioCustomProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: { label: string; value: string }[];
  disabled?: boolean;
  className?: string;
}

const RadioCustom: React.FC<RadioCustomProps> = ({
  value,
  onChange,
  options = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ],
  disabled = false,
  className = '',
}) => {
  const handleChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Radio.Group
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className={`w-full ${className}`}
    >
      {options.map((option) => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default RadioCustom; 