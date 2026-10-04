'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useInView } from '../../hooks/useInView';

export function WhoWeServeSection() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('resources');
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // As user scrolls down, image translates slightly downwards for parallax depth
          setOffsetY((rect.top - window.innerHeight / 2) * -0.05);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={ref}
      className={`who-we-serve-section section-padding bg-subtle ${isInView ? 'who-in-view' : ''}`}
      id="resources"
    >
      <div className="container who-we-serve-grid">
        {/* Left Column: Arch Architecture with Parallax & Handwritten Note */}
        <div className="who-we-serve-left">
          <div className="who-visual-container">
            {/* Handwritten Note with Animated SVG Arrow Draw */}
            <div className="handwritten-annotation note-who-serve handwritten-annotation-animated">
              <span className="handwritten-text">Supporting Businesses, Building Bangladesh</span>
              <svg className="handwritten-arrow-svg" width="46" height="38" viewBox="0 0 50 40" fill="none">
                <path
                  className="annotation-draw-arrow-path"
                  d="M4 8C16 12 36 18 42 32M42 32L32 28M42 32L44 18"
                  stroke="#059669"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div
              className="who-arch-card"
              style={{
                transform: `translate3d(0, ${offsetY}px, 0)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
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

        {/* Right Column: Copy & Staggered Organization Pills */}
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
            <div className="org-chip-pill org-chip-pill-stagger">Government & Semi-Government</div>
            <div className="org-chip-pill org-chip-pill-stagger">Private Companies</div>
            <div className="org-chip-pill org-chip-pill-stagger">NGOs & Development Partners</div>
            <div className="org-chip-pill org-chip-pill-stagger">Individual Entrepreneurs</div>
          </div>
        </div>
      </div>
    </section>
  );
}
