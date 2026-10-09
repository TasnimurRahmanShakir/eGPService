'use client';

import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subText?: string;
  subType?: 'positive' | 'warning' | 'danger';
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export function StatCard({
  title,
  value,
  subText,
  subType = 'positive',
  icon,
  style
}: StatCardProps) {
  const getSubColor = () => {
    switch (subType) {
      case 'warning': return 'var(--warning, #92400E)';
      case 'danger': return 'var(--danger, #BE123C)';
      case 'positive':
      default: return 'var(--success, #047857)';
    }
  };

  return (
    <div
      style={{
        background: 'var(--surface, #FFFFFF)',
        border: '1px solid var(--border, #E2E8F0)',
        borderRadius: 'var(--radius-card, 10px)',
        padding: '1.25rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
        ...style
      }}
      className="egp-ui-stat-card summary-card"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '14px', color: 'var(--muted-foreground, #64748B)', fontWeight: 500 }}>{title}</span>
        {icon && <span style={{ color: 'var(--primary, #0F766E)' }}>{icon}</span>}
      </div>
      <div style={{ fontSize: '26px', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--foreground, #1F2937)', lineHeight: 1.2 }}>
        {value}
      </div>
      {subText && (
        <div style={{ fontSize: '13px', marginTop: '0.45rem', color: getSubColor(), display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
          {subText}
        </div>
      )}
    </div>
  );
}
