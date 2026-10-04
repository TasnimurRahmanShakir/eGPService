import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, Facebook, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenModal?: () => void;
}

export function Footer({ onOpenModal }: FooterProps) {
  return (
    <footer className="site-footer">
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
              <li><Link href="/#services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
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
            Developed by <a href="https://jolforingbd.com" target="_blank" rel="noopener noreferrer" className="dev-name-highlight">Jolforing</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
