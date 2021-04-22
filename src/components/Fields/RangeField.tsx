import React from 'react';
import { defaultInputStyles, Field, FieldProps } from './Field';

type RangeFieldProps = FieldProps & {
  min: number;
  max: number;
  onChange: (value: number) => void;
  value: number;
}

export const RangeField: React.FC<RangeFieldProps> = ({ min, max, onChange, label, value, variant }) => {

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(parseInt(event.target.value));
  }

  return <Field label={label} variant={variant}>
    <input
      style={defaultInputStyles}
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={handleChange} />
  </Field>;
}