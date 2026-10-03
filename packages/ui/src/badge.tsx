'use client';

import React from 'react';

export interface BadgeProps {
  variant?: 'green' | 'yellow' | 'blue' | 'red';
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({
  variant = 'blue',
  dot = false,
  children,
  className = '',
  style
}: BadgeProps) {
  const getColors = () => {
    switch (variant) {
      case 'green':
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          color: '#34d399',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          dotColor: '#10b981'
        };
      case 'yellow':
        return {
          bg: 'rgba(245, 158, 11, 0.15)',
          color: '#fbbf24',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          dotColor: '#f59e0b'
        };
      case 'red':
        return {
          bg: 'rgba(244, 63, 94, 0.15)',
          color: '#fb7185',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          dotColor: '#f43f5e'
        };
      case 'blue':
      default:
        return {
          bg: 'rgba(56, 189, 248, 0.15)',
          color: '#7dd3fc',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          dotColor: '#38bdf8'
        };
    }
  };

  const current = getColors();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.2rem 0.65rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        backgroundColor: current.bg,
        color: current.color,
        border: current.border,
        ...style
      }}
      className={`egp-ui-badge ${className}`}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: current.dotColor,
            boxShadow: `0 0 6px ${current.dotColor}`
          }}
        />
      )}
      {children}
    </span>
  );
}
