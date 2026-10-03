'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'emerald' | 'danger' | 'ghost';
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
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
          color: '#04101e',
          boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)',
          border: '1px solid transparent'
        };
      case 'secondary':
        return {
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#f8fafc',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)'
        };
      case 'emerald':
        return {
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          color: '#022315',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
          border: '1px solid transparent'
        };
      case 'danger':
        return {
          background: 'rgba(244, 63, 94, 0.15)',
          color: '#fb7185',
          border: '1px solid rgba(244, 63, 94, 0.3)'
        };
      case 'ghost':
        return {
          background: 'rgba(255, 255, 255, 0.04)',
          color: '#94a3b8',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          padding: '0.35rem 0.75rem',
          fontSize: '0.78rem',
          borderRadius: '6px'
        };
      case 'lg':
        return {
          padding: '0.85rem 1.75rem',
          fontSize: '1.05rem',
          borderRadius: '14px'
        };
      case 'md':
      default:
        return {
          padding: '0.625rem 1.25rem',
          fontSize: '0.925rem',
          borderRadius: '10px'
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
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style
      }}
      className={`egp-ui-button ${className}`}
      {...props}
    >
      {children}
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
    </button>
  );
}
