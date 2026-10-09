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
            fontWeight: 600,
            color: 'var(--foreground-secondary, #475569)',
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
          backgroundColor: 'var(--input-bg, #FFFFFF)',
          border: error ? '1px solid var(--danger, #BE123C)' : '1px solid var(--input-border, #CBD5E1)',
          borderRadius: 'var(--radius-control, 8px)',
          padding: '0.55rem 0.85rem',
          color: 'var(--foreground, #1F2937)',
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
        <span style={{ fontSize: '0.75rem', color: 'var(--danger, #BE123C)', marginTop: '0.1rem' }}>
          {error}
        </span>
      ) : helperText ? (
        <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground, #64748B)', marginTop: '0.1rem' }}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
