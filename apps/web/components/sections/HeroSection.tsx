'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { BangladeshNetworkMap } from './BangladeshNetworkMap';

interface HeroSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll-driven shutter closing upward as user scrolls down
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          // Progress from 0 (at top) to 1 (at ~380px scrolled down)
          const progress = Math.min(1, Math.max(0, scrollY / 380));
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="hero-section" id="hero">
      {/* Scroll-Driven Upward Closing Shutter (Only closes upward when scrolling down) */}
      <div
        className="hero-scroll-shutter"
        style={{
          transform: `translateY(${(1 - scrollProgress) * 102}%)`,
          opacity: scrollProgress > 0.01 ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <div className="hero-scroll-shutter-blade">
          <div className="hero-scroll-shutter-laser"></div>
        </div>
      </div>

      <div
        className="container hero-container-grid hero-content-direct"
        style={{
          transform: `translateY(-${scrollProgress * 30}px)`,
          opacity: Math.max(0, 1 - scrollProgress * 0.75),
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
        }}
      >
        {/* Left Column: Streamlined Copy, Value Props & Actions */}
        <div className="hero-left-col">
          {/* Main Title */}
          <h1 className="hero-main-title">
            <span className="hero-line-item hero-line-1">Country&apos;s First</span>
            <span className="hero-line-item hero-line-2 hero-highlight-green">
              Tender &amp; Project Management Solution
            </span>
          </h1>

          {/* Concise 1-Line Description */}
          <p className="hero-description">
            End-to-end e-GP bid preparation, technical proposal engineering &amp; compliance management across Bangladesh.
          </p>

          {/* Compact Trust Bullets */}
          <div className="hero-checklist-wrap">
            <div className="hero-checklist-item">
              <div className="hero-check-badge">
                <Check size={13} strokeWidth={3} />
              </div>
              <span className="hero-checklist-text">Technical &amp; Financial Bid Responsiveness</span>
            </div>
            <div className="hero-checklist-item">
              <div className="hero-check-badge">
                <Check size={13} strokeWidth={3} />
              </div>
              <span className="hero-checklist-text">Timely e-GP Submission &amp; Banking Coordination</span>
            </div>
          </div>

          {/* CTA Buttons */}
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

        {/* Right Column: Interactive Bangladesh Network Map */}
        <div className="hero-right-col hero-map-col">
          <BangladeshNetworkMap />
        </div>
      </div>
    </section>
  );
}
