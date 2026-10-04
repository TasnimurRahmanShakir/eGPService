'use client';

import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
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
        background: 'rgba(1, 30, 20, 0.72)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
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
          background: '#FFFFFF',
          borderRadius: '22px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(1, 78, 54, 0.12)',
          padding: 'clamp(1.4rem, 3vw, 2.25rem)',
          position: 'relative',
          boxSizing: 'border-box'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--green-soft, #EEF5F2)',
            border: 'none',
            color: 'var(--green-deep, #013A28)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: 1,
            zIndex: 10,
            transition: 'background 0.2s'
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {title && (
          <div style={{ marginBottom: '1.25rem', paddingRight: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--green-deep, #013A28)' }}>{title}</h3>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
