'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

interface HeroSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="container hero-container-grid">
        {/* Left Column: Copy, Value Props & Actions */}
        <div className="hero-left-col">
          <h1 className="hero-main-title">
            From Opportunity<br />
            to Award.<br />
            <span className="hero-highlight-green">We Handle the Rest.</span>
          </h1>

          <p className="hero-description">
            Professional e-GP registration, tender preparation, submission and project cost management solution for businesses in Bangladesh.
          </p>

          {/* Value Proposition Checklist */}
          <div className="hero-checklist-wrap">
            <div className="hero-checklist-item">
              <div className="hero-check-badge">
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="hero-checklist-text">Technical Proposal Responsiveness</span>
            </div>
            <div className="hero-checklist-item">
              <div className="hero-check-badge">
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="hero-checklist-text">Financial Proposal Responsiveness</span>
            </div>
            <div className="hero-checklist-item">
              <div className="hero-check-badge">
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="hero-checklist-text">Timely Submission Assurance</span>
            </div>
          </div>

          <div className="hero-cta-buttons">
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

        {/* Right Column: Parliament Asymmetric Visual & Layered Accents */}
        <div className="hero-right-col">
          <div className="hero-visual-wrapper">
            {/* Background Wireframe Ring on Left */}
            <div className="hero-wire-ring"></div>

            {/* Solid Deep Forest Green Card Accent on Right */}
            <div className="hero-green-card-backdrop"></div>

            {/* Asymmetric Curved Image Frame */}
            <div className="hero-arch-frame">
              <Image
                src="/images/hero-parliament.jpg"
                alt="Bangladesh National Parliament Building"
                width={560}
                height={580}
                priority
                className="hero-arch-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
