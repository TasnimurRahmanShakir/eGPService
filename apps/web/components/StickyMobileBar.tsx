'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function StickyMobileBar() {
  const { t } = useLanguage();

  return (
    <div className="sticky-mobile-bar">
      <div className="mobile-bar-actions">
        <a
          href="tel:+8801886970197"
          style={{
            flex: 1,
            backgroundColor: 'var(--green-primary)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-pill)',
            padding: '0.75rem',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            textDecoration: 'none'
          }}
        >
          <Phone size={16} />
          {t.stickyBar.callSupport}
        </a>
        <a
          href="https://wa.me/8801886970197"
          target="_blank"
          rel="noreferrer"
          style={{
            flex: 1,
            backgroundColor: '#25D366',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-pill)',
            padding: '0.75rem',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            textDecoration: 'none'
          }}
        >
          <MessageCircle size={16} />
          {t.stickyBar.whatsApp}
        </a>
      </div>
    </div>
  );
}

