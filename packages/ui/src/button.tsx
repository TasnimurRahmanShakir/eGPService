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
          backgroundColor: '#38bdf8',
          color: '#070b16',
          border: '1px solid transparent',
          boxShadow: '0 0 15px rgba(56, 189, 248, 0.25)',
        };
      case 'emerald':
        return {
          backgroundColor: '#10b981',
          color: '#FFFFFF',
          border: '1px solid transparent',
          boxShadow: '0 0 15px rgba(16, 185, 129, 0.25)',
        };
      case 'danger':
        return {
          backgroundColor: '#f43f5e',
          color: '#FFFFFF',
          border: '1px solid transparent',
          boxShadow: '0 0 15px rgba(244, 63, 94, 0.25)',
        };
      case 'secondary':
        return {
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          color: '#f8fafc',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: '#38bdf8',
          border: '1px solid rgba(56, 189, 248, 0.4)',
        };
      case 'ghost':
      default:
        return {
          backgroundColor: 'transparent',
          color: '#94a3b8',
          border: '1px solid transparent',
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
