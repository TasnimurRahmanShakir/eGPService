'use client';

import React from 'react';

export interface CheckStampProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  style?: React.CSSProperties;
}

export function CheckStamp({ size = 'md', label, style }: CheckStampProps) {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { box: 18, icon: 11, fontSize: '0.8rem' };
      case 'lg':
        return { box: 36, icon: 20, fontSize: '1.1rem' };
      case 'md':
      default:
        return { box: 24, icon: 14, fontSize: '0.95rem' };
    }
  };

  const dim = getDimensions();

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', ...style }}>
      <span
        style={{
          width: dim.box,
          height: dim.box,
          borderRadius: '50%',
          backgroundColor: '#006A4E',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          flexShrink: 0,
          boxShadow: '0 2px 6px rgba(0, 106, 78, 0.25)',
        }}
      >
        <svg
          width={dim.icon}
          height={dim.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {label && <span style={{ fontSize: dim.fontSize, fontWeight: 600, color: '#14231D' }}>{label}</span>}
    </span>
  );
}
