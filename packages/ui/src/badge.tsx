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
          bg: 'var(--success-bg, #ECFDF5)',
          color: 'var(--success, #047857)',
          border: '1px solid var(--success-border, #A7F3D0)',
          dotColor: 'var(--success, #047857)'
        };
      case 'rose':
      case 'red':
        return {
          bg: 'var(--danger-bg, #FFF1F2)',
          color: 'var(--danger, #BE123C)',
          border: '1px solid var(--danger-border, #FECDD3)',
          dotColor: 'var(--danger, #BE123C)'
        };
      case 'amber':
      case 'yellow':
        return {
          bg: 'var(--warning-bg, #FFFBEB)',
          color: 'var(--warning, #92400E)',
          border: '1px solid var(--warning-border, #FDE68A)',
          dotColor: 'var(--warning, #92400E)'
        };
      case 'sky':
      case 'blue':
        return {
          bg: 'var(--info-bg, #EFF6FF)',
          color: 'var(--info, #1D4ED8)',
          border: '1px solid var(--info-border, #BFDBFE)',
          dotColor: 'var(--info, #1D4ED8)'
        };
      case 'slate':
      case 'neutral':
      default:
        return {
          bg: 'var(--surface-subtle, #F1F5F9)',
          color: 'var(--foreground-secondary, #475569)',
          border: '1px solid var(--border-strong, #CBD5E1)',
          dotColor: 'var(--muted-foreground, #64748B)'
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
