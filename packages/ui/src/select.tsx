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
            fontWeight: 600,
            color: 'var(--foreground-secondary, #475569)',
          }}
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        style={{
          width: '100%',
          backgroundColor: 'var(--input-bg, #FFFFFF)',
          border: error ? '1px solid var(--danger, #BE123C)' : '1px solid var(--input-border, #CBD5E1)',
          borderRadius: 'var(--radius-control, 8px)',
          padding: '0.55rem 0.85rem',
          color: 'var(--foreground, #1F2937)',
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
          <option key={opt.value} value={opt.value} style={{ background: '#FFFFFF', color: '#1F2937' }}>
            {opt.label}
          </option>
        ))}
        {children}
      </select>
      {error && (
        <span style={{ fontSize: '0.75rem', color: 'var(--danger, #BE123C)', marginTop: '0.1rem' }}>
          {error}
        </span>
      )}
    </div>
  );
}
