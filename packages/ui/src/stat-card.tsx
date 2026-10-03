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
      case 'warning': return '#f59e0b';
      case 'danger': return '#f43f5e';
      case 'positive':
      default: return '#10b981';
    }
  };

  return (
    <div
      style={{
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '1.25rem',
        backdropFilter: 'blur(10px)',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        ...style
      }}
      className="egp-ui-stat-card"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>{title}</span>
        {icon && <span style={{ color: '#38bdf8' }}>{icon}</span>}
      </div>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'monospace', color: '#f8fafc', lineHeight: 1.2 }}>
        {value}
      </div>
      {subText && (
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: getSubColor(), display: 'flex', alignItems: 'center', gap: '4px' }}>
          {subText}
        </div>
      )}
    </div>
  );
}
