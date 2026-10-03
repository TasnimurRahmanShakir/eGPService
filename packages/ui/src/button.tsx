'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'red' | 'primary' | 'green' | 'secondary' | 'outline-white' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  style,
  ...props
}: ButtonProps) {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'red':
      case 'primary':
      case 'danger':
        return {
          backgroundColor: '#D81E36',
          color: '#FFFFFF',
          border: '1px solid transparent',
          boxShadow: '0 4px 14px rgba(216, 30, 54, 0.25)',
        };
      case 'green':
        return {
          backgroundColor: '#006A4E',
          color: '#FFFFFF',
          border: '1px solid transparent',
          boxShadow: '0 4px 14px rgba(0, 106, 78, 0.2)',
        };
      case 'outline-white':
        return {
          backgroundColor: 'transparent',
          color: '#FFFFFF',
          border: '1.5px solid rgba(255, 255, 255, 0.85)',
        };
      case 'secondary':
        return {
          backgroundColor: '#FFFFFF',
          color: '#006A4E',
          border: '1.5px solid #006A4E',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: '#5B6B64',
          border: '1px solid #E3EBE7',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          padding: '0.4rem 0.9rem',
          fontSize: '0.85rem',
          borderRadius: '9999px',
        };
      case 'lg':
        return {
          padding: '0.9rem 2rem',
          fontSize: '1.05rem',
          borderRadius: '9999px',
        };
      case 'md':
      default:
        return {
          padding: '0.65rem 1.4rem',
          fontSize: '0.925rem',
          borderRadius: '9999px',
        };
    }
  };

  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        fontFamily: 'inherit',
        textDecoration: 'none',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
      className={`egp-btn ${className}`}
      {...props}
    >
      {children}
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
    </button>
  );
}
