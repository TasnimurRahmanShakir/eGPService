'use client';

import React from 'react';

export interface BadgeProps {
  variant?: 'yellow' | 'green' | 'red' | 'blue' | 'neutral';
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({
  variant = 'yellow',
  dot = false,
  children,
  className = '',
  style
}: BadgeProps) {
  const getColors = () => {
    switch (variant) {
      case 'yellow':
        return {
          bg: '#FFC72C',
          color: '#14231D',
          border: '1px solid #F3BA20',
          dotColor: '#006A4E'
        };
      case 'green':
        return {
          bg: '#EBF5F1',
          color: '#006A4E',
          border: '1px solid #C2E2D7',
          dotColor: '#006A4E'
        };
      case 'red':
        return {
          bg: '#FDF0F1',
          color: '#D81E36',
          border: '1px solid #F9CFD4',
          dotColor: '#D81E36'
        };
      case 'blue':
        return {
          bg: '#EBF3FE',
          color: '#0284C7',
          border: '1px solid #BAE6FD',
          dotColor: '#0284C7'
        };
      case 'neutral':
      default:
        return {
          bg: '#F6FAF8',
          color: '#5B6B64',
          border: '1px solid #E3EBE7',
          dotColor: '#5B6B64'
        };
    }
  };

  const current = getColors();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.78rem',
        fontWeight: 700,
        backgroundColor: current.bg,
        color: current.color,
        border: current.border,
        ...style
      }}
      className={`egp-badge ${className}`}
    >
      {dot && (
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: current.dotColor,
          }}
        />
      )}
      {children}
    </span>
  );
}
