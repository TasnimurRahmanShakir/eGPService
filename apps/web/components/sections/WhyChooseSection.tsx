'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

interface WhyChooseSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function WhyChooseSection({ onOpenModal }: WhyChooseSectionProps) {
  return (
    <section className="why-choose-section section-padding">
      <div className="container why-choose-grid">
        {/* Left Column: Why Choose Copy */}
        <div className="why-choose-left">
          <div className="eyebrow-pill">
            <span>WHY CHOOSE US</span>
          </div>

          <h2 className="section-title-large">
            Professional Support.<br />
            <span className="hero-highlight-green">Practical Solutions.</span>
          </h2>

          <div className="why-pillars-list">
            <div className="why-pillar-card">
              <div className="pillar-header">
                <div className="check-bullet-circle">
                  <Check size={14} strokeWidth={3} />
                </div>
                <h3 className="pillar-title">Tender-Focused</h3>
              </div>
              <p className="pillar-desc">Focused on real tender requirements.</p>
            </div>

            <div className="why-pillar-card">
              <div className="pillar-header">
                <div className="check-bullet-circle">
                  <Check size={14} strokeWidth={3} />
                </div>
                <h3 className="pillar-title">Responsive</h3>
              </div>
              <p className="pillar-desc">Technical and financial proposal support.</p>
            </div>

            <div className="why-pillar-card">
              <div className="pillar-header">
                <div className="check-bullet-circle">
                  <Check size={14} strokeWidth={3} />
                </div>
                <h3 className="pillar-title">Deadline-Conscious</h3>
              </div>
              <p className="pillar-desc">Structured around timely submission.</p>
            </div>

            <div className="why-pillar-card">
              <div className="pillar-header">
                <div className="check-bullet-circle">
                  <Check size={14} strokeWidth={3} />
                </div>
                <h3 className="pillar-title">Technology-Enabled</h3>
              </div>
              <p className="pillar-desc">Digital project cost management solution.</p>
            </div>
          </div>

          <div className="why-action-row">
            <button onClick={() => onOpenModal()} className="btn-dark-pill">
              <span>Get Free Consultation</span>
              <div className="btn-arrow-circle">
                <ArrowRight size={14} strokeWidth={2.5} />
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Desk/Laptop Setup & Handwriting Note */}
        <div className="why-choose-right">
          <div className="why-visual-container">
            {/* Handwritten Note Annotation */}
            <div className="handwritten-annotation note-why-choose">
              <span className="handwritten-text">Practical Solutions, Real Results</span>
              <svg className="handwritten-arrow-svg" width="46" height="38" viewBox="0 0 50 40" fill="none">
                <path d="M4 8C18 4 38 12 44 32M44 32L34 26M44 32L46 19" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="why-image-card">
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
