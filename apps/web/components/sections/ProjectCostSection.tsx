'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

interface ProjectCostSectionProps {
  onOpenModal: (serviceName?: string) => void;
}

export function ProjectCostSection({ onOpenModal }: ProjectCostSectionProps) {
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
              <span>PROJECT COST MANAGEMENT</span>
            </div>
            <h2 className="section-title-large">
              Manage Project Costs<br />
              <span className="hero-highlight-green">in Real Time.</span>
            </h2>
            <p className="section-subtext-regular">
              A separate software-based solution to record, track and manage project expenses and costs through secure business access.
            </p>

            {/* Interactive Process Steps Bar */}
            <div className="cost-workflow-bar">
              <div className="cost-flow-step">
                <span className="flow-num">01</span>
                <span className="flow-text">Create Projects</span>
              </div>
              <div className="flow-arrow-separator">➔</div>
              <div className="cost-flow-step">
                <span className="flow-num">02</span>
                <span className="flow-text">Record Costs</span>
              </div>
              <div className="flow-arrow-separator">➔</div>
              <div className="cost-flow-step">
                <span className="flow-num">03</span>
                <span className="flow-text">Track Expenses</span>
              </div>
              <div className="flow-arrow-separator">➔</div>
              <div className="cost-flow-step highlight-flow">
                <span className="flow-num">04</span>
                <span className="flow-text">Manage</span>
              </div>
            </div>

            <div className="cost-cta-action">
              <button
                onClick={() => onOpenModal('Project Cost Management')}
                className="btn-dark-pill"
                id="cost-request-demo-btn"
              >
                <span>Request a Demo</span>
                <div className="btn-arrow-circle">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </div>
              </button>
            </div>
          </div>

          {/* Right Software Mockup Window: Signature UI Assembly Animation */}
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
                  <span>Project Cost Manager • Real-Time Expense Ledger</span>
                </div>
                <span className="mockup-portal-status">Live Connected</span>
              </div>

              <div className="mockup-window-body">
                {/* 1. Sidebar Assemble */}
                <div className="mockup-sidebar mockup-assembly-sidebar">
                  <div className="mockup-sidebar-logo">
                    <span className="mockup-logo-square">৳</span>
                    <span className="mockup-logo-text">Ledger</span>
                  </div>
                  <div className="mockup-sidebar-menu">
                    <div className="mockup-nav-item active">Overview</div>
                    <div className="mockup-nav-item">Projects</div>
                    <div className="mockup-nav-item">BOQ Costs</div>
                    <div className="mockup-nav-item">Reports</div>
                  </div>
                </div>

                <div className="mockup-main-panel">
                  {/* 2. Header Assemble */}
                  <div className="mockup-panel-header mockup-assembly-header">
                    <h4>Active Project Ledger</h4>
                    <span className="mockup-portal-status">Synchronized</span>
                  </div>

                  {/* 3. Project Stage Rows Assemble Sequentially */}
                  <div className="mockup-stages-list">
                    <div className="mockup-stage-row mockup-assembly-row">
                      <div className="mockup-stage-left">
                        <span className="mockup-stage-num">01</span>
                        <span>Create Projects & Set Budget Targets</span>
                      </div>
                      <Check size={14} className="text-emerald" />
                    </div>

                    <div className="mockup-stage-row mockup-assembly-row">
                      <div className="mockup-stage-left">
                        <span className="mockup-stage-num">02</span>
                        <span>Record Daily Site Expenses & Material Invoices</span>
                      </div>
                      <Check size={14} className="text-emerald" />
                    </div>

                    <div className="mockup-stage-row highlight-stage mockup-assembly-row">
                      <div className="mockup-stage-left">
                        <span className="mockup-stage-num highlight-num">03</span>
                        <span>Track Variance & BOQ Consumption Rate</span>
                      </div>
                      <ChevronRight size={15} className="mockup-chevron" />
                    </div>

                    <div className="mockup-stage-row mockup-assembly-row">
                      <div className="mockup-stage-left">
                        <span className="mockup-stage-num">04</span>
                        <span>Manage Profit Margins & Executive Reports</span>
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
                <span className="status-pill-title">Live Cost Tracking</span>
                <span className="status-pill-state">Budget Synchronized</span>
                <span className="status-pill-ref">Profit Margin: +18.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
