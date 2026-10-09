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

import { useLanguage } from '../../context/LanguageContext';

interface ServicesSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function ServicesSection({ onOpenModal }: ServicesSectionProps) {
  const { t } = useLanguage();
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  const servicesList = [
    {
      title: t.services.items.egpRegTitle,
      desc: t.services.items.egpRegDesc,
      icon: <FileText size={20} strokeWidth={2.2} />,
      colorClass: 'icon-emerald'
    },
    {
      title: t.services.items.tenderPrepTitle,
      desc: t.services.items.tenderPrepDesc,
      icon: <Send size={20} strokeWidth={2.2} />,
      colorClass: 'icon-indigo'
    },
    {
      title: t.services.items.liquidAssetTitle,
      desc: t.services.items.liquidAssetDesc,
      icon: <Landmark size={20} strokeWidth={2.2} />,
      colorClass: 'icon-amber'
    },
    {
      title: t.services.items.consultancyTitle,
      desc: t.services.items.consultancyDesc,
      icon: <Headphones size={20} strokeWidth={2.2} />,
      colorClass: 'icon-green'
    },
    {
      title: t.services.items.trainingTitle,
      desc: t.services.items.trainingDesc,
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
            <span>{t.services.eyebrow}</span>
          </div>
          <h2 className="section-title-white">
            {t.services.title1}<br />
            {t.services.title2}
          </h2>
          <p className="section-subtext-light">
            {t.services.subtext}
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
              aria-label={`${t.services.requestLabel}: ${service.title}`}
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
                <span className="service-cta-label">{t.services.requestLabel}</span>
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
