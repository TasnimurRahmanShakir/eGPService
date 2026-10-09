'use client';

import React from 'react';

export interface MoneyDisplayProps {
  amount: number;
  type?: 'neutral' | 'due' | 'advance';
  showSign?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export function MoneyDisplay({
  amount,
  type = 'neutral',
  showSign = false,
  size = 'md',
  className = '',
  style,
}: MoneyDisplayProps) {
  const formattedAmount = new Intl.NumberFormat('en-BD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  const getColor = () => {
    switch (type) {
      case 'due':
        return 'var(--danger, #BE123C)';
      case 'advance':
        return 'var(--success, #047857)';
      case 'neutral':
      default:
        return 'var(--foreground, #1F2937)';
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return '0.815rem';
      case 'lg':
        return '1.25rem';
      case 'md':
      default:
        return '0.925rem';
    }
  };

  const sign = showSign ? (type === 'due' ? '-' : type === 'advance' ? '+' : '') : '';

  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
        color: getColor(),
        fontSize: getFontSize(),
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '0.15rem',
        ...style,
      }}
      className={`egp-money ${className}`}
    >
      <span>৳</span>
      <span>
        {sign}
        {formattedAmount}
      </span>
    </span>
  );
}
