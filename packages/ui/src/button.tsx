'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'emerald' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  children,
  className = '',
  disabled,
  style,
  ...props
}: ButtonProps) {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--primary, #0F766E)',
          color: '#FFFFFF',
          border: '1px solid transparent',
          boxShadow: '0 1px 2px rgba(15, 118, 110, 0.2)',
          borderRadius: 'var(--radius-control, 8px)',
        };
      case 'emerald':
        return {
          backgroundColor: 'var(--success, #047857)',
          color: '#FFFFFF',
          border: '1px solid transparent',
          boxShadow: '0 1px 2px rgba(4, 120, 87, 0.2)',
          borderRadius: 'var(--radius-control, 8px)',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--danger, #BE123C)',
          color: '#FFFFFF',
          border: '1px solid transparent',
          boxShadow: '0 1px 2px rgba(190, 18, 60, 0.2)',
          borderRadius: 'var(--radius-control, 8px)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--surface, #FFFFFF)',
          color: 'var(--foreground, #1F2937)',
          border: '1px solid var(--border-strong, #CBD5E1)',
          boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(15, 23, 42, 0.05))',
          borderRadius: 'var(--radius-control, 8px)',
        };
      case 'outline':
        return {
          backgroundColor: 'var(--surface, #FFFFFF)',
          color: 'var(--primary, #0F766E)',
          border: '1px solid var(--primary-border, #99F6E4)',
          boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(15, 23, 42, 0.05))',
          borderRadius: 'var(--radius-control, 8px)',
        };
      case 'ghost':
      default:
        return {
          backgroundColor: 'transparent',
          color: 'var(--muted-foreground, #64748B)',
          border: '1px solid transparent',
          borderRadius: 'var(--radius-control, 8px)',
        };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          padding: '0.35rem 0.75rem',
          fontSize: '0.815rem',
          borderRadius: '6px',
        };
      case 'lg':
        return {
          padding: '0.75rem 1.75rem',
          fontSize: '1rem',
          borderRadius: '10px',
        };
      case 'md':
      default:
        return {
          padding: '0.5rem 1.1rem',
          fontSize: '0.875rem',
          borderRadius: '8px',
        };
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontWeight: 600,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled || isLoading ? 0.65 : 1,
        transition: 'all 0.15s ease',
        fontFamily: 'inherit',
        textDecoration: 'none',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
      className={`egp-btn ${className}`}
      {...props}
    >
      {isLoading ? (
        <span
          style={{
            display: 'inline-block',
            width: '14px',
            height: '14px',
            border: '2px solid currentColor',
            borderRightColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }}
        />
      ) : icon ? (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
