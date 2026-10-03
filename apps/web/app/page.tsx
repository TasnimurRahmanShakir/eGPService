'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Clock,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  FileCheck,
  GraduationCap,
  Scale,
  Award,
  Calendar,
  Building
} from 'lucide-react';
import { Button, Badge, Card, Modal, CheckStamp } from '@egp/ui';

export default function HomePage() {
  // Navigation / Modal States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Tender Preparation & BOQ');

  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    tenderRef: '',
    service: 'Tender Preparation & BOQ',
    message: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Active Progress Rail Node
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(2);

  // Animated Checklist in Hero (Tender Readiness Card)
  const [checkedItems, setCheckedItems] = useState<number[]>([0]);

  useEffect(() => {
    const timer1 = setTimeout(() => setCheckedItems(prev => [...prev, 1]), 400);
    const timer2 = setTimeout(() => setCheckedItems(prev => [...prev, 2]), 800);
    const timer3 = setTimeout(() => setCheckedItems(prev => [...prev, 3]), 1200);
    const timer4 = setTimeout(() => setCheckedItems(prev => [...prev, 4]), 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const readinessSteps = [
    'e-GP Portal Registration & NID/TIN Verified',
    'Bank Guarantee & Tender Security Cleared',
    'Technical Compliance Forms Packaged',
    'BOQ Pricing & Format Audit Checked',
    'Ready for Sealed Bid Portal Submission'
  ];

  const handleOpenModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
      setFormData(prev => ({ ...prev, service: serviceName }));
    }
    setModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate BD phone number (must be 10 or 11 digits)
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (cleanedPhone.length < 10 || cleanedPhone.length > 11) {
      setPhoneError('Please enter a valid 10-11 digit Bangladesh mobile number (e.g. 1711223344)');
      return;
    }
    setPhoneError('');
    setFormSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ① Sticky Header */}
      <header className="site-header">
        <div className="container nav-container">
          <a href="#" className="brand-logo">
            <div className="logo-symbol">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="logo-red-dot"></span>
            </div>
            <div className="logo-text-wrap">
              <span className="logo-title">
                e-GP<span style={{ color: 'var(--color-ink)' }}> Tender BD</span>
              </span>
              <span className="logo-subtitle">Tender Consulting & Support</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav>
            <ul className="nav-menu">
              <li><a href="#hero" className="nav-link active">Home</a></li>
              <li><a href="#process" className="nav-link">The Process</a></li>
              <li><a href="#services" className="nav-link">Services</a></li>
              <li><a href="#about" className="nav-link">About Us</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Button
              variant="red"
              size="md"
              onClick={() => handleOpenModal()}
              id="header-cta-btn"
            >
              Get Tender Support ▸
            </Button>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{ background: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '1.25rem 1.5rem' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#hero" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#process" className="nav-link" onClick={() => setMobileMenuOpen(false)}>The Process</a></li>
              <li><a href="#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
              <li><a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About Us</a></li>
              <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
              <li style={{ paddingTop: '0.5rem' }}>
                <Button variant="red" size="md" style={{ width: '100%' }} onClick={() => { setMobileMenuOpen(false); handleOpenModal(); }}>
                  Get Tender Support ▸
                </Button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* ② Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-pattern"></div>
        <div className="container hero-grid">
          {/* Left Column */}
          <div>
            <div className="hero-pill">
              <span className="hero-pill-dot"></span>
              Professional e-GP Support, Bangladesh
            </div>

            <h1 className="hero-h1">
              Make Every Submission <span className="yellow-underline">Count</span>.
            </h1>

            <p className="hero-desc">
              Professional e-GP registration, thorough document preparation, and error-free tender submission for contractors and suppliers across Bangladesh. No missed deadlines, zero technical disqualifications.
            </p>

            <div className="hero-actions">
              <Button
                variant="red"
                size="lg"
                onClick={() => handleOpenModal()}
                id="hero-cta-support"
              >
                Get Tender Support ▸
              </Button>
              <a
                href="#services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 1.6rem',
                  borderRadius: '9999px',
                  color: 'var(--color-green)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '1.5px solid var(--color-green)',
                  background: '#FFFFFF'
                }}
              >
                Explore Services
              </a>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckStamp size="sm" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-ink)' }}>CPTU Guidelines Compliant</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckStamp size="sm" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-ink)' }}>Strict Confidentiality</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tender Readiness Mockup Card */}
          <div className="readiness-card-wrapper">
            {/* Floating Yellow Deadline Chip */}
            <div className="floating-deadline-chip">
              <Clock size={14} />
              <span>Next Deadline: 3 Days Left</span>
            </div>

            <div className="readiness-card">
              <div className="readiness-header">
                <div className="readiness-title">
                  <FileText size={20} style={{ color: 'var(--color-green)' }} />
                  <span>Tender Readiness Audit</span>
                </div>
                <Badge variant="green" dot>Active Verification</Badge>
              </div>

              <div style={{ marginBottom: '1rem', fontSize: '0.82rem', color: 'var(--color-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Tender ID: <strong>948201 (RHD)</strong></span>
                <span>Type: <strong>OTM Works</strong></span>
              </div>

              <ul className="readiness-checklist">
                {readinessSteps.map((step, idx) => {
                  const isDone = checkedItems.includes(idx);
                  return (
                    <li key={idx} className={`readiness-item ${isDone ? 'done' : ''}`}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: isDone ? 'var(--color-green)' : '#E3EBE7',
                          color: '#FFFFFF',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 700
                        }}>
                          {isDone ? '✓' : idx + 1}
                        </span>
                        {step}
                      </span>
                      {isDone && (
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-green)' }}>
                          PASSED
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="readiness-progress-box">
                <div className="readiness-progress-header">
                  <span>SUBMISSION READINESS STATUS</span>
                  <span style={{ color: 'var(--color-green)', fontWeight: 800 }}>
                    {checkedItems.length * 20}% Complete
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${checkedItems.length * 20}%` }}
                  ></div>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                  Assisted by dedicated e-GP bid compliance specialist.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ③ Trust Metrics Green Band */}
      <section className="trust-metrics-band">
        <div className="container">
          <div className="metrics-grid">
            <div className="metric-column">
              <div className="metric-huge-num">9+</div>
              <div className="metric-text">Years of e-GP Experience</div>
            </div>
            <div className="metric-column">
              <div className="metric-huge-num">150+</div>
              <div className="metric-text">Contractor & Supplier Clients</div>
            </div>
            <div className="metric-column">
              <div className="metric-huge-num">32,000+</div>
              <div className="metric-text">Submissions Assisted</div>
            </div>
            <div className="metric-column">
              <div className="metric-huge-num">96%</div>
              <div className="metric-text">Client Retention & Satisfaction</div>
            </div>
            <div className="metric-column">
              <div className="metric-huge-num">55%</div>
              <div className="metric-text">Win Rate Across Tenders*</div>
            </div>
          </div>

          <div className="metrics-footnote">
            *Company-reported statistics based on contractor client submissions from 2017–2026. Individual outcomes depend on procuring entity evaluation criteria, competitor pricing, and tender guidelines.
          </div>
        </div>
      </section>

      {/* ④ Value Proposition: "The Submission Path" Progress Rail */}
      <section id="process" className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="section-head">
            <span className="section-badge-chip">The Submission Path</span>
            <h2 className="section-h2">Your Tender Process, Simplified.</h2>
            <p className="section-subtext">
              We guide you step-by-step through the official procurement lifecycle, turning complex regulatory requirements into a seamless workflow.
            </p>
          </div>

          {/* Progress Rail (Interactive / Visual) */}
          <div className="progress-rail-container">
            <div className="progress-rail">
              <div className="rail-line-back"></div>
              <div
                className="rail-line-fill"
                style={{
                  width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%'
                }}
              ></div>

              {/* Node 1 */}
              <div
                className={`rail-node ${activeStep >= 1 ? 'completed' : ''} ${activeStep === 1 ? 'active' : ''}`}
                onClick={() => setActiveStep(1)}
              >
                <div className="rail-circle">
                  {activeStep > 1 ? '✓' : '1'}
                </div>
                <span className="rail-label">REGISTER</span>
                <span className="rail-step-desc">Portal Onboarding & Document Verification</span>
              </div>

              {/* Node 2 */}
              <div
                className={`rail-node ${activeStep >= 2 ? 'completed' : ''} ${activeStep === 2 ? 'active' : ''}`}
                onClick={() => setActiveStep(2)}
              >
                <div className="rail-circle">
                  {activeStep > 2 ? '✓' : '2'}
                </div>
                <span className="rail-label">PREPARE</span>
                <span className="rail-step-desc">BOQ Estimation & Technical Packaging</span>
              </div>

              {/* Node 3 */}
              <div
                className={`rail-node ${activeStep === 3 ? 'completed' : ''} ${activeStep === 3 ? 'active' : ''}`}
                onClick={() => setActiveStep(3)}
              >
                <div className="rail-circle">
                  {activeStep === 3 ? '✓' : '3'}
                </div>
                <span className="rail-label">SUBMIT</span>
                <span className="rail-step-desc">Sealed Bid Encryption & Receipt Audit</span>
              </div>
            </div>
          </div>

          {/* Step Details Box */}
          <div style={{ maxWidth: '860px', margin: '0 auto', background: 'var(--bg-offwhite)', borderRadius: 'var(--radius-card)', padding: '2rem 2.5rem', border: '1.5px solid var(--color-border)' }}>
            {activeStep === 1 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Badge variant="green">Phase 01: Registration</Badge>
                  <h3 style={{ fontSize: '1.35rem' }}>e-GP Portal Enrollment & Digital Signature Renewal</h3>
                </div>
                <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  Avoid administrative roadblocks before you even bid. We ensure your Trade License, TIN, BIN, NID, bank solvency certificates, and organization profile comply 100% with the official eprocure.gov.bd platform standards.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckStamp size="sm" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>New Organization Enrollment</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckStamp size="sm" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Annual Fee & Bank Mapping</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckStamp size="sm" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>DSC / Token Setup & Support</span>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Badge variant="yellow">Phase 02: Preparation</Badge>
                  <h3 style={{ fontSize: '1.35rem' }}>BOQ Pricing, Technical Forms & Bid Security</h3>
                </div>
                <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  The most critical phase where 70% of tenders face disqualification. Our consultants review tender specifications, prepare competitive BOQ price analyses, audit joint venture agreements, and verify all tender security instruments.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckStamp size="sm" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Tender Schedule & BOQ Analysis</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckStamp size="sm" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Turnover & Experience Matching</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckStamp size="sm" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Bid Security Bank Liaison</span>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Badge variant="green">Phase 03: Submission</Badge>
                  <h3 style={{ fontSize: '1.35rem' }}>Error-Free Sealed Bid Submission & Receipt Verification</h3>
                </div>
                <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  Server lags and last-minute connection failures cause lost bids. Our team submits well in advance, performs dual cryptographic upload verification, and delivers the official e-GP submission acknowledgment receipt.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckStamp size="sm" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>2-Hour Advance Upload Protocol</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckStamp size="sm" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Encrypted Hash Validation</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckStamp size="sm" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Official Submission Certificate</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ⑤ Services (Bento Grid Layout) */}
      <section id="services" className="section-padding" style={{ backgroundColor: 'var(--bg-offwhite)' }}>
        <div className="container">
          <div className="section-head">
            <span className="section-badge-chip">Core Offerings</span>
            <h2 className="section-h2">Tailored e-GP Services for Bidders</h2>
            <p className="section-subtext">
              Comprehensive assistance built around your company&apos;s bidding volume and technical requirements.
            </p>
          </div>

          <div className="bento-grid">
            {/* 01 Registration (Large Bento Card - span 7) */}
            <div className="bento-card bento-card-large">
              <div className="bento-icon-wrapper">
                <Building size={24} />
              </div>
              <span className="bento-card-num">SERVICE 01</span>
              <h3 className="bento-card-title">e-GP Portal Registration & Profile Renewal</h3>
              <p className="bento-card-desc">
                Complete onboarding on the National e-GP portal (eprocure.gov.bd). We handle new company registration, annual renewal fee processing, profile documentation updates, and digital signature token integration.
              </p>
              <ul className="bento-bullet-list">
                <li><CheckStamp size="sm" /> <span>NID, TIN, BIN & Trade License validation</span></li>
                <li><CheckStamp size="sm" /> <span>Bank mapping & payment slip processing</span></li>
                <li><CheckStamp size="sm" /> <span>Fast turnaround (within 24-48 business hours)</span></li>
              </ul>
              <a
                href="#contact"
                className="bento-arrow-link"
                onClick={(e) => { e.preventDefault(); handleOpenModal('e-GP Portal Registration'); }}
              >
                Inquire about Registration <ChevronRight size={16} />
              </a>
            </div>

            {/* 02 Tender Preparation & BOQ Pricing (Tall Bento Card - span 5) */}
            <div className="bento-card bento-card-tall">
              <div className="bento-icon-wrapper">
                <FileCheck size={24} />
              </div>
              <span className="bento-card-num">SERVICE 02</span>
              <h3 className="bento-card-title">Tender Preparation & BOQ Pricing</h3>
              <p className="bento-card-desc">
                Meticulous examination of the Standard Tender Document (STD). We assist with market-rate BOQ analysis, line-item pricing adjustments, and full preparation of technical qualification forms.
              </p>
              <ul className="bento-bullet-list">
                <li><CheckStamp size="sm" /> <span>Accurate BOQ Excel template formulation</span></li>
                <li><CheckStamp size="sm" /> <span>Tender Capacity & Liquid Asset calculation</span></li>
                <li><CheckStamp size="sm" /> <span>Joint Venture (JVCA) agreement drafting</span></li>
                <li><CheckStamp size="sm" /> <span>Litigation history & personnel CV packaging</span></li>
              </ul>
              <a
                href="#contact"
                className="bento-arrow-link"
                onClick={(e) => { e.preventDefault(); handleOpenModal('Tender Preparation & BOQ'); }}
              >
                Inquire about Preparation <ChevronRight size={16} />
              </a>
            </div>

            {/* 03 Tender Submission & Document Verification (span 4) */}
            <div className="bento-card bento-card-med">
              <div className="bento-icon-wrapper">
                <ShieldCheck size={24} />
              </div>
              <span className="bento-card-num">SERVICE 03</span>
              <h3 className="bento-card-title">Sealed Bid Submission</h3>
              <p className="bento-card-desc">
                Secure, dual-verified electronic portal submission well before the bid deadline. Zero risk of gateway timeouts or missed submissions.
              </p>
              <ul className="bento-bullet-list">
                <li><CheckStamp size="sm" /> <span>Pre-closing submission protocol</span></li>
                <li><CheckStamp size="sm" /> <span>Encrypted receipt verification</span></li>
              </ul>
              <a
                href="#contact"
                className="bento-arrow-link"
                onClick={(e) => { e.preventDefault(); handleOpenModal('Sealed Bid Submission'); }}
              >
                Inquire about Submission <ChevronRight size={16} />
              </a>
            </div>

            {/* 04 Post-Bid Evaluation & Consultation (span 4) */}
            <div className="bento-card bento-card-med">
              <div className="bento-icon-wrapper">
                <Scale size={24} />
              </div>
              <span className="bento-card-num">SERVICE 04</span>
              <h3 className="bento-card-title">Tender Audit & Evaluation</h3>
              <p className="bento-card-desc">
                Post-opening bid comparative analysis, clarification response handling, and debriefing support if your bid faced responsiveness issues.
              </p>
              <ul className="bento-bullet-list">
                <li><CheckStamp size="sm" /> <span>Procuring entity query replies</span></li>
                <li><CheckStamp size="sm" /> <span>Comparative competitor pricing review</span></li>
              </ul>
              <a
                href="#contact"
                className="bento-arrow-link"
                onClick={(e) => { e.preventDefault(); handleOpenModal('Tender Audit & Evaluation'); }}
              >
                Inquire about Consultation <ChevronRight size={16} />
              </a>
            </div>

            {/* 05 Custom Training & Capacity Building (span 4) */}
            <div className="bento-card bento-card-med">
              <div className="bento-icon-wrapper">
                <GraduationCap size={24} />
              </div>
              <span className="bento-card-num">SERVICE 05</span>
              <h3 className="bento-card-title">Corporate e-GP Training</h3>
              <p className="bento-card-desc">
                Practical, hands-on training sessions for your in-house engineers, estimators, and procurement officers on live e-GP workflows.
              </p>
              <ul className="bento-bullet-list">
                <li><CheckStamp size="sm" /> <span>Live sandbox bidding practice</span></li>
                <li><CheckStamp size="sm" /> <span>PPR-2008 regulatory guidelines</span></li>
              </ul>
              <a
                href="#contact"
                className="bento-arrow-link"
                onClick={(e) => { e.preventDefault(); handleOpenModal('Corporate e-GP Training'); }}
              >
                Inquire about Training <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ⑥ Differentiator: "More Than Submission Support" */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container diff-grid">
          {/* Sticky Left */}
          <div className="diff-sticky-left">
            <span className="section-badge-chip">The Difference</span>
            <h2 className="section-h2" style={{ marginBottom: '1.25rem' }}>
              More Than Submission Support.
            </h2>
            <p className="section-subtext" style={{ marginBottom: '2rem' }}>
              Most rejections happen not because of pricing, but due to minor clerical oversights, missing annexures, or incorrect formatting. We treat your bid as our own.
            </p>
            <Button
              variant="red"
              size="lg"
              onClick={() => handleOpenModal()}
            >
              Get Tender Support ▸
            </Button>
          </div>

          {/* Right Stacked Cards with CheckStamp */}
          <div className="diff-cards-stack">
            <div className="diff-stack-card">
              <CheckStamp size="lg" />
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-ink)' }}>
                  Clear, Predictable Process
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  No confusion or last-minute panic. From the moment you send us the tender ID, you receive an itemized document checklist, clear timelines, and dedicated liaison until the submission receipt is in your hands.
                </p>
              </div>
            </div>

            <div className="diff-stack-card">
              <CheckStamp size="lg" />
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-ink)' }}>
                  Careful Preparation & Multi-Tier Audit
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Every figure in your BOQ, every experience certificate, and every signature is reviewed by two independent procurement specialists before entering the portal. Zero margin for clerical error.
                </p>
              </div>
            </div>

            <div className="diff-stack-card">
              <CheckStamp size="lg" />
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-ink)' }}>
                  Punctual, Timely Execution
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Government procurement deadlines are strict and irreversible. Our protocol requires completing submissions hours before the portal cutoff time, avoiding network downtime and server congestion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⑦ About Preview (Split Section) */}
      <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-offwhite)' }}>
        <div className="container">
          <div className="about-preview-grid">
            <div className="about-preview-text">
              <span className="section-badge-chip">About Us</span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem' }}>
                Bridging Contractors with Government Tenders
              </h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Founded by former public procurement analysts and senior civil engineers, e-GP Tender BD was created to assist honest contractors in navigating Bangladesh&apos;s electronic procurement ecosystem.
              </p>
              <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
                We work across major procuring entities including RHD, LGED, PWD, BWDB, DPHE, BREB, and CAAB, upholding the highest standards of professional ethics and confidentiality.
              </p>
              <div>
                <Button
                  variant="green"
                  size="md"
                  onClick={() => handleOpenModal('General Inquiry')}
                >
                  Learn More About Our Team ▸
                </Button>
              </div>
            </div>

            <div className="about-preview-dark">
              <div style={{ position: 'relative', zIndex: 2 }}>
                <Badge variant="yellow" style={{ marginBottom: '1.5rem' }}>OUR CORE PHILOSOPHY</Badge>
                <div className="about-big-quote">
                  &ldquo;Make the process <span>clearer</span>. Make preparation <span>easier</span>.&rdquo;
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.75)', marginTop: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Our structured approach eliminates technical disqualification risks, enabling you to focus on competitive pricing and successful contract execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini FAQ Section */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head" style={{ marginBottom: '2.5rem' }}>
            <span className="section-badge-chip">Frequently Asked Questions</span>
            <h2 className="section-h2" style={{ fontSize: '2rem' }}>Common e-GP Questions</h2>
          </div>

          <div className="faq-wrap">
            <div className="faq-card">
              <div className="faq-btn">
                <span>What documents are required for new e-GP registration?</span>
              </div>
              <div className="faq-body">
                You will need an active Trade License, TIN Certificate, BIN/VAT Registration, National ID (NID) of the proprietor or managing director, passport-size photographs, and a valid business bank account solvency certificate.
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-btn">
                <span>Can you submit tenders on our behalf if we are located outside Dhaka?</span>
              </div>
              <div className="faq-body">
                Yes. Since the entire e-GP system is electronic, we serve contractors and business houses all over Bangladesh (Chittagong, Sylhet, Rajshahi, Khulna, etc.) with secure remote coordination.
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-btn">
                <span>Are you affiliated with CPTU or the Government?</span>
              </div>
              <div className="faq-body">
                No. e-GP Tender BD is an independent private tender consulting firm. We provide guidance, document packaging, and submission support to help bidders follow official guidelines, but we are not part of CPTU, BPPA, or any procuring entity.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⑧ Final CTA (Dark Green #0B3D2E) */}
      <section className="final-cta-section">
        <div className="cta-watermark">e-GP</div>
        <div className="container final-cta-content">
          <Badge variant="yellow" style={{ marginBottom: '1.25rem' }}>GET IN TOUCH TODAY</Badge>
          <h2 className="final-cta-title">
            Have a Tender Coming Up?
          </h2>
          <p className="final-cta-desc">
            Let&apos;s get it ready. Send us your tender reference or schedule a consultation with our senior procurement engineers.
          </p>
          <div className="final-cta-btns">
            <Button
              variant="red"
              size="lg"
              onClick={() => handleOpenModal()}
              id="final-cta-btn"
            >
              Get Tender Support ▸
            </Button>
            <a
              href="tel:+8801711000000"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 1.8rem',
                borderRadius: '9999px',
                color: '#FFFFFF',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1.5px solid rgba(255, 255, 255, 0.85)',
                background: 'transparent'
              }}
            >
              <Phone size={16} />
              Call Directly: +880 1711-000000
            </a>
          </div>
        </div>
      </section>

      {/* ⑨ Footer (Deep Green #0B3D2E) */}
      <footer id="contact" className="site-footer">
        <div className="container">
          {/* Prominent Legal Disclaimer Box */}
          <div className="footer-disclaimer-box">
            <strong>OFFICIAL DISCLAIMER:</strong> e-GP Tender BD is an independent private consultancy firm providing business support and documentation services for contractors. We are <strong>NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with</strong> CPTU (Central Procurement Technical Unit), BPPA (Bangladesh Public Procurement Authority), or the Government of Bangladesh. Official electronic government procurement is conducted solely at <a href="https://www.eprocure.gov.bd" target="_blank" rel="noreferrer" style={{ color: 'var(--color-yellow)', textDecoration: 'underline' }}>www.eprocure.gov.bd</a>.
          </div>

          <div className="footer-columns">
            {/* Col 1 */}
            <div className="footer-col">
              <div className="brand-logo" style={{ marginBottom: '1rem' }}>
                <div className="logo-symbol">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="logo-red-dot"></span>
                </div>
                <div className="logo-text-wrap">
                  <span className="logo-title" style={{ color: '#FFFFFF' }}>e-GP Tender BD</span>
                  <span className="logo-subtitle" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Submission Support</span>
                </div>
              </div>
              <p>
                Professional e-GP portal registration, tender preparation, BOQ pricing analysis, and electronic submission assistance for contractors across Bangladesh.
              </p>
            </div>

            {/* Col 2 */}
            <div className="footer-col">
              <h5>Quick Links</h5>
              <ul className="footer-link-list">
                <li><a href="#hero">Home</a></li>
                <li><a href="#process">The Submission Path</a></li>
                <li><a href="#services">Our Services</a></li>
                <li><a href="#about">About Our Team</a></li>
                <li><a href="#contact">Contact & Location</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="footer-col">
              <h5>Services</h5>
              <ul className="footer-link-list">
                <li><a href="#services" onClick={() => handleOpenModal('e-GP Portal Registration')}>Portal Registration</a></li>
                <li><a href="#services" onClick={() => handleOpenModal('Tender Preparation & BOQ')}>BOQ Pricing Analysis</a></li>
                <li><a href="#services" onClick={() => handleOpenModal('Sealed Bid Submission')}>Sealed Bid Submission</a></li>
                <li><a href="#services" onClick={() => handleOpenModal('Tender Audit & Evaluation')}>Post-Bid Evaluation</a></li>
                <li><a href="#services" onClick={() => handleOpenModal('Corporate e-GP Training')}>Corporate Training</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="footer-col">
              <h5>Contact Us</h5>
              <p style={{ marginBottom: '0.75rem' }}>
                📍 Suite 804, Concord Tower, Panthapath, Dhaka-1205, Bangladesh
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                📞 <a href="tel:+8801711000000" style={{ color: '#FFFFFF' }}>+880 1711-000000</a>
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                💬 <a href="https://wa.me/8801711000000" target="_blank" rel="noreferrer" style={{ color: '#25D366' }}>WhatsApp Support</a>
              </p>
              <p>
                ✉️ info@egptenderbd.com
              </p>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>
              &copy; {new Date().getFullYear()} e-GP Tender BD. All rights reserved.
            </div>
            <div>
              Independent Private Consulting • Make Every Submission Count
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Action Bar (Call + WhatsApp) */}
      <div className="mobile-sticky-bar">
        <div className="mobile-sticky-actions">
          <a href="tel:+8801711000000" className="btn-mobile-call">
            <Phone size={16} />
            Direct Call
          </a>
          <a href="https://wa.me/8801711000000" target="_blank" rel="noreferrer" className="btn-mobile-whatsapp">
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Interactive Request Support Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setFormSubmitted(false); }}
        maxWidth="540px"
      >
        {formSubmitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#EBF5F1', color: 'var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Check size={36} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-green)', marginBottom: '0.5rem' }}>
              অনুরোধ গ্রহণ করা হয়েছে!
            </h3>
            <p style={{ color: 'var(--color-ink)', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.75rem' }}>
              আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
            </p>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Our senior e-GP procurement specialist will call you shortly on <strong>+880 {formData.phone}</strong>.
            </p>
            <Button
              variant="green"
              size="md"
              onClick={() => { setModalOpen(false); setFormSubmitted(false); }}
            >
              Close Window
            </Button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="section-badge-chip">Direct Inquiry</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-ink)' }}>
                Tell Us About Your Tender
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', marginTop: '4px' }}>
                Fill out this short form and our senior estimators will review your requirements.
              </p>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Md. Rafiqul Islam"
                  className="form-input"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company / Contractor Name</label>
                <input
                  type="text"
                  placeholder="e.g. Islam Builders & Engineering Ltd."
                  className="form-input"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <div className="phone-input-group">
                  <span className="phone-prefix">+880</span>
                  <input
                    type="tel"
                    required
                    placeholder="1711XXXXXX"
                    className="form-input phone-field"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (phoneError) setPhoneError('');
                    }}
                  />
                </div>
                {phoneError && (
                  <p style={{ color: 'var(--color-red)', fontSize: '0.8rem', marginTop: '4px', fontWeight: 600 }}>
                    {phoneError}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Tender ID / Reference (If available)</label>
                <input
                  type="text"
                  placeholder="e.g. 984201 or RHD/DHAKA/2026"
                  className="form-input"
                  value={formData.tenderRef}
                  onChange={(e) => setFormData({ ...formData, tenderRef: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Service Needed *</label>
                <select
                  className="form-select"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="e-GP Portal Registration">e-GP Portal Registration & Renewal</option>
                  <option value="Tender Preparation & BOQ">Tender Preparation & BOQ Pricing Sheet</option>
                  <option value="Sealed Bid Submission">Sealed Bid Portal Submission</option>
                  <option value="Tender Audit & Evaluation">Post-Bid Evaluation & Consultation</option>
                  <option value="Corporate e-GP Training">Corporate Staff e-GP Training</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message / Details</label>
                <textarea
                  rows={3}
                  placeholder="Describe your tender deadline or specific assistance needed..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <Button
                  type="submit"
                  variant="red"
                  size="md"
                  style={{ flex: 1 }}
                  id="modal-send-request-btn"
                >
                  Send Request
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
