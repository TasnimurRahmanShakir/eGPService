'use client';

import React from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  options,
  placeholder,
  id,
  className = '',
  style,
  children,
  ...props
}: SelectProps) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%' }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            fontSize: '0.815rem',
            fontWeight: 500,
            color: '#94a3b8',
          }}
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        style={{
          width: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          border: error ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '0.55rem 0.85rem',
          color: '#f8fafc',
          fontSize: '0.875rem',
          outline: 'none',
          fontFamily: 'inherit',
          cursor: 'pointer',
          ...style,
        }}
        className={`egp-select ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: '#0b1120', color: '#f8fafc' }}>
            {opt.label}
          </option>
        ))}
        {children}
      </select>
      {error && (
        <span style={{ fontSize: '0.75rem', color: '#f43f5e', marginTop: '0.1rem' }}>
          {error}
        </span>
      )}
    </div>
  );
}
