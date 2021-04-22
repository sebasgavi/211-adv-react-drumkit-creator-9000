import React from 'react';
import { defaultInputStyles, Field, FieldProps } from './Field';

type ColorFieldProps = FieldProps & {
  onChange: (value: string) => void;
  value: string;
}

export const ColorField: React.FC<ColorFieldProps> = ({ onChange, label, value, variant }) => {

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  }


  return <Field label={label} variant={variant}>
    <input
      style={defaultInputStyles}
      type="color"
      value={value}
      onChange={handleChange} />
  </Field>;
}