import React from 'react';

export interface FieldProps {
  label: string;
  variant?: 'default'|'primary'|'error';
}

export const defaultInputStyles = { display: 'block', marginTop: 2, marginBottom: 10 };

export const Field: React.FC<FieldProps> = ({ label, variant = 'default', children }) => {
  let color = 'black';
  switch(variant) {
    case 'error':
      color = 'red';
      break;
    case 'primary':
      color = 'blue';
      break;
  }

  return <label style={{ display: 'block' }}>
    <span style={{ color, fontWeight: 'bold' }}>{label}</span>
    {children}
  </label>;
}