'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start calculating progress when the section enters the lower middle of viewport
      const startTrigger = windowHeight * 0.85;
      const endTrigger = windowHeight * 0.2;

      const totalDistance = startTrigger - endTrigger + rect.height * 0.4;
      const currentDistance = startTrigger - rect.top;

      let p = currentDistance / totalDistance;
      p = Math.max(0, Math.min(1, p));
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Consultation',
      desc: 'Understand your needs and assess opportunities.',
      threshold: 0.15
    },
    {
      num: '02',
      title: 'Preparation',
      desc: 'Collect, organize and prepare all documents.',
      threshold: 0.42
    },
    {
      num: '03',
      title: 'Submission',
      desc: 'Submit through e-GP with accuracy and compliance.',
      threshold: 0.68
    },
    {
      num: '04',
      title: 'Follow Up',
      desc: 'Track status and support till final result.',
      threshold: 0.90
    }
  ];

  // Calculate timeline fill percentage across the steps
  const fillPercentage = Math.min(
    100,
    Math.max(0, ((scrollProgress - 0.1) / 0.8) * 100)
  );

  return (
    <section
      ref={sectionRef}
      className="process-clean-section section-padding"
      id="process"
    >
      <div className="container text-center">
        <div className="eyebrow-pill margin-center">
          <span>OUR PROCESS</span>
        </div>

        <h2 className="section-title-large">
          A Simple 4-Step Process
        </h2>

        <p className="section-subtext-regular margin-center max-w-500">
          We make the tender process easy, transparent and stress-free.
        </p>

        {/* Scroll Progress Timeline Track */}
        <div className="timeline-track-wrapper">
          <div className="timeline-bg-bar">
            <div
              className="timeline-progress-fill"
              style={{ width: `${fillPercentage}%` }}
            />
          </div>

          <div className="process-steps-row">
            {steps.map((step, idx) => {
              const isActive = scrollProgress >= step.threshold;
              return (
                <React.Fragment key={step.num}>
                  <div
                    className={`process-step-col process-step-col-interactive ${
                      isActive ? 'active-step' : ''
                    }`}
                  >
                    <div className="process-step-circle process-step-circle-interactive">
                      {step.num}
                    </div>
                    <h3 className="process-step-title">{step.title}</h3>
                    <p className="process-step-desc">{step.desc}</p>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="process-step-arrow">
                      <ArrowRight
                        size={20}
                        style={{
                          color: isActive ? '#059669' : '#D1D5DB',
                          transition: 'color 0.35s ease'
                        }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
