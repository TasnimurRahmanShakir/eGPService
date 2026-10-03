'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Target, Layers, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LeadModal } from '../../components/LeadModal';
import { StickyMobileBar } from '../../components/StickyMobileBar';

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const pillars = [
    {
      keyword: 'Practical.',
      desc: 'Focused on real tender requirements.',
      icon: <Target size={28} />
    },
    {
      keyword: 'Structured.',
      desc: 'Built around a clear process.',
      icon: <Layers size={28} />
    },
    {
      keyword: 'Responsive.',
      desc: 'Focused on timely support.',
      icon: <Clock size={28} />
    },
    {
      keyword: 'Professional.',
      desc: 'Committed to responsible service.',
      icon: <ShieldCheck size={28} />
    }
  ];

  return (
    <div>
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Hero */}
      <section className="page-hero-header">
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <span className="pill-badge pill-green" style={{ marginBottom: '1rem' }}>
            ABOUT e-GP TENDER BD
          </span>
          <h1 className="page-hero-title">
            Professional Support for Better Tender Preparation.
          </h1>
          <p className="page-hero-sub">
            e-GP Tender BD provides professional e-GP tender support and consulting services for businesses across Bangladesh.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="about-narrative-card">
            <h2 style={{ fontSize: '1.85rem', color: 'var(--green-deep)', marginBottom: '1.25rem' }}>
              Making Electronic Public Procurement Workable &amp; Reliable
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              From registration and tender preparation to document support and online submission, we help make the process more structured, understandable and manageable.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Our team consists of procurement professionals and estimators who have worked with hundreds of construction firms, suppliers, and engineering contractors bidding on RHD, LGED, PWD, BWDB, and other government authority tenders. We eliminate procedural errors so that your bids stand on their commercial merit.
            </p>
          </div>

          {/* Our Approach */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="pill-badge pill-gold" style={{ marginBottom: '0.5rem' }}>CORE PRINCIPLES</span>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--green-deep)' }}>Our Approach</h2>
            </div>

            <div className="about-principles-grid">
              {pillars.map((p, idx) => (
                <div
                  key={idx}
                  className="about-principle-card"
                >
                  <div style={{ width: '52px', height: '52px', borderRadius: '10px', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--green-deep)', marginBottom: '0.5rem' }}>
                    {p.keyword}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-band">
        <div className="container">
          <h2 className="final-cta-h2">Have a Tender Coming Up?</h2>
          <h3 className="final-cta-h3">Let&apos;s Get It Ready.</h3>
          <p className="final-cta-sub">
            Get professional support for registration, preparation, documentation and submission.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button onClick={() => setModalOpen(true)} className="btn-red">
              Get Tender Support ▸
            </button>
            <a href="tel:+8801886970197" className="btn-outline-white">
              Call +880 1886-970197
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <StickyMobileBar />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
