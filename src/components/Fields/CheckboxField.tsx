import React from 'react';
import { defaultInputStyles, Field, FieldProps } from './Field';

type CheckboxFieldProps = FieldProps & {
  onChange: (value: boolean) => void;
  value: boolean;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ onChange, label, value, variant }) => {

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.checked);
  }

  return <Field label={label} variant={variant}>
    <input
      style={{ ...defaultInputStyles, display: 'inline' }}
      type="checkbox"
      checked={value}
      onChange={handleChange} />
  </Field>;
}