'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenModal: () => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <header className="site-header">
      <div className="container header-row">
        {/* Brand */}
        <Link href="/" className="brand-link">
          <div className="brand-shield">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="brand-red-pip"></span>
          </div>
          <div className="brand-text-col">
            <span className="brand-name">e-GP TENDER BD</span>
            <span className="brand-sub">Professional Tender Consulting</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-links-desktop">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-item-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onOpenModal}
            className="btn-red"
            id="nav-cta-btn"
          >
            Get Tender Support ▸
          </button>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--green-deep)',
              cursor: 'pointer',
              padding: '6px'
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-card)', padding: '1.25rem 1.5rem' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: pathname === link.href ? 'var(--green-primary)' : 'var(--text-headline)',
                    textDecoration: 'none'
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li style={{ paddingTop: '0.5rem' }}>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenModal(); }}
                className="btn-red"
                style={{ width: '100%' }}
              >
                Get Tender Support ▸
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
