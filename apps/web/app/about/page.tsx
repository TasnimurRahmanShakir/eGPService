'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LeadModal } from '../../components/LeadModal';

import { useLanguage } from '../../context/LanguageContext';

export default function AboutPage() {
  const { lang, t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string | undefined>();

  const openModal = (serviceName?: string) => {
    setModalService(serviceName);
    setModalOpen(true);
  };

  const corePillars = [
    {
      num: '01',
      title: t.whyChoose.pillars.p1Title,
      desc: t.whyChoose.pillars.p1Desc
    },
    {
      num: '02',
      title: t.whyChoose.pillars.p2Title,
      desc: t.whyChoose.pillars.p2Desc
    },
    {
      num: '03',
      title: t.whyChoose.pillars.p3Title,
      desc: t.whyChoose.pillars.p3Desc
    },
    {
      num: '04',
      title: t.whyChoose.pillars.p4Title,
      desc: t.whyChoose.pillars.p4Desc
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
                  {t.aboutPage.title1}{' '}
                  <span style={{ color: '#12A672' }}>{t.aboutPage.title2}</span>
                </h1>

                <p className="about-hero-sub">
                  {t.aboutPage.subtitle}
                </p>

                <div className="about-hero-buttons">
                  <button
                    onClick={() => openModal()}
                    className="about-btn"
                    id="about-hero-consult-btn"
                  >
                    {t.nav.consultationBtn}
                  </button>

                  <Link href="/#services" className="about-btn alt">
                    {t.hero.secondaryCta}
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
                  {t.aboutPage.heroBadge1}<br />{t.aboutPage.heroBadge2}
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
                <span className="about-eyebrow">{t.aboutPage.missionEyebrow}</span>
                <h2 className="about-section-heading">
                  {t.aboutPage.missionHeading1}{' '}
                  <span style={{ color: '#12A672' }}>
                    {t.aboutPage.missionHeading2}
                  </span>
                </h2>
              </div>

              <div>
                <p className="about-lead-text">
                  {t.aboutPage.missionLead}
                </p>

                <p className="about-body-text">
                  {t.aboutPage.missionBody}
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
                    <span>{t.aboutPage.checkItem1}</span>
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
                    <span>{t.aboutPage.checkItem2}</span>
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
                    <span>{t.aboutPage.checkItem3}</span>
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
                <span className="about-eyebrow">{t.aboutPage.leadershipEyebrow}</span>

                <h2 className="about-section-heading" style={{ margin: '20px 0 16px' }}>
                  {t.aboutPage.leadershipHeading1}{' '}
                  <span style={{ color: '#12A672' }}>{t.aboutPage.leadershipHeading2}</span>
                </h2>

                <p style={{ fontSize: '16px', lineHeight: 1.65, color: '#4A5F56', margin: '0 0 28px' }}>
                  {t.aboutPage.leadershipSub}
                </p>

                <button
                  onClick={() => openModal()}
                  className="about-btn"
                  id="about-leadership-talk-btn"
                >
                  {t.aboutPage.leadershipCta}
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
                      <span className="about-founder-badge">{t.aboutPage.leader1Badge}</span>
                    </h3>
                    <span className="about-leader-role">{t.aboutPage.leader1Role}</span>
                    <p className="about-leader-desc">
                      {t.aboutPage.leader1Desc}
                    </p>
                  </div>
                </div>

                {/* Leader 2: Managing Director */}
                <div className="about-leader-row">
                  <div className="about-leader-avatar muted">MD</div>
                  <div className="about-leader-content">
                    <h3 className="about-leader-name">{t.aboutPage.leader2Title}</h3>
                    <span className="about-leader-role">{t.aboutPage.leader2Role}</span>
                    <p className="about-leader-desc">
                      {t.aboutPage.leader2Desc}
                    </p>
                  </div>
                </div>

                {/* Leader 3: Director */}
                <div className="about-leader-row">
                  <div className="about-leader-avatar muted">DIR</div>
                  <div className="about-leader-content">
                    <h3 className="about-leader-name">{t.aboutPage.leader3Title}</h3>
                    <span className="about-leader-role">{t.aboutPage.leader3Role}</span>
                    <p className="about-leader-desc">
                      {t.aboutPage.leader3Desc}
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
                {t.aboutPage.pillarsEyebrow}
              </span>
              <h2 className="about-section-heading" style={{ color: '#FFFFFF' }}>
                {t.aboutPage.pillarsHeading}
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
