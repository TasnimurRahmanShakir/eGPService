'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'white' | 'offwhite' | 'green' | 'dark';
  border?: boolean;
}

export function Card({
  children,
  variant = 'white',
  border = true,
  className = '',
  style,
  ...props
}: CardProps) {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'offwhite':
        return {
          backgroundColor: '#F6FAF8',
          color: '#14231D',
          border: border ? '1px solid #E3EBE7' : 'none',
        };
      case 'green':
        return {
          backgroundColor: '#006A4E',
          color: '#FFFFFF',
          border: 'none',
        };
      case 'dark':
        return {
          backgroundColor: '#0B3D2E',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        };
      case 'white':
      default:
        return {
          backgroundColor: '#FFFFFF',
          color: '#14231D',
          border: border ? '1px solid #E3EBE7' : 'none',
        };
    }
  };

  return (
    <div
      style={{
        borderRadius: '12px',
        padding: '1.75rem',
        boxShadow: variant === 'dark' || variant === 'green' ? 'none' : '0 8px 24px rgba(11, 61, 46, 0.08)',
        transition: 'all 0.25s ease',
        ...getVariantStyles(),
        ...style,
      }}
      className={`egp-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
