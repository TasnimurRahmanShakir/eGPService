'use client';

import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

interface FinalCTASectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function FinalCTASection({ onOpenModal }: FinalCTASectionProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="contact"
      className={`final-cta-banner-section ${isInView ? 'cta-in-view' : ''}`}
    >
      <div className="container">
        {/* Signature Animation #4: Card scale-in from 0.96 to 1.0 */}
        <div className="final-cta-inner-card final-cta-inner-card-scale">
          <div className="final-cta-content-col">
            <span className="cta-eyebrow-text">READY TO GET STARTED?</span>

            {/* Line-by-line reveal for heading */}
            <h2 className="cta-banner-title">
              <span className="cta-line-reveal">Let&apos;s Make Your</span>
              <span className="cta-line-reveal">Next Submission Successful.</span>
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
            {/* Handwritten White Note with Animated Underline Draw */}
            <div className="handwritten-white-note handwritten-annotation-animated">
              <span className="handwritten-white-text">Professional Support, Real Results</span>
              <svg className="handwritten-underline-svg" width="130" height="20" viewBox="0 0 140 20" fill="none">
                <path
                  className="annotation-draw-arrow-path"
                  d="M5 12C35 5 95 6 135 14M25 15C55 10 95 11 125 16"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
