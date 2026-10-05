'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, Facebook, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface FooterProps {
  onOpenModal?: () => void;
}

export function Footer({ onOpenModal }: FooterProps) {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <footer
      ref={ref}
      className={`site-footer ${isInView ? 'footer-in-view' : ''}`}
      style={{
        opacity: isInView ? 1 : 0.85,
        transition: 'opacity 0.6s ease'
      }}
    >
      <div className="container">
        <div className="footer-top-grid">
          {/* Column 1: Brand & Tagline */}
          <div className="footer-col-brand">
            <Link href="/" className="brand-link footer-brand-link">
              <div className="brand-logo-badge">
                <ShieldCheck size={20} strokeWidth={2.5} className="brand-logo-icon" />
              </div>
              <div className="brand-text-col">
                <span className="brand-name" style={{ color: '#FFFFFF' }}>e-GP TENDER BD</span>
                <span className="brand-sub" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Professional Tender & Project Management Solution
                </span>
              </div>
            </Link>

            <p className="footer-brand-desc">
              Professional e-GP registration, tender preparation, submission and project cost management solution for businesses in Bangladesh.
            </p>

            <div className="footer-facebook-wrap">
              <a
                href="https://facebook.com/bdegptender"
                target="_blank"
                rel="noreferrer"
                className="footer-facebook-link"
                aria-label="Facebook: @bdegptender"
              >
                <Facebook size={18} />
                <span>Facebook: @bdegptender</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="footer-col-title">Navigation</h5>
            <ul className="footer-nav-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/winning-tenders">Winning Tenders</Link></li>
              <li><Link href="/#services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Address */}
          <div>
            <h5 className="footer-col-title">Contact & Office</h5>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={16} className="footer-contact-icon" />
                <span>House 6, Road 2/B, Baridhara J Block, Dhaka 1212, Bangladesh</span>
              </li>
              <li>
                <Phone size={16} className="footer-contact-icon" />
                <a href="tel:+8801886970197">+880 1886-970197</a>
              </li>
              <li>
                <Mail size={16} className="footer-contact-icon" />
                <a href="mailto:bdegptender@gmail.com">bdegptender@gmail.com</a>
              </li>
            </ul>

            {onOpenModal && (
              <button
                onClick={onOpenModal}
                className="btn-footer-message"
                id="footer-send-message-btn"
              >
                <span>Request Consultation</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Useful e-GP Department Links */}
        <div className="footer-dept-links-block">
          <span className="footer-dept-label">Useful Links:</span>
          <div className="footer-dept-items">
            <a href="https://bppa.gov.bd" target="_blank" rel="noopener noreferrer" className="footer-dept-anchor">BPPA</a>
            <span className="footer-dept-separator">•</span>
            <a href="http://www.pwd.gov.bd" target="_blank" rel="noopener noreferrer" className="footer-dept-anchor">PWD</a>
            <span className="footer-dept-separator">•</span>
            <a href="http://www.rhd.gov.bd" target="_blank" rel="noopener noreferrer" className="footer-dept-anchor">RHD</a>
            <span className="footer-dept-separator">•</span>
            <a href="http://www.lged.gov.bd" target="_blank" rel="noopener noreferrer" className="footer-dept-anchor">LGED</a>
            <span className="footer-dept-separator">•</span>
            <a href="http://www.bwdb.gov.bd" target="_blank" rel="noopener noreferrer" className="footer-dept-anchor">BWDB</a>
            <span className="footer-dept-separator">•</span>
            <a href="http://eedmoe.gov.bd" target="_blank" rel="noopener noreferrer" className="footer-dept-anchor">EED</a>
            <span className="footer-dept-separator">•</span>
            <a href="http://www.hed.gov.bd" target="_blank" rel="noopener noreferrer" className="footer-dept-anchor">HED</a>
            <span className="footer-dept-separator">•</span>
            <a href="http://www.dphe.gov.bd" target="_blank" rel="noopener noreferrer" className="footer-dept-anchor">DPHE</a>
            <span className="footer-dept-separator">•</span>
            <a href="http://www.rajuk.gov.bd" target="_blank" rel="noopener noreferrer" className="footer-dept-anchor">RAJUK</a>
            <span className="footer-dept-separator">•</span>
            <a href="https://eprocure.gov.bd" target="_blank" rel="noopener noreferrer" className="footer-dept-anchor">ALL CITY CORPORATION</a>
          </div>
        </div>

        {/* Footer Legal & Attribution */}
        <div className="footer-disclaimer-block">
          <p className="footer-disclaimer-text">
            e-GP Tender BD is an independent private service and consulting provider and is not a government authority or representative of BPPA or any procuring entity.
          </p>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-row">
          <div className="footer-copyright-text">
            &copy; 2026 e-GP Tender BD. All Rights Reserved.
          </div>
          <div className="footer-developer-credit">
            Developed by <span className="font-semibold text-white">Jolforing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
