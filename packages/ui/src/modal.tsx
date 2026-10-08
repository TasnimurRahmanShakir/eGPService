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
          background: '#0b1120',
          borderRadius: '16px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1.75rem',
          position: 'relative',
          boxSizing: 'border-box',
          color: '#f8fafc',
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
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#94a3b8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
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
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>{title}</h3>
            {subtitle && (
              <p style={{ fontSize: '0.825rem', color: '#94a3b8', marginTop: '0.2rem' }}>
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
