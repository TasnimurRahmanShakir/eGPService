'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

interface HeroSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Subtle parallax: building moves downward slightly slower than page scroll
      if (window.scrollY < 900) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container-grid">
        {/* Left Column: Copy, Value Props & Actions */}
        <div className="hero-left-col">
          {/* 01. Eyebrow */}
          <div className="eyebrow-pill hero-eyebrow-reveal">
            <span>PROFESSIONAL e-GP PARTNER</span>
          </div>

          {/* 02. Heading with Line-by-Line Reveal Sequence */}
          <h1 className="hero-main-title">
            <span className="hero-line-item hero-line-1">From Opportunity</span>
            <span className="hero-line-item hero-line-2">to Award.</span>
            <span className="hero-line-item hero-line-3 hero-highlight-green">
              We Handle the Rest.
            </span>
          </h1>

          {/* 03. Paragraph Reveal */}
          <p className="hero-description hero-desc-reveal">
            Professional e-GP registration, tender preparation, submission and project cost management solution for businesses in Bangladesh.
          </p>

          {/* 04. Trust Bullets Staggered */}
          <div className="hero-checklist-wrap">
            <div className="hero-checklist-item hero-check-item-reveal hero-check-item-1">
              <div className="hero-check-badge">
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="hero-checklist-text">Technical Proposal Responsiveness</span>
            </div>
            <div className="hero-checklist-item hero-check-item-reveal hero-check-item-2">
              <div className="hero-check-badge">
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="hero-checklist-text">Financial Proposal Responsiveness</span>
            </div>
            <div className="hero-checklist-item hero-check-item-reveal hero-check-item-3">
              <div className="hero-check-badge">
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="hero-checklist-text">Timely Submission Assurance</span>
            </div>
          </div>

          {/* 05. Buttons Reveal */}
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

        {/* 06. Right Column: Parliament Asymmetric Visual & Mask + Scale Reveal + Subtle Parallax */}
        <div className="hero-right-col">
          <div
            className="hero-visual-wrapper hero-visual-reveal"
            style={{
              transform: `translate3d(0, ${scrollY * 0.065}px, 0)`,
              transition: 'transform 0.1s linear'
            }}
          >
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
