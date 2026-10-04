'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenModal: () => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <header className="site-header">
      <div className="container header-row">
        {/* Brand Logo */}
        <Link href="/" className="brand-link">
          <div className="brand-logo-badge">
            <ShieldCheck size={20} strokeWidth={2.5} className="brand-logo-icon" />
          </div>
          <div className="brand-text-col">
            <span className="brand-name">e-GP TENDER BD</span>
            <span className="brand-sub">Professional Tender Consulting</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links-desktop">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === '/' && pathname === '/');
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`nav-item-link ${isActive ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="nav-actions-col">
          <button
            onClick={onOpenModal}
            className="btn-nav-consultation"
            id="nav-consultation-btn"
            aria-label="Get Consultation"
          >
            <span className="nav-btn-icon-mobile" aria-hidden="true">
              <PhoneCall size={16} strokeWidth={2.4} />
            </span>
            <span className="nav-btn-text-full">Get Consultation</span>
            <span className="nav-btn-text-compact">Consult</span>
            <div className="btn-arrow-circle">
              <ArrowRight size={13} strokeWidth={2.5} />
            </div>
          </button>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li style={{ paddingTop: '0.75rem' }}>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenModal(); }}
                className="btn-nav-consultation"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Get Consultation</span>
                <div className="btn-arrow-circle">
                  <ArrowRight size={13} strokeWidth={2.5} />
                </div>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
