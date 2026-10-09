'use client';

import React from 'react';
import { useInView } from '../../hooks/useInView';

import { useLanguage } from '../../context/LanguageContext';

export function ClientsSection() {
  const { t } = useLanguage();
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={`clients-carousel-section ${isInView ? 'clients-in-view' : ''}`}
      id="clients"
    >
      <div className="container">
        <div className="clients-carousel-header">
          <p className="clients-carousel-eyebrow">{t.clients.eyebrow}</p>
          <h3 className="clients-carousel-title">
            {t.clients.title}
          </h3>
        </div>
      </div>

      {/* Infinite Logo Marquee Carousel */}
      <div className="clients-marquee-container">
        {/* Left & Right gradient edge fades */}
        <div className="clients-marquee-fade-left"></div>
        <div className="clients-marquee-fade-right"></div>

        <div className="clients-marquee-track">
          {/* Set 1 */}
          <div className="clients-marquee-group">
            {/* 01. APEX INFRA */}
            <div className="client-logo-item" title="Apex Infrastructure & Engineering">
              <svg width="180" height="42" viewBox="0 0 180 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <path d="M4 36L18 8L32 36H24L18 22L12 36H4Z" fill="currentColor" />
                  <path d="M18 14L23 26H13L18 14Z" fill="var(--green-emerald)" />
                </g>
                <text x="40" y="24" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="16" fontWeight="800" letterSpacing="0.06em" fill="currentColor">APEX</text>
                <text x="40" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.16em" fill="currentColor" opacity="0.75">INFRASTRUCTURE</text>
              </svg>
            </div>

            {/* 02. SPECTRA ENGINEERING */}
            <div className="client-logo-item" title="Spectra Engineering Works">
              <svg width="190" height="42" viewBox="0 0 190 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <rect x="4" y="10" width="12" height="24" rx="2" fill="currentColor" />
                  <rect x="18" y="6" width="12" height="28" rx="2" fill="var(--green-emerald)" />
                  <rect x="4" y="24" width="26" height="4" fill="currentColor" opacity="0.6" />
                </g>
                <text x="38" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.04em" fill="currentColor">SPECTRA</text>
                <text x="38" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill="currentColor" opacity="0.75">ENGINEERING WORKS</text>
              </svg>
            </div>

            {/* 03. BENGAL INFRASTRUCTURE */}
            <div className="client-logo-item" title="Bengal Infrastructure Ltd.">
              <svg width="200" height="42" viewBox="0 0 200 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <circle cx="16" cy="21" r="14" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M9 28C13 14 19 14 23 28" stroke="var(--green-emerald)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M5 21H27" stroke="currentColor" strokeWidth="1.8" />
                </g>
                <text x="38" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.05em" fill="currentColor">BENGAL</text>
                <text x="38" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.12em" fill="currentColor" opacity="0.75">INFRASTRUCTURE LTD</text>
              </svg>
            </div>

            {/* 04. NAVANA POWER & INFRA */}
            <div className="client-logo-item" title="Navana Power & Infrastructure">
              <svg width="190" height="42" viewBox="0 0 190 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <path d="M6 34L18 8L22 17L14 34H6Z" fill="currentColor" />
                  <path d="M26 8L14 34L10 25L18 8H26Z" fill="var(--green-emerald)" />
                </g>
                <text x="36" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.08em" fill="currentColor">NAVANA</text>
                <text x="36" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill="currentColor" opacity="0.75">POWER &amp; INFRA</text>
              </svg>
            </div>

            {/* 05. CONFIDENCE HEAVY WORKS */}
            <div className="client-logo-item" title="Confidence Heavy Works">
              <svg width="200" height="42" viewBox="0 0 200 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <polygon points="16,6 28,13 28,29 16,36 4,29 4,13" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  <circle cx="16" cy="21" r="5" fill="var(--green-emerald)" />
                </g>
                <text x="36" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fontWeight="800" letterSpacing="0.06em" fill="currentColor">CONFIDENCE</text>
                <text x="36" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill="currentColor" opacity="0.75">HEAVY WORKS LTD</text>
              </svg>
            </div>

            {/* 06. MEGHNA BUILDERS */}
            <div className="client-logo-item" title="Meghna Builders & Marine">
              <svg width="190" height="42" viewBox="0 0 190 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <path d="M5 28C10 16 16 16 21 28C26 16 32 16 37 28" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M12 18L21 8L30 18" stroke="var(--green-emerald)" strokeWidth="2.2" strokeLinecap="round" />
                </g>
                <text x="44" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.04em" fill="currentColor">MEGHNA</text>
                <text x="44" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill="currentColor" opacity="0.75">BUILDERS &amp; MARINE</text>
              </svg>
            </div>

            {/* 07. STANDARD BUILDERS BD */}
            <div className="client-logo-item" title="Standard Builders Bangladesh">
              <svg width="195" height="42" viewBox="0 0 195 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <rect x="5" y="8" width="10" height="10" fill="currentColor" />
                  <rect x="17" y="8" width="10" height="10" fill="var(--green-emerald)" />
                  <rect x="5" y="20" width="10" height="10" fill="var(--green-emerald)" />
                  <rect x="17" y="20" width="10" height="10" fill="currentColor" />
                </g>
                <text x="35" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fontWeight="800" letterSpacing="0.06em" fill="currentColor">STANDARD</text>
                <text x="35" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill="currentColor" opacity="0.75">BUILDERS BD</text>
              </svg>
            </div>

            {/* 08. UNITED GEO-TECH */}
            <div className="client-logo-item" title="United Geo-Tech & Civil">
              <svg width="190" height="42" viewBox="0 0 190 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <path d="M4 14L16 6L28 14V28L16 36L4 28V14Z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M8 20L16 26L24 20" stroke="var(--green-emerald)" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M16 11V26" stroke="var(--green-emerald)" strokeWidth="2" />
                </g>
                <text x="36" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.05em" fill="currentColor">UNITED</text>
                <text x="36" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill="currentColor" opacity="0.75">GEO-TECH &amp; CIVIL</text>
              </svg>
            </div>
          </div>

          {/* Set 2 (Duplicate for continuous loop) */}
          <div className="clients-marquee-group" aria-hidden="true">
            {/* 01. APEX INFRA */}
            <div className="client-logo-item" title="Apex Infrastructure & Engineering">
              <svg width="180" height="42" viewBox="0 0 180 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <path d="M4 36L18 8L32 36H24L18 22L12 36H4Z" fill="currentColor" />
                  <path d="M18 14L23 26H13L18 14Z" fill="var(--green-emerald)" />
                </g>
                <text x="40" y="24" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="16" fontWeight="800" letterSpacing="0.06em" fill="currentColor">APEX</text>
                <text x="40" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.16em" fill="currentColor" opacity="0.75">INFRASTRUCTURE</text>
              </svg>
            </div>

            {/* 02. SPECTRA ENGINEERING */}
            <div className="client-logo-item" title="Spectra Engineering Works">
              <svg width="190" height="42" viewBox="0 0 190 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <rect x="4" y="10" width="12" height="24" rx="2" fill="currentColor" />
                  <rect x="18" y="6" width="12" height="28" rx="2" fill="var(--green-emerald)" />
                  <rect x="4" y="24" width="26" height="4" fill="currentColor" opacity="0.6" />
                </g>
                <text x="38" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.04em" fill="currentColor">SPECTRA</text>
                <text x="38" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill="currentColor" opacity="0.75">ENGINEERING WORKS</text>
              </svg>
            </div>

            {/* 03. BENGAL INFRASTRUCTURE */}
            <div className="client-logo-item" title="Bengal Infrastructure Ltd.">
              <svg width="200" height="42" viewBox="0 0 200 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <circle cx="16" cy="21" r="14" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M9 28C13 14 19 14 23 28" stroke="var(--green-emerald)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M5 21H27" stroke="currentColor" strokeWidth="1.8" />
                </g>
                <text x="38" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.05em" fill="currentColor">BENGAL</text>
                <text x="38" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.12em" fill="currentColor" opacity="0.75">INFRASTRUCTURE LTD</text>
              </svg>
            </div>

            {/* 04. NAVANA POWER & INFRA */}
            <div className="client-logo-item" title="Navana Power & Infrastructure">
              <svg width="190" height="42" viewBox="0 0 190 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <path d="M6 34L18 8L22 17L14 34H6Z" fill="currentColor" />
                  <path d="M26 8L14 34L10 25L18 8H26Z" fill="var(--green-emerald)" />
                </g>
                <text x="36" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.08em" fill="currentColor">NAVANA</text>
                <text x="36" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill="currentColor" opacity="0.75">POWER &amp; INFRA</text>
              </svg>
            </div>

            {/* 05. CONFIDENCE HEAVY WORKS */}
            <div className="client-logo-item" title="Confidence Heavy Works">
              <svg width="200" height="42" viewBox="0 0 200 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <polygon points="16,6 28,13 28,29 16,36 4,29 4,13" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  <circle cx="16" cy="21" r="5" fill="var(--green-emerald)" />
                </g>
                <text x="36" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fontWeight="800" letterSpacing="0.06em" fill="currentColor">CONFIDENCE</text>
                <text x="36" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill="currentColor" opacity="0.75">HEAVY WORKS LTD</text>
              </svg>
            </div>

            {/* 06. MEGHNA BUILDERS */}
            <div className="client-logo-item" title="Meghna Builders & Marine">
              <svg width="190" height="42" viewBox="0 0 190 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <path d="M5 28C10 16 16 16 21 28C26 16 32 16 37 28" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M12 18L21 8L30 18" stroke="var(--green-emerald)" strokeWidth="2.2" strokeLinecap="round" />
                </g>
                <text x="44" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.04em" fill="currentColor">MEGHNA</text>
                <text x="44" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill="currentColor" opacity="0.75">BUILDERS &amp; MARINE</text>
              </svg>
            </div>

            {/* 07. STANDARD BUILDERS BD */}
            <div className="client-logo-item" title="Standard Builders Bangladesh">
              <svg width="195" height="42" viewBox="0 0 195 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <rect x="5" y="8" width="10" height="10" fill="currentColor" />
                  <rect x="17" y="8" width="10" height="10" fill="var(--green-emerald)" />
                  <rect x="5" y="20" width="10" height="10" fill="var(--green-emerald)" />
                  <rect x="17" y="20" width="10" height="10" fill="currentColor" />
                </g>
                <text x="35" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fontWeight="800" letterSpacing="0.06em" fill="currentColor">STANDARD</text>
                <text x="35" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill="currentColor" opacity="0.75">BUILDERS BD</text>
              </svg>
            </div>

            {/* 08. UNITED GEO-TECH */}
            <div className="client-logo-item" title="United Geo-Tech & Civil">
              <svg width="190" height="42" viewBox="0 0 190 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-brand-svg">
                <g className="brand-mark">
                  <path d="M4 14L16 6L28 14V28L16 36L4 28V14Z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M8 20L16 26L24 20" stroke="var(--green-emerald)" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M16 11V26" stroke="var(--green-emerald)" strokeWidth="2" />
                </g>
                <text x="36" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.05em" fill="currentColor">UNITED</text>
                <text x="36" y="34" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill="currentColor" opacity="0.75">GEO-TECH &amp; CIVIL</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
