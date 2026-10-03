import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Prominent Legal Disclaimer Statement */}
        <div className="disclaimer-statement-box">
          <strong>DISCLAIMER:</strong> e-GP Tender BD is an independent private service and consulting provider. It is not a government authority and does not represent the Bangladesh Public Procurement Authority (BPPA) or any procuring entity. Official public tenders and portal submissions occur strictly on the official platform at{' '}
          <a
            href="https://www.eprocure.gov.bd"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--gold-accent)', textDecoration: 'underline' }}
          >
            eprocure.gov.bd
          </a>.
        </div>

        <div className="footer-top-grid">
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                e-GP TENDER BD
              </span>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Helping contractors and businesses navigate e-GP registration, tender preparation, and online submission with confidence.
            </p>
            <div style={{ fontSize: '0.82rem', color: 'var(--gold-accent)', fontWeight: 600 }}>
              Register. Prepare. Submit.
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="footer-col-title">Navigation</h5>
            <ul className="footer-nav-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="footer-col-title">Services</h5>
            <ul className="footer-nav-list">
              <li><Link href="/services">e-GP Registration</Link></li>
              <li><Link href="/services">Tender Preparation</Link></li>
              <li><Link href="/services">Tender Submission</Link></li>
              <li><Link href="/services">e-GP Consultancy</Link></li>
              <li><Link href="/services">e-GP Training</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div>
            <h5 className="footer-col-title">Contact Information</h5>
            <ul className="footer-nav-list">
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                <MapPin size={16} style={{ color: 'var(--gold-accent)', flexShrink: 0, marginTop: '3px' }} />
                <span>House 6, Road 2/B, Baridhara J Block, Dhaka 1212, Bangladesh</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                <a href="tel:+8801886970197" style={{ color: '#FFFFFF', fontWeight: 600 }}>+880 1886-970197</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                <a href="mailto:bdegptender@gmail.com">bdegptender@gmail.com</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--gold-accent)', fontWeight: 800 }}>f</span>
                <a href="https://facebook.com/bdegptender" target="_blank" rel="noreferrer">
                  facebook.com/bdegptender
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div>
            &copy; 2026 e-GP Tender BD. All Rights Reserved.
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Website: <strong>egptenderbd.com</strong> • Dhaka, Bangladesh
          </div>
        </div>
      </div>
    </footer>
  );
}
