'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowRight,
  Phone,
  FileText,
  Layers,
  Award,
  Users,
  Building,
  Check,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LeadModal } from '../components/LeadModal';
import { StickyMobileBar } from '../components/StickyMobileBar';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Tender Preparation');

  const openModalWithService = (service: string) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <div>
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* HERO SECTION */}
      <section className="hero-wrapper">
        <div className="container hero-grid-split">
          {/* Left Column */}
          <div>
            <div className="pill-badge pill-green">
              <span className="pill-dot"></span>
              Professional e-GP Tender Support &amp; Consulting in Bangladesh
            </div>

            <h1 className="hero-headline">
              Make Every{' '}
              <span className="hero-headline-accent">Submission Count.</span>
            </h1>

            <p className="hero-subhead">
              Professional e-GP registration, tender preparation and submission support for businesses in Bangladesh.
            </p>

            <div className="hero-cta-group">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-red"
                id="hero-primary-cta"
              >
                Get Tender Support ▸
              </button>
              <Link href="/services" className="btn-outline-green">
                Explore Services
              </Link>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-headline)' }}>
                  Error-Free Tender Formats
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-headline)' }}>
                  Accurate BOQ Formulation
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-headline)' }}>
                  Timely Deadline Submission
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Tender Readiness Cockpit Mockup */}
          <div>
            <div className="readiness-mockup-frame">
              <div className="mockup-header-row">
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    TENDER READINESS COCKPIT
                  </span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--green-deep)', marginTop: '2px' }}>
                    Live Verification Pipeline
                  </div>
                </div>
                <div className="pill-badge pill-gold">
                  <Clock size={12} />
                  <span>Submission Ready</span>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="mockup-step-row completed">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--green-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                    ✓
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--green-deep)' }}>1. e-GP Registration &amp; Account Setup</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Organization verified &amp; active digital key</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--green-primary)' }}>PASSED</span>
              </div>

              <div className="mockup-step-row completed">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--green-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                    ✓
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--green-deep)' }}>2. Tender Review &amp; BOQ Formulation</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Excel schedule &amp; line items validated</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--green-primary)' }}>AUDITED</span>
              </div>

              <div className="mockup-step-row completed">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--green-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                    ✓
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--green-deep)' }}>3. Document Check &amp; Security Packaging</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bank guarantee &amp; technical certificates verified</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--green-primary)' }}>CONFIRMED</span>
              </div>

              <div className="mockup-step-row completed">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--green-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                    ✓
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--green-deep)' }}>4. Sealed Bid Online Upload</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Final hash generated &amp; submission acknowledged</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--green-primary)' }}>100% READY</span>
              </div>

              {/* Card Footer Call */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Questions regarding your tender?
                </div>
                <a
                  href="tel:+8801886970197"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--green-primary)',
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={14} />
                  +880 1886-970197
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST METRICS */}
      <section className="trust-metrics-section">
        <div className="container">
          <div className="trust-metrics-grid">
            <div className="trust-metric-col">
              <div className="metric-big-num">9+</div>
              <div className="metric-sub-label">Years Experience</div>
            </div>
            <div className="trust-metric-col">
              <div className="metric-big-num">150+</div>
              <div className="metric-sub-label">Clients</div>
            </div>
            <div className="trust-metric-col">
              <div className="metric-big-num">32,000+</div>
              <div className="metric-sub-label">Tender Submissions</div>
            </div>
            <div className="trust-metric-col">
              <div className="metric-big-num">96%</div>
              <div className="metric-sub-label">Client Satisfaction</div>
            </div>
            <div className="trust-metric-col">
              <div className="metric-big-num">55%</div>
              <div className="metric-sub-label">Win Rate*</div>
            </div>
          </div>

          <p className="metric-disclaimer-note">
            *Company-reported figure. Tender outcomes depend on the applicable procurement process and evaluation.
          </p>
        </div>
      </section>

      {/* VALUE PROPOSITION: REGISTER -> PREPARE -> SUBMIT */}
      <section className="section-padding">
        <div className="container">
          <div className="section-intro-center">
            <span className="pill-badge pill-green">VALUE PROPOSITION</span>
            <h2 className="section-headline">Your Tender Process, Simplified.</h2>
            <p className="section-desc-sub">
              From registration to submission, we help businesses navigate the e-GP process with practical guidance, organized preparation and professional support.
            </p>
          </div>

          <div className="rail-card-grid">
            {/* REGISTER */}
            <div className="rail-pillar-card">
              <span className="pillar-num">PHASE 01</span>
              <h3 className="pillar-title">REGISTER</h3>
              <div className="pillar-quote">Get started with the right process.</div>
              <p className="pillar-body">
                We assist you with new company registration on the e-GP portal, annual renewal fees, document verification, and digital signature token integration to get your profile tender-ready.
              </p>
            </div>

            {/* PREPARE */}
            <div className="rail-pillar-card" style={{ borderTop: '4px solid var(--green-primary)' }}>
              <span className="pillar-num" style={{ color: 'var(--green-primary)' }}>PHASE 02</span>
              <h3 className="pillar-title">PREPARE</h3>
              <div className="pillar-quote">Review. Organize. Check.</div>
              <p className="pillar-body">
                Comprehensive tender schedule analysis, accurate BOQ pricing calculation, liquid asset verification, and technical specification packaging to avoid disqualification.
              </p>
            </div>

            {/* SUBMIT */}
            <div className="rail-pillar-card">
              <span className="pillar-num">PHASE 03</span>
              <h3 className="pillar-title">SUBMIT</h3>
              <div className="pillar-quote">Complete your submission with confidence.</div>
              <p className="pillar-body">
                Double-checked document upload, encrypted tender security verification, and punctual electronic portal submission well ahead of the official closing deadline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES: WHAT WE DO */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-canvas)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-intro-center">
            <span className="pill-badge pill-green">SERVICES</span>
            <h2 className="section-headline">What We Do</h2>
            <p className="section-desc-sub">
              Professional services designed for businesses participating in Bangladesh electronic government procurement.
            </p>
          </div>

          <div className="services-card-grid">
            {/* Service 1 */}
            <div className="service-item-card">
              <div className="service-icon-box">
                <Building size={24} />
              </div>
              <h3 className="service-card-title">e-GP Registration</h3>
              <p className="service-card-desc">
                Professional assistance with e-GP registration, setup and required documentation.
              </p>
              <button
                onClick={() => openModalWithService('e-GP Registration')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--green-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  padding: 0,
                  marginTop: 'auto'
                }}
              >
                Inquire About Registration <ArrowRight size={15} />
              </button>
            </div>

            {/* Service 2 */}
            <div className="service-item-card">
              <div className="service-icon-box">
                <FileText size={24} />
              </div>
              <h3 className="service-card-title">Tender Preparation</h3>
              <p className="service-card-desc">
                Support with tender review, forms, BOQ and submission documents.
              </p>
              <button
                onClick={() => openModalWithService('Tender Preparation')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--green-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  padding: 0,
                  marginTop: 'auto'
                }}
              >
                Inquire About Preparation <ArrowRight size={15} />
              </button>
            </div>

            {/* Service 3 */}
            <div className="service-item-card">
              <div className="service-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h3 className="service-card-title">Tender Submission</h3>
              <p className="service-card-desc">
                Final checking, document upload and e-GP submission assistance.
              </p>
              <button
                onClick={() => openModalWithService('Tender Submission')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--green-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  padding: 0,
                  marginTop: 'auto'
                }}
              >
                Inquire About Submission <ArrowRight size={15} />
              </button>
            </div>

            {/* Service 4 */}
            <div className="service-item-card">
              <div className="service-icon-box">
                <Award size={24} />
              </div>
              <h3 className="service-card-title">e-GP Consultancy</h3>
              <p className="service-card-desc">
                Practical guidance for e-GP and tender-related challenges.
              </p>
              <button
                onClick={() => openModalWithService('e-GP Consultancy')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--green-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  padding: 0,
                  marginTop: 'auto'
                }}
              >
                Inquire About Consultancy <ArrowRight size={15} />
              </button>
            </div>

            {/* Service 5 */}
            <div className="service-item-card">
              <div className="service-icon-box">
                <Users size={24} />
              </div>
              <h3 className="service-card-title">e-GP Training</h3>
              <p className="service-card-desc">
                Hands-on training for individuals, executives and business teams.
              </p>
              <button
                onClick={() => openModalWithService('e-GP Training')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--green-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  padding: 0,
                  marginTop: 'auto'
                }}
              >
                Inquire About Training <ArrowRight size={15} />
              </button>
            </div>

            {/* CTA Card */}
            <div className="service-item-card" style={{ background: 'var(--green-soft)', borderColor: 'rgba(1, 78, 54, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--green-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                CUSTOM SUPPORT
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--green-deep)', marginBottom: '0.75rem' }}>
                Need Comprehensive Assistance?
              </h3>
              <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                We review your upcoming solicitation notice and coordinate all documentation end-to-end.
              </p>
              <Link href="/services" className="btn-outline-green" style={{ width: 'fit-content' }}>
                Explore Services ▸
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR: MORE THAN SUBMISSION SUPPORT */}
      <section className="section-padding">
        <div className="container">
          <div className="diff-container-box">
            <div style={{ maxWidth: '720px' }}>
              <span className="pill-badge pill-green" style={{ marginBottom: '0.75rem' }}>
                DIFFERENTIATOR
              </span>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--green-deep)', marginBottom: '1rem' }}>
                More Than Submission Support.
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                We focus on the process behind the submission—understanding requirements, organizing documents and preparing your tender properly.
              </p>
            </div>

            <div className="diff-3col-grid">
              <div className="diff-col">
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: 800 }}>
                  01
                </div>
                <h3>Clear Process</h3>
                <p>Know what needs to be done.</p>
              </div>

              <div className="diff-col">
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: 800 }}>
                  02
                </div>
                <h3>Careful Preparation</h3>
                <p>Get your documents and information organized.</p>
              </div>

              <div className="diff-col">
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: 800 }}>
                  03
                </div>
                <h3>Timely Support</h3>
                <p>Stay focused on the submission deadline.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-canvas)', paddingTop: 0 }}>
        <div className="container">
          <div className="about-preview-box">
            <div>
              <span className="pill-badge pill-gold" style={{ marginBottom: '1rem' }}>
                ABOUT e-GP TENDER BD
              </span>
              <h2>About e-GP Tender BD</h2>
              <p style={{ marginBottom: '2rem' }}>
                e-GP Tender BD is a Bangladesh-based tender support and consulting service helping businesses manage the practical side of e-GP participation.
              </p>
              <Link href="/about" className="btn-outline-white">
                About Us ▸
              </Link>
            </div>

            <div>
              <div className="focus-card-inner">
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--gold-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.75rem' }}>
                  OUR FOCUS
                </span>
                <div className="focus-lead-text">
                  Make the process <span>clearer.</span><br />
                  Make preparation <span>easier.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta-band">
        <div className="container">
          <h2 className="final-cta-h2">Have a Tender Coming Up?</h2>
          <h3 className="final-cta-h3">Let&apos;s Get It Ready.</h3>
          <p className="final-cta-sub">
            Get professional support for registration, preparation, documentation and submission.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-red"
              id="final-cta-support"
            >
              Get Tender Support ▸
            </button>
            <a href="tel:+8801886970197" className="btn-outline-white">
              <Phone size={16} />
              Call +880 1886-970197
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <StickyMobileBar />
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedService}
      />
    </div>
  );
}
