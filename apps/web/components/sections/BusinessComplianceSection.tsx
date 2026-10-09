'use client';

import React from 'react';
import {
  Receipt,
  FileSpreadsheet,
  Calculator,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useInView } from '../../hooks/useInView';

import { useLanguage } from '../../context/LanguageContext';

interface BusinessComplianceSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function BusinessComplianceSection({ onOpenModal }: BusinessComplianceSectionProps) {
  const { t } = useLanguage();
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  const complianceList = [
    {
      title: t.compliance.items.vatRegTitle,
      desc: t.compliance.items.vatRegDesc,
      icon: <Receipt size={20} strokeWidth={2.2} />,
      colorClass: 'icon-teal'
    },
    {
      title: t.compliance.items.vatReturnTitle,
      desc: t.compliance.items.vatReturnDesc,
      icon: <FileSpreadsheet size={20} strokeWidth={2.2} />,
      colorClass: 'icon-rose'
    },
    {
      title: t.compliance.items.taxRegTitle,
      desc: t.compliance.items.taxRegDesc,
      icon: <Calculator size={20} strokeWidth={2.2} />,
      colorClass: 'icon-purple'
    },
    {
      title: t.compliance.items.taxReturnTitle,
      desc: t.compliance.items.taxReturnDesc,
      icon: <ShieldCheck size={20} strokeWidth={2.2} />,
      colorClass: 'icon-green'
    }
  ];

  return (
    <section
      ref={ref}
      className={`compliance-section section-padding bg-subtle ${isInView ? 'compliance-in-view' : ''}`}
      id="compliance"
    >
      <div className="container">
        <div className="compliance-header-block text-center margin-center">
          <div className="eyebrow-pill margin-center">
            <span>{t.compliance.eyebrow}</span>
          </div>
          <h2 className="section-title-large">
            {t.compliance.title}
          </h2>
          <p className="section-subtext-regular margin-center" style={{ maxWidth: '580px' }}>
            {t.compliance.subtext}
          </p>
        </div>

        {/* Cascade Cards with Alternating Horizontal Offsets */}
        <div className="compliance-cards-grid">
          {complianceList.map((item) => (
            <div
              key={item.title}
              className="compliance-feature-card compliance-cascade-card"
              onClick={() => onOpenModal(item.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenModal(item.title);
                }
              }}
              aria-label={`Inquire about ${item.title}`}
            >
              <div className={`compliance-icon-badge ${item.colorClass}`}>
                {item.icon}
              </div>
              <h3 className="compliance-card-title">{item.title}</h3>
              <p className="compliance-card-desc">{item.desc}</p>
              <div className="compliance-card-action">
                <span>{t.compliance.inquireBtn}</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
