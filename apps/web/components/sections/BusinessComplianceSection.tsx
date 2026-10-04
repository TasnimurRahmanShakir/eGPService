'use client';

import React from 'react';
import {
  Receipt,
  FileSpreadsheet,
  Calculator,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface BusinessComplianceSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function BusinessComplianceSection({ onOpenModal }: BusinessComplianceSectionProps) {
  const complianceList = [
    {
      title: 'VAT Registration',
      desc: 'Online business VAT registration and BIN acquisition assistance.',
      icon: <Receipt size={20} strokeWidth={2.2} />,
      colorClass: 'icon-teal'
    },
    {
      title: 'VAT Return Submission',
      desc: 'Monthly VAT return filing, challan processing and compliance reporting.',
      icon: <FileSpreadsheet size={20} strokeWidth={2.2} />,
      colorClass: 'icon-rose'
    },
    {
      title: 'Tax Registration',
      desc: 'e-TIN corporate and individual tax registration and certificate setup.',
      icon: <Calculator size={20} strokeWidth={2.2} />,
      colorClass: 'icon-purple'
    },
    {
      title: 'Tax Return Submission',
      desc: 'Annual income tax return preparation, assessment and tax clearance filing.',
      icon: <ShieldCheck size={20} strokeWidth={2.2} />,
      colorClass: 'icon-green'
    }
  ];

  return (
    <section className="compliance-section section-padding bg-subtle" id="compliance">
      <div className="container">
        <div className="compliance-header-block text-center margin-center">
          <div className="eyebrow-pill margin-center">
            <span>BUSINESS COMPLIANCE</span>
          </div>
          <h2 className="section-title-large">
            Essential Compliance Support.
          </h2>
          <p className="section-subtext-regular margin-center" style={{ maxWidth: '580px' }}>
            Professional support for essential business registration and filing requirements.
          </p>
        </div>

        <div className="compliance-cards-grid">
          {complianceList.map((item) => (
            <div
              key={item.title}
              className="compliance-feature-card"
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
                <span>Inquire Now</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
