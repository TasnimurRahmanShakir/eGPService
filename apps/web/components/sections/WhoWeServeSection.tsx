import React from 'react';
import Image from 'next/image';

export function WhoWeServeSection() {
  return (
    <section className="who-we-serve-section section-padding bg-subtle" id="resources">
      <div className="container who-we-serve-grid">
        {/* Left Column: Arch Architecture & Cursive Note */}
        <div className="who-we-serve-left">
          <div className="who-visual-container">
            {/* Handwritten Note */}
            <div className="handwritten-annotation note-who-serve">
              <span className="handwritten-text">Supporting Businesses, Building Bangladesh</span>
              <svg className="handwritten-arrow-svg" width="46" height="38" viewBox="0 0 50 40" fill="none">
                <path d="M4 8C16 12 36 18 42 32M42 32L32 28M42 32L44 18" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="who-arch-card">
              <Image
                src="/images/who-we-serve-arch.jpg"
                alt="Modern architectural structure in Bangladesh"
                width={520}
                height={540}
                className="who-arch-image"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Copy & Organization Pills */}
        <div className="who-we-serve-right">
          <div className="eyebrow-pill">
            <span>WHO WE SERVE</span>
          </div>

          <h2 className="section-title-large">
            We Work With<br />
            Various Organizations
          </h2>

          <p className="section-subtext-regular">
            From small businesses to large enterprises, we support organizations across different sectors in Bangladesh.
          </p>

          <div className="org-chips-wrap">
            <div className="org-chip-pill">Government & Semi-Government</div>
            <div className="org-chip-pill">Private Companies</div>
            <div className="org-chip-pill">NGOs & Development Partners</div>
            <div className="org-chip-pill">Individual Entrepreneurs</div>
          </div>
        </div>
      </div>
    </section>
  );
}
