'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

export function Card({
  children,
  glow = false,
  className = '',
  style,
  ...props
}: CardProps) {
  return (
    <div
      style={{
        background: 'rgba(15, 24, 46, 0.65)',
        border: glow ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        backdropFilter: 'blur(16px)',
        boxShadow: glow ? '0 0 30px rgba(56, 189, 248, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.3)',
        padding: '1.5rem',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style
      }}
      className={`egp-ui-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
