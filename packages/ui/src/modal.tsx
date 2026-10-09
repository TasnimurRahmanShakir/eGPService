'use client';

import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '540px',
  className = ''
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="ui-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(7, 11, 22, 0.8)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        boxSizing: 'border-box'
      }}
      onClick={onClose}
    >
      <div
        className={`ui-modal-card ${className}`}
        style={{
          maxWidth,
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'var(--surface, #FFFFFF)',
          borderRadius: 'var(--radius-dialog, 14px)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border, #E2E8F0)',
          padding: '1.75rem',
          position: 'relative',
          boxSizing: 'border-box',
          color: 'var(--foreground, #1F2937)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-control, 8px)',
            background: 'var(--surface-subtle, #F1F5F9)',
            border: '1px solid var(--border, #E2E8F0)',
            color: 'var(--muted-foreground, #64748B)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: 600,
            lineHeight: 1,
            zIndex: 10,
            transition: 'all 0.15s ease'
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {title && (
          <div style={{ marginBottom: '1.25rem', paddingRight: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground, #1F2937)' }}>{title}</h3>
            {subtitle && (
              <p style={{ fontSize: '0.825rem', color: 'var(--muted-foreground, #64748B)', marginTop: '0.2rem' }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
}
