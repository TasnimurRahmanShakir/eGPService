'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LeadModal } from '../../components/LeadModal';

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string | undefined>();

  const openModal = (serviceName?: string) => {
    setModalService(serviceName);
    setModalOpen(true);
  };

  const corePillars = [
    {
      num: '01',
      title: 'Tender-Focused',
      desc: 'Groundwork rooted in real tender requirements, evaluation criteria and procurement guidelines.'
    },
    {
      num: '02',
      title: 'Responsive',
      desc: 'Thorough technical and financial proposal assistance with full document responsiveness.'
    },
    {
      num: '03',
      title: 'Deadline-Conscious',
      desc: 'Structured timelines for upload, verification and submission well before closing.'
    },
    {
      num: '04',
      title: 'Technology-Enabled',
      desc: 'Digital tracking and software-based project cost management for post-award financial control.'
    }
  ];

  return (
    <div className="about-page-wrap">
      <Navbar onOpenModal={() => openModal()} />

      <main>
        {/* =================================================================
            1. HERO SECTION
            ================================================================= */}
        <section className="about-hero-bg">
          <div className="about-wrap-container">
            <div className="about-hero-grid">
              <div>


                <h1 className="about-hero-title">
                  Empowering Contractors &amp; Businesses{' '}
                  <span style={{ color: '#12A672' }}>Across Bangladesh.</span>
                </h1>

                <p className="about-hero-sub">
                  Tender advisory, documentation, submission support and digital project cost management, so organizations can compete and win with confidence.
                </p>

                <div className="about-hero-buttons">
                  <button
                    onClick={() => openModal()}
                    className="about-btn"
                    id="about-hero-consult-btn"
                  >
                    Speak with Our Consultants
                  </button>

                  <Link href="/#services" className="about-btn alt">
                    Explore Services
                  </Link>
                </div>
              </div>

              <div className="about-hero-visual">
                <div className="about-hero-photo-frame">
                  <Image
                    src="/images/hero-parliament.jpg"
                    alt="Bangladesh National Parliament Building"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 560px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="about-hero-badge">
                  Integrity, Compliance<br />&amp; Precision
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            2. MISSION SECTION
            ================================================================= */}
        <section className="about-mission-section">
          <div className="about-wrap-container">
            <div className="about-mission-grid">
              <div>
                <span className="about-eyebrow">Our Mission</span>
                <h2 className="about-section-heading">
                  From Opportunity to Award.{' '}
                  <span style={{ color: '#12A672' }}>
                    We Make Procurement Reliable.
                  </span>
                </h2>
              </div>

              <div>
                <p className="about-lead-text">
                  Electronic public procurement in Bangladesh has modernized how tenders are published and evaluated, but procedural precision remains paramount.
                </p>

                <p className="about-body-text">
                  Our mission is to eliminate procedural discrepancies, document omissions and compliance bottlenecks that can cause technically qualified contractors to be declared non-responsive. From registration and qualification mapping to BOQ review and secure e-GP submission, we work as your dedicated procurement team.
                </p>

                <div className="about-check-list">
                  <div className="about-check-row">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#12A672"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Strict adherence to PPR and STD tender requirements</span>
                  </div>

                  <div className="about-check-row">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#12A672"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>End-to-end technical &amp; financial proposal verification</span>
                  </div>

                  <div className="about-check-row">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#12A672"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Proactive post-award project management intelligence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            3. LEADERSHIP SECTION
            ================================================================= */}
        <section className="about-leadership-section" id="leadership">
          <div className="about-wrap-container">
            <div className="about-leadership-grid">
              <div style={{ maxWidth: '380px' }}>
                <span className="about-eyebrow">Leadership</span>

                <h2 className="about-section-heading" style={{ margin: '20px 0 16px' }}>
                  The people behind every{' '}
                  <span style={{ color: '#12A672' }}>submission.</span>
                </h2>

                <p style={{ fontSize: '16px', lineHeight: 1.65, color: '#4A5F56', margin: '0 0 28px' }}>
                  Seasoned procurement practitioners committed to institutional excellence and contractor success.
                </p>

                <button
                  onClick={() => openModal()}
                  className="about-btn"
                  id="about-leadership-talk-btn"
                >
                  Talk to Our Team
                </button>
              </div>

              <div>
                {/* Leader 1: Shawon Alamin */}
                <div className="about-leader-row">
                  <div
                    className="about-leader-avatar"
                    style={{ position: 'relative', overflow: 'hidden' }}
                  >
                    <Image
                      src="/images/shawon-alamin.png"
                      alt="Shawon Alamin - Founder & Chairman"
                      fill
                      sizes="132px"
                      style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    />
                  </div>
                  <div className="about-leader-content">
                    <h3 className="about-leader-name">
                      Shawon Alamin
                      <span className="about-founder-badge">Founder</span>
                    </h3>
                    <span className="about-leader-role">Chairman</span>
                    <p className="about-leader-desc">
                      Leads strategic vision, institutional partnerships and service governance, setting reliable standards for tender advisory, technical compliance and digital cost management.
                    </p>
                  </div>
                </div>

                {/* Leader 2: Managing Director */}
                <div className="about-leader-row">
                  <div className="about-leader-avatar muted">MD</div>
                  <div className="about-leader-content">
                    <h3 className="about-leader-name">Managing Director</h3>
                    <span className="about-leader-role">Office of the Managing Director</span>
                    <p className="about-leader-desc">
                      Directs procurement advisory operations, quality control and multi-sector client delivery across major procuring entities.
                    </p>
                  </div>
                </div>

                {/* Leader 3: Director */}
                <div className="about-leader-row">
                  <div className="about-leader-avatar muted">DIR</div>
                  <div className="about-leader-content">
                    <h3 className="about-leader-name">Director</h3>
                    <span className="about-leader-role">Operations &amp; Advisory</span>
                    <p className="about-leader-desc">
                      Oversees technical and financial proposal reviews, tender documentation audits and regulatory compliance.
                    </p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #D5E2DB' }} />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            4. CORE PILLARS (PRINCIPLES) SECTION
            ================================================================= */}
        <section className="about-pillars-section">
          <div className="about-wrap-container">
            <div style={{ maxWidth: '560px', marginBottom: '48px' }}>
              <span
                className="about-eyebrow"
                style={{ background: '#123B2E', color: '#6EE0B2' }}
              >
                Core Pillars
              </span>
              <h2 className="about-section-heading" style={{ color: '#FFFFFF' }}>
                Principles That Drive Every Submission
              </h2>
            </div>

            <div className="about-pillars-grid">
              {corePillars.map((p) => (
                <div key={p.num} className="about-pillar-card">
                  <div className="about-pillar-num">{p.num}</div>
                  <h3 className="about-pillar-title">{p.title}</h3>
                  <p className="about-pillar-text">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer onOpenModal={() => openModal()} />

      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={modalService}
      />
    </div>
  );
}
