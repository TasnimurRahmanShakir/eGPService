'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

import { useLanguage } from '../../context/LanguageContext';

interface WhyChooseSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function WhyChooseSection({ onOpenModal }: WhyChooseSectionProps) {
  const { t } = useLanguage();
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="why-choose"
      className={`why-choose-section section-padding ${isInView ? 'why-in-view' : ''}`}
    >
      <div className="container why-choose-grid">
        {/* Left Column: Why Choose Copy & Staggered Cards */}
        <div className="why-choose-left why-left-reveal">
          <div className="eyebrow-pill">
            <span>{t.whyChoose.eyebrow}</span>
          </div>

          <h2 className="section-title-large">
            {t.whyChoose.title1}<br />
            <span className="hero-highlight-green">{t.whyChoose.title2}</span>
          </h2>

          <div className="why-pillars-list">
            <div className="why-pillar-card why-pillar-card-stagger">
              <div className="pillar-header">
                <div className="check-bullet-circle">
                  <Check size={14} strokeWidth={3} />
                </div>
                <h3 className="pillar-title">{t.whyChoose.pillars.p1Title}</h3>
              </div>
              <p className="pillar-desc">{t.whyChoose.pillars.p1Desc}</p>
            </div>

            <div className="why-pillar-card why-pillar-card-stagger">
              <div className="pillar-header">
                <div className="check-bullet-circle">
                  <Check size={14} strokeWidth={3} />
                </div>
                <h3 className="pillar-title">{t.whyChoose.pillars.p2Title}</h3>
              </div>
              <p className="pillar-desc">{t.whyChoose.pillars.p2Desc}</p>
            </div>

            <div className="why-pillar-card why-pillar-card-stagger">
              <div className="pillar-header">
                <div className="check-bullet-circle">
                  <Check size={14} strokeWidth={3} />
                </div>
                <h3 className="pillar-title">{t.whyChoose.pillars.p3Title}</h3>
              </div>
              <p className="pillar-desc">{t.whyChoose.pillars.p3Desc}</p>
            </div>

            <div className="why-pillar-card why-pillar-card-stagger">
              <div className="pillar-header">
                <div className="check-bullet-circle">
                  <Check size={14} strokeWidth={3} />
                </div>
                <h3 className="pillar-title">{t.whyChoose.pillars.p4Title}</h3>
              </div>
              <p className="pillar-desc">{t.whyChoose.pillars.p4Desc}</p>
            </div>
          </div>

          <div className="why-action-row">
            <button onClick={() => onOpenModal()} className="btn-dark-pill">
              <span>{t.whyChoose.cta}</span>
              <div className="btn-arrow-circle">
                <ArrowRight size={14} strokeWidth={2.5} />
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Desk/Laptop Setup & Handwriting Note with Animated Draw */}
        <div className="why-choose-right">
          <div className="why-visual-container">
            {/* Handwritten Note Annotation: Text appears -> Arrow draws -> image settles */}
            <div className="handwritten-annotation note-why-choose handwritten-annotation-animated">
              <span className="handwritten-text">{t.whyChoose.handwriting}</span>
              <svg className="handwritten-arrow-svg" width="46" height="38" viewBox="0 0 50 40" fill="none">
                <path
                  className="annotation-draw-arrow-path"
                  d="M4 8C18 4 38 12 44 32M44 32L34 26M44 32L46 19"
                  stroke="#059669"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Horizontal Mask Reveal on Card */}
            <div className="why-image-card why-image-card-mask">
              <Image
                src="/images/why-choose-laptop.jpg"
                alt="Modern e-GP Dashboard workspace"
                width={580}
                height={440}
                className="why-card-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
