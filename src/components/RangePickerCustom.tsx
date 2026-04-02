import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface RangePickerCustomProps {
  value?: [string, string] | null;
  onChange?: (dates: [string, string] | null) => void;
  placeholder?: [string, string];
  className?: string;
  disabled?: boolean;
  allowClear?: boolean;
  format?: string;
  size?: 'large' | 'middle' | 'small';
  style?: React.CSSProperties;
  id: string;
  name: string;
}

const RangePickerCustom: React.FC<RangePickerCustomProps> = ({
  value,
  onChange,
  placeholder = ['Start Date', 'End Date'],
  className = '',
  disabled = false,
  allowClear = true,
  format = 'YYYY-MM-DD',
  size = 'middle',
  style,
  id,
  name,
}) => {
  
  const handleChange = (dates: any, dateStrings: [string, string]) => {
    if (onChange) {
      onChange(dates ? dateStrings : null);
    }
  };

  const formatValue = (): [dayjs.Dayjs, dayjs.Dayjs] | null => {
    if (!value || !Array.isArray(value) || value.length !== 2) {
      return null;
    }
    
    const [startDate, endDate] = value;
    if (!startDate || !endDate) {
      return null;
    }

    return [dayjs(startDate), dayjs(endDate)];
  };

  return (
    <RangePicker
      value={formatValue()}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full ${className}`}
      disabled={disabled}
      allowClear={allowClear}
      format={format}
      size={size}
      id={id}
      name={name}
      {...(style && { style })}
    />
  );
};

export default RangePickerCustom; 