'use client';

import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';

interface FinalCTASectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function FinalCTASection({ onOpenModal }: FinalCTASectionProps) {
  return (
    <section className="final-cta-banner-section">
      <div className="container">
        <div className="final-cta-inner-card">
          <div className="final-cta-content-col">
            <span className="cta-eyebrow-text">READY TO GET STARTED?</span>
            <h2 className="cta-banner-title">
              Let&apos;s Make Your<br />
              Next Submission Successful.
            </h2>
            <p className="cta-banner-subtitle">
              Get expert tender support and move your business forward with confidence.
            </p>

            <div className="cta-banner-buttons">
              <button
                onClick={() => onOpenModal()}
                className="btn-emerald-banner"
                id="cta-banner-get-consultation"
              >
                <span>Get Consultation</span>
                <div className="btn-arrow-circle">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </div>
              </button>

              <a href="tel:+8801886970197" className="btn-glass-banner">
                <Phone size={15} strokeWidth={2.2} />
                <span>+880 1886-970197</span>
              </a>
            </div>
          </div>

          <div className="final-cta-annotation-col">
            <div className="handwritten-white-note">
              <span className="handwritten-white-text">Professional Support, Real Results</span>
              <svg className="handwritten-underline-svg" width="130" height="20" viewBox="0 0 140 20" fill="none">
                <path d="M5 12C35 5 95 6 135 14M25 15C55 10 95 11 125 16" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
