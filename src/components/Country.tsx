import React from 'react';
import { Select } from 'antd';
import { countries } from '@/utils/countryList';
import SelectCustom from './SelectCustom';

interface CountrySelectProps {
  onChangeEvent?: (e: any, value: any) => void;
  value?: string;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  onChangeEvent,
  value,
  placeholder = "Choose a country",
  size = 'small',
  disabled = false,
  className = "",
  name = "",
  id = ""
}) => {

  const handleChange = (selectedValue: string) => {
    const selectedCountry = countries.find(country => country.code === selectedValue);
    if (onChangeEvent) {
      onChangeEvent(null, selectedCountry);
    }
  };

  return (
    <SelectCustom
      value={value || null}
      // value={"IN"}
      onChange={handleChange}
      placeholder={placeholder}
      size={size}
      name={name}
      id={id}
      disabled={disabled}
      className={`w-full ${className} !h-[40px]`}
      showSearch
      filterOption={(input: any, option: any) => {
        const country = countries.find(c => c.code === option?.value);
        if (!country) return false;
        return (
          country.label.toLowerCase().includes(input.toLowerCase()) || country.phone.includes(input) || `+${country.phone}`.includes(input)
        );
      }}
      optionFilterProp="children"
    >
      {countries.map((country) => (
        <Select.Option key={country.code} value={country.code}>
          <div className="flex items-center gap-2">
            <img
              loading="lazy"
              width="20"
              height="15"
              src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
              alt={`${country.label} flag`}
              className="rounded-sm"
            />
            {/* <span className="text-sm">+{country.phone}</span> */}
            <span className="text-sm">+{country.phone} {country.label}</span>
          </div>
        </Select.Option>
      ))}
    </SelectCustom>
  );
};

export default CountrySelect;