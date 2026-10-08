'use client';

import React from 'react';

export interface BadgeProps {
  variant?: 'emerald' | 'rose' | 'amber' | 'sky' | 'slate' | 'green' | 'red' | 'yellow' | 'blue' | 'neutral';
  dot?: boolean;
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({
  variant = 'slate',
  dot = false,
  size = 'md',
  children,
  className = '',
  style
}: BadgeProps) {
  const getColors = () => {
    switch (variant) {
      case 'emerald':
      case 'green':
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          color: '#34d399',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          dotColor: '#10b981'
        };
      case 'rose':
      case 'red':
        return {
          bg: 'rgba(244, 63, 94, 0.15)',
          color: '#fb7185',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          dotColor: '#f43f5e'
        };
      case 'amber':
      case 'yellow':
        return {
          bg: 'rgba(245, 158, 11, 0.15)',
          color: '#fbbf24',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          dotColor: '#f59e0b'
        };
      case 'sky':
      case 'blue':
        return {
          bg: 'rgba(56, 189, 248, 0.15)',
          color: '#38bdf8',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          dotColor: '#38bdf8'
        };
      case 'slate':
      case 'neutral':
      default:
        return {
          bg: 'rgba(100, 116, 139, 0.15)',
          color: '#94a3b8',
          border: '1px solid rgba(100, 116, 139, 0.25)',
          dotColor: '#64748b'
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
        padding: size === 'sm' ? '0.15rem 0.5rem' : '0.2rem 0.65rem',
        borderRadius: '9999px',
        fontSize: size === 'sm' ? '0.725rem' : '0.785rem',
        fontWeight: 600,
        backgroundColor: current.bg,
        color: current.color,
        border: current.border,
        letterSpacing: '0.01em',
        ...style
      }}
      className={`egp-badge ${className}`}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: current.dotColor,
          }}
        />
      )}
      {children}
    </span>
  );
}
