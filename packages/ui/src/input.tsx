'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  id,
  className = '',
  style,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.815rem',
            fontWeight: 500,
            color: '#94a3b8',
            letterSpacing: '0.01em',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        style={{
          width: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          border: error ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '0.55rem 0.85rem',
          color: '#f8fafc',
          fontSize: '0.875rem',
          outline: 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          fontFamily: 'inherit',
          ...style,
        }}
        className={`egp-input ${className}`}
        {...props}
      />
      {error ? (
        <span style={{ fontSize: '0.75rem', color: '#f43f5e', marginTop: '0.1rem' }}>
          {error}
        </span>
      ) : helperText ? (
        <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.1rem' }}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
