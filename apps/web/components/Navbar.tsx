'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenModal: () => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // 01 Sticky Morph: slightly compact + subtle blur + subtle border
      setIsScrolled(window.scrollY > 24);

      // Active Section Spy for smooth indicator
      if (pathname === '/') {
        const scrollPos = window.scrollY + 180;
        const servicesEl = document.getElementById('services');

        if (servicesEl && servicesEl.offsetTop <= scrollPos) {
          setActiveSection('Services');
        } else {
          setActiveSection('Home');
        }
      } else if (pathname === '/about') {
        setActiveSection('About');
      } else if (pathname === '/winning-tenders') {
        setActiveSection('Winning Tenders');
      } else if (pathname === '/contact') {
        setActiveSection('Contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Winning Tenders', href: '/winning-tenders' },
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
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
              const isActive =
                pathname === '/'
                  ? activeSection === link.label
                  : pathname === link.href;

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
                  className={`mobile-nav-link ${
                    pathname === '/' && activeSection === link.label ? 'active' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li style={{ paddingTop: '0.75rem' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal();
                }}
                className="btn-dark-pill"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Get Consultation</span>
                <div className="btn-arrow-circle">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </div>
              </button>
            </li>

            {/* Useful e-GP Links in mobile menu */}
            <li className="mobile-drawer-dept-section">
              <span className="mobile-drawer-dept-title">Useful Department Links</span>
              <div className="mobile-drawer-dept-grid">
                <a href="https://bppa.gov.bd" target="_blank" rel="noopener noreferrer">BPPA</a>
                <span>•</span>
                <a href="http://www.pwd.gov.bd" target="_blank" rel="noopener noreferrer">PWD</a>
                <span>•</span>
                <a href="http://www.rhd.gov.bd" target="_blank" rel="noopener noreferrer">RHD</a>
                <span>•</span>
                <a href="http://www.lged.gov.bd" target="_blank" rel="noopener noreferrer">LGED</a>
                <span>•</span>
                <a href="http://www.bwdb.gov.bd" target="_blank" rel="noopener noreferrer">BWDB</a>
                <span>•</span>
                <a href="http://eedmoe.gov.bd" target="_blank" rel="noopener noreferrer">EED</a>
                <span>•</span>
                <a href="http://www.hed.gov.bd" target="_blank" rel="noopener noreferrer">HED</a>
                <span>•</span>
                <a href="http://www.dphe.gov.bd" target="_blank" rel="noopener noreferrer">DPHE</a>
                <span>•</span>
                <a href="http://www.rajuk.gov.bd" target="_blank" rel="noopener noreferrer">RAJUK</a>
                <span>•</span>
                <a href="https://eprocure.gov.bd" target="_blank" rel="noopener noreferrer">CITY CORP</a>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
