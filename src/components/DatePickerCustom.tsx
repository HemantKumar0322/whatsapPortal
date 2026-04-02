import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

interface DatePickerCustomProps {
  value?: string;
  onChange?: (date: string | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  allowClear?: boolean;
  format?: string;
  size?: 'large' | 'middle' | 'small';
  style?: React.CSSProperties;
}

const DatePickerCustom: React.FC<DatePickerCustomProps> = ({
  value,
  onChange,
  placeholder = 'Select Date',
  className = '',
  disabled = false,
  allowClear = true,
  format = 'YYYY-MM-DD',
  size = 'middle',
  style,
}) => {
  const handleChange = (date: any, dateString: string | string[]) => {
    if (onChange) {
      const dateValue = Array.isArray(dateString) ? dateString[0] : dateString;
      onChange(date ? (dateValue || '') : null);
    }
  };

  const formatValue = (): dayjs.Dayjs | null => {
    if (!value) {
      return null;
    }
    return dayjs(value);
  };

  return (
    <DatePicker
      value={formatValue()}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full !h-[38px] ${className}`}
      disabled={disabled}
      allowClear={allowClear}
      format={format}
      size={size}
      {...(style && { style })}
    />
  );
};

export default DatePickerCustom; 