'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { BangladeshNetworkMap } from './BangladeshNetworkMap';

interface HeroSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container-grid">
        {/* Left Column: Streamlined Copy, Value Props & Actions */}
        <div className="hero-left-col">
          {/* Main Title (Balanced & Elegant Font Size) */}
          <h1 className="hero-main-title">
            <span className="hero-line-item hero-line-1">Country&apos;s First</span>
            <span className="hero-line-item hero-line-2 hero-highlight-green">
              Tender &amp; Project Management Solution
            </span>
          </h1>

          {/* Concise 1-Line Description */}
          <p className="hero-description hero-desc-reveal">
            End-to-end e-GP bid preparation, technical proposal engineering &amp; compliance management across Bangladesh.
          </p>

          {/* Compact Trust Bullets */}
          <div className="hero-checklist-wrap">
            <div className="hero-checklist-item hero-check-item-reveal hero-check-item-1">
              <div className="hero-check-badge">
                <Check size={13} strokeWidth={3} />
              </div>
              <span className="hero-checklist-text">Technical &amp; Financial Bid Responsiveness</span>
            </div>
            <div className="hero-checklist-item hero-check-item-reveal hero-check-item-2">
              <div className="hero-check-badge">
                <Check size={13} strokeWidth={3} />
              </div>
              <span className="hero-checklist-text">Timely e-GP Submission &amp; Banking Coordination</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta-buttons hero-cta-reveal">
            <button
              onClick={() => onOpenModal()}
              className="btn-dark-pill"
              id="hero-primary-cta"
            >
              <span>Get Free Consultation</span>
              <div className="btn-arrow-circle">
                <ArrowRight size={14} strokeWidth={2.5} />
              </div>
            </button>

            <Link href="#services" className="btn-outline-pill">
              Explore Services
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Bangladesh Network Map */}
        <div className="hero-right-col hero-map-col">
          <BangladeshNetworkMap />
        </div>
      </div>
    </section>
  );
}
