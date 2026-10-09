'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

import { useLanguage } from '../../context/LanguageContext';

interface ProjectCostSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function ProjectCostSection({ onOpenModal }: ProjectCostSectionProps) {
  const { lang, t } = useLanguage();
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Subtle parallax: dashboard moves slightly slower than text creating optical depth
      const el = document.getElementById('cost-management');
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setOffsetY((rect.top - window.innerHeight / 2) * -0.04);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={ref}
      className={`project-cost-section section-padding ${isInView ? 'cost-in-view' : ''}`}
      id="cost-management"
    >
      <div className="container">
        <div className="project-cost-grid">
          {/* Left Content Column */}
          <div className="project-cost-left">
            <div className="eyebrow-pill">
              <span>{t.projectCost.eyebrow}</span>
            </div>
            <h2 className="section-title-large">
              {t.projectCost.title1}<br />
              <span className="hero-highlight-green">{t.projectCost.title2}</span>
            </h2>
            <p className="section-subtext-regular">
              {t.projectCost.subtext}
            </p>

            {/* Interactive Process Steps Bar */}
            <div className="cost-workflow-bar">
              <div className="cost-flow-step">
                <span className="flow-num">01</span>
                <span className="flow-text">{t.projectCost.steps.step1}</span>
              </div>
              <div className="flow-arrow-separator">
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="flow-arrow-svg">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="cost-flow-step">
                <span className="flow-num">02</span>
                <span className="flow-text">{t.projectCost.steps.step2}</span>
              </div>
              <div className="flow-arrow-separator">
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="flow-arrow-svg">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="cost-flow-step">
                <span className="flow-num">03</span>
                <span className="flow-text">{t.projectCost.steps.step3}</span>
              </div>
              <div className="flow-arrow-separator">
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="flow-arrow-svg">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="cost-flow-step highlight-flow">
                <span className="flow-num">04</span>
                <span className="flow-text">{t.projectCost.steps.step4}</span>
              </div>
            </div>

            <div className="cost-cta-action">
              <button
                onClick={() => onOpenModal('Project Cost Management')}
                className="btn-dark-pill"
                id="cost-request-demo-btn"
              >
                <span>{t.projectCost.cta}</span>
                <div className="btn-arrow-circle">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </div>
              </button>
            </div>
          </div>

          {/* Right Software Mockup Window */}
          <div
            className="project-cost-right"
            style={{
              transform: `translate3d(0, ${offsetY}px, 0)`,
              transition: 'transform 0.15s ease-out'
            }}
          >
            <div className="portal-mockup-window">
              <div className="mockup-window-topbar">
                <div className="window-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="window-title-chip">
                  <span>{lang === 'bn' ? 'প্রজেক্ট কস্ট ম্যানেজার • রিয়েল-টাইম হিসাব' : 'Project Cost Manager • Real-Time Expense Ledger'}</span>
                </div>
                <span className="mockup-portal-status">{lang === 'bn' ? 'সংযুক্ত' : 'Live Connected'}</span>
              </div>

              <div className="mockup-window-body">
                {/* 1. Sidebar Assemble */}
                <div className="mockup-sidebar mockup-assembly-sidebar">
                  <div className="mockup-sidebar-logo">
                    <span className="mockup-logo-square">৳</span>
                    <span className="mockup-logo-text">{lang === 'bn' ? 'লেজার' : 'Ledger'}</span>
                  </div>
                  <div className="mockup-sidebar-menu">
                    <div className="mockup-nav-item active">{lang === 'bn' ? 'ওভারভিউ' : 'Overview'}</div>
                    <div className="mockup-nav-item">{lang === 'bn' ? 'প্রজেক্টসমূহ' : 'Projects'}</div>
                    <div className="mockup-nav-item">{lang === 'bn' ? 'বিওকিউ খরচ' : 'BOQ Costs'}</div>
                    <div className="mockup-nav-item">{lang === 'bn' ? 'রিপোর্ট' : 'Reports'}</div>
                  </div>
                </div>

                <div className="mockup-main-panel">
                  {/* 2. Header Assemble */}
                  <div className="mockup-panel-header mockup-assembly-header">
                    <h4>{lang === 'bn' ? 'চলমান প্রজেক্ট লেজার' : 'Active Project Ledger'}</h4>
                    <span className="mockup-portal-status">{lang === 'bn' ? 'সিঙ্ক্রোনাইজড' : 'Synchronized'}</span>
                  </div>

                  {/* 3. Project Stage Rows Assemble Sequentially */}
                  <div className="mockup-stages-list">
                    <div className="mockup-stage-row mockup-assembly-row">
                      <div className="mockup-stage-left">
                        <span className="mockup-stage-num">01</span>
                        <span>{lang === 'bn' ? 'প্রজেক্ট তৈরি ও বাজেট লক্ষ্যমাত্রা নির্ধারণ' : 'Create Projects & Set Budget Targets'}</span>
                      </div>
                      <Check size={14} className="text-emerald" />
                    </div>

                    <div className="mockup-stage-row mockup-assembly-row">
                      <div className="mockup-stage-left">
                        <span className="mockup-stage-num">02</span>
                        <span>{lang === 'bn' ? 'দৈনিক সাইট খরচ ও চালান এন্ট্রি' : 'Record Daily Site Expenses & Material Invoices'}</span>
                      </div>
                      <Check size={14} className="text-emerald" />
                    </div>

                    <div className="mockup-stage-row highlight-stage mockup-assembly-row">
                      <div className="mockup-stage-left">
                        <span className="mockup-stage-num highlight-num">03</span>
                        <span>{lang === 'bn' ? 'বিওকিউ খরচের তারতম্য বিশ্লেষণ' : 'Track Variance & BOQ Consumption Rate'}</span>
                      </div>
                      <ChevronRight size={15} className="mockup-chevron" />
                    </div>

                    <div className="mockup-stage-row mockup-assembly-row">
                      <div className="mockup-stage-left">
                        <span className="mockup-stage-num">04</span>
                        <span>{lang === 'bn' ? 'মুনাফা মার্জিন ও নির্বাহী রিপোর্ট ব্যবস্থাপনা' : 'Manage Profit Margins & Executive Reports'}</span>
                      </div>
                      <ChevronRight size={15} className="mockup-chevron" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Floating Live Ledger Status Pill Assemble */}
            <div className="floating-status-pill mockup-assembly-pill">
              <div className="status-pill-check">
                <CheckCircle2 size={24} className="text-emerald-icon" />
              </div>
              <div className="status-pill-text">
                <span className="status-pill-title">{lang === 'bn' ? 'লাইভ কস্ট ট্র্যাকিং' : 'Live Cost Tracking'}</span>
                <span className="status-pill-state">{lang === 'bn' ? 'বাজেট সিঙ্ক্রোনাইজড' : 'Budget Synchronized'}</span>
                <span className="status-pill-ref">{lang === 'bn' ? 'মুনাফা মার্জিন: +১৮.৪%' : 'Profit Margin: +18.4%'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
