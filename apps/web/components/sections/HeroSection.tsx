'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { BangladeshNetworkMap } from './BangladeshNetworkMap';
import { useLanguage } from '../../context/LanguageContext';

interface HeroSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container-grid hero-content-direct">
        {/* Left Column: Streamlined Copy, Value Props & Actions */}
        <div className="hero-left-col">
          {/* Main Title */}
          <h1 className="hero-main-title">
            <span className="hero-line-item hero-line-1">{t.hero.line1}</span>
            <span className="hero-line-item hero-line-2 hero-highlight-green">
              {t.hero.line2}
            </span>
          </h1>

          {/* Concise 1-Line Description */}
          <p className="hero-description">
            {t.hero.description}
          </p>

          {/* Compact Trust Bullets */}
          <div className="hero-checklist-wrap">
            <div className="hero-checklist-item">
              <div className="hero-check-badge">
                <Check size={13} strokeWidth={3} />
              </div>
              <span className="hero-checklist-text">{t.hero.bullet1}</span>
            </div>
            <div className="hero-checklist-item">
              <div className="hero-check-badge">
                <Check size={13} strokeWidth={3} />
              </div>
              <span className="hero-checklist-text">{t.hero.bullet2}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta-buttons">
            <button
              onClick={() => onOpenModal()}
              className="btn-dark-pill"
              id="hero-primary-cta"
            >
              <span>{t.hero.primaryCta}</span>
              <div className="btn-arrow-circle">
                <ArrowRight size={14} strokeWidth={2.5} />
              </div>
            </button>

            <Link href="#services" className="btn-outline-pill">
              {t.hero.secondaryCta}
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
