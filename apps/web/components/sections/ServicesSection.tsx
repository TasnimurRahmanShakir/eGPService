'use client';

import React from 'react';
import {
  FileText,
  Send,
  Landmark,
  Headphones,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { useInView } from '../../hooks/useInView';

interface ServicesSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function ServicesSection({ onOpenModal }: ServicesSectionProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  const servicesList = [
    {
      title: 'e-GP Registration',
      desc: 'Registration, setup and documentation assistance.',
      icon: <FileText size={20} strokeWidth={2.2} />,
      colorClass: 'icon-emerald'
    },
    {
      title: 'Tender Preparation & Submission',
      desc: 'Technical and financial proposal, documentation and e-GP submission support.',
      icon: <Send size={20} strokeWidth={2.2} />,
      colorClass: 'icon-indigo'
    },
    {
      title: 'Liquid Asset / Line of Credit Preparation',
      desc: 'Financial documentation support for tender participation.',
      icon: <Landmark size={20} strokeWidth={2.2} />,
      colorClass: 'icon-amber'
    },
    {
      title: 'e-GP Consultancy',
      desc: 'Practical guidance for e-GP and tender requirements.',
      icon: <Headphones size={20} strokeWidth={2.2} />,
      colorClass: 'icon-green'
    },
    {
      title: 'e-GP Training',
      desc: 'Hands-on training for individuals and business teams.',
      icon: <GraduationCap size={20} strokeWidth={2.2} />,
      colorClass: 'icon-sky'
    }
  ];

  return (
    <section
      ref={ref}
      className={`services-dark-section ${isInView ? 'services-in-view' : ''}`}
      id="services"
    >
      <div className="container">
        {/* Header Reveal */}
        <div className="services-header-block services-header-reveal">
          <div className="eyebrow-pill eyebrow-on-dark">
            <span>OUR SERVICES</span>
          </div>
          <h2 className="section-title-white">
            Complete Tender Support<br />
            Under One Roof.
          </h2>
          <p className="section-subtext-light">
            Practical guidance, documentation and proposal assistance for your public procurement tenders in Bangladesh.
          </p>


        </div>

        {/* 5 Core Interactive Services Grid with Staggered Entrance */}
        <div className="services-five-grid">
          {servicesList.map((service) => (
            <div
              key={service.title}
              className="service-interactive-card service-interactive-card-stagger"
              onClick={() => onOpenModal(service.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenModal(service.title);
                }
              }}
              aria-label={`Click to request ${service.title}`}
            >
              <div className="service-card-top-row">
                <div className={`service-icon-box ${service.colorClass}`}>
                  {service.icon}
                </div>
              </div>

              <div className="service-card-info">
                <h3 className="service-card-heading">{service.title}</h3>
                <p className="service-card-desc">{service.desc}</p>
              </div>

              <div className="service-card-cta-bar">
                <span className="service-cta-label">Explore Service</span>
                <div className="service-cta-arrow-circle">
                  <ArrowRight size={13} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
