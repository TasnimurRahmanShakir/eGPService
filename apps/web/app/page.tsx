'use client';

import React, { useState, useId } from 'react';
import {
  ShieldCheck,
  Zap,
  Lock,
  BarChart3,
  Layers,
  FileCheck2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Cpu,
  Building2,
  Activity,
  ArrowRight,
  ExternalLink,
  Sliders,
  Award,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';
import { Button, Badge, Modal } from '@egp/ui';

interface Tender {
  id: string;
  ref: string;
  title: string;
  category: string;
  budget: string;
  bidsCount: number;
  deadlineDays: number;
  status: 'Open' | 'Evaluating' | 'Encrypted';
}

interface Bidder {
  id: string;
  name: string;
  experienceYears: number;
  techScore: number;
  priceBid: number; // in Millions USD
  complianceStatus: '100% Verified' | 'Conditional' | 'Pending Doc';
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'tenders' | 'evaluation' | 'audit'>('tenders');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Interactive Calculator State
  const [annualSpend, setAnnualSpend] = useState<number>(45); // in $M
  const [tenderCount, setTenderCount] = useState<number>(120);
  const [cycleDays, setCycleDays] = useState<number>(40);

  // Dynamic Bid Evaluation Weighting
  const [techWeight, setTechWeight] = useState<number>(60);
  const finWeight = 100 - techWeight;

  // Audit Hash Verification State
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifiedHash, setVerifiedHash] = useState<boolean>(true);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Modal State
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [submittedDemo, setSubmittedDemo] = useState<boolean>(false);

  // Sample Tenders
  const tenders: Tender[] = [
    {
      id: 't-1',
      ref: 'EGP-2026-904',
      title: 'Smart City Urban Optical Fiber Backbone Network',
      category: 'technology',
      budget: '$18.5M',
      bidsCount: 6,
      deadlineDays: 14,
      status: 'Open'
    },
    {
      id: 't-2',
      ref: 'EGP-2026-912',
      title: 'National Health Authority Cloud PACS Diagnostic System',
      category: 'healthcare',
      budget: '$24.2M',
      bidsCount: 9,
      deadlineDays: 8,
      status: 'Open'
    },
    {
      id: 't-3',
      ref: 'EGP-2026-889',
      title: 'High-Speed Rail Electrical Substation Expansion (Phase 3)',
      category: 'infrastructure',
      budget: '$52.0M',
      bidsCount: 4,
      deadlineDays: 2,
      status: 'Evaluating'
    },
    {
      id: 't-4',
      ref: 'EGP-2026-870',
      title: 'Floating Solar Micro-Grid Generation (150 MW)',
      category: 'energy',
      budget: '$31.8M',
      bidsCount: 11,
      deadlineDays: 0,
      status: 'Encrypted'
    }
  ];

  const filteredTenders = categoryFilter === 'all'
    ? tenders
    : tenders.filter(t => t.category === categoryFilter);

  // Bidders for Evaluation Simulator
  const bidders: Bidder[] = [
    {
      id: 'b-1',
      name: 'Apex Infrastructure Technologies',
      experienceYears: 18,
      techScore: 94,
      priceBid: 16.8,
      complianceStatus: '100% Verified'
    },
    {
      id: 'b-2',
      name: 'Vanguard Global Systems Ltd',
      experienceYears: 12,
      techScore: 88,
      priceBid: 15.2,
      complianceStatus: '100% Verified'
    },
    {
      id: 'b-3',
      name: 'Zenith Matrix Engineering',
      experienceYears: 9,
      techScore: 91,
      priceBid: 17.4,
      complianceStatus: '100% Verified'
    },
    {
      id: 'b-4',
      name: 'BlueHorizon Contracting Consortia',
      experienceYears: 15,
      techScore: 79,
      priceBid: 14.1,
      complianceStatus: 'Conditional'
    }
  ];

  // Normalized Financial score: Lower bid gets higher score
  const minPrice = 14.1;
  const scoredBidders = bidders.map(b => {
    const finScore = Math.round((minPrice / b.priceBid) * 100);
    const compositeScore = Math.round((b.techScore * (techWeight / 100)) + (finScore * (finWeight / 100)));
    return {
      ...b,
      finScore,
      compositeScore
    };
  }).sort((a, b) => b.compositeScore - a.compositeScore);

  // Calculate Savings
  const estimatedSavings = (annualSpend * 0.082).toFixed(2);
  const cycleDaysSaved = Math.round(cycleDays * 0.65);
  const auditReductionHours = tenderCount * 45;

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedHash(true);
    }, 600);
  };

  const faqs = [
    {
      q: 'How does Turborepo improve eGP Solution architecture?',
      a: 'Turborepo provides high-performance monorepo caching, unified pipeline orchestration, and atomic task execution. Coupled with pnpm hoisted single node_modules, you eliminate duplicated dependencies, accelerate build times by up to 85%, and maintain strict configuration purity.'
    },
    {
      q: 'How does the single shared node_modules architecture operate?',
      a: 'Configured via .npmrc with node-linker=hoisted, pnpm installs all packages into one shared node_modules directory at the root without nesting redundant copies in packages or apps. This optimizes disk footprint, improves symlink compatibility, and prevents phantom module resolution issues.'
    },
    {
      q: 'How does eGP guarantee tamper-proof tender submissions?',
      a: 'Every tender document, bid submission, and evaluation score is cryptographically hashed with SHA-256 and sealed with dual-key asymmetric encryption until the official opening window. All audit events are written to an append-only verifiable cryptographic log.'
    },
    {
      q: 'Can eGP integrate with national ERP and financial treasury systems?',
      a: 'Yes. eGP provides standardized REST & GraphQL APIs compliant with Open Contracting Data Standard (OCDS), integrating seamlessly with SAP, Oracle Financials, IFMIS, and central bank automated clearing houses.'
    }
  ];

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <header className="header">
        <div className="container nav-wrapper">
          <a href="#" className="logo-group">
            <div className="logo-badge">
              <ShieldCheck size={22} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="logo-text">eGP<span style={{ color: 'var(--primary)' }}>Solution</span></span>
              <span className="logo-tag">Turborepo</span>
            </div>
          </a>

          <ul className="nav-links">
            <li><a href="#features" className="nav-link">Capabilities</a></li>
            <li><a href="#sandbox" className="nav-link">Live Sandbox</a></li>
            <li><a href="#calculator" className="nav-link">ROI Impact</a></li>
            <li><a href="#security" className="nav-link">Compliance</a></li>
            <li><a href="#faq" className="nav-link">Architecture FAQ</a></li>
          </ul>

          <div className="nav-actions">
            <button 
              id="cta-schedule-demo-nav" 
              className="btn btn-primary"
              onClick={() => setShowDemoModal(true)}
            >
              Request Access
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-pill">
            <span className="pill-dot"></span>
            Enterprise & Government Procurement 4.0 Platform
          </div>

          <h1 className="hero-title">
            Transform Procurement with <span className="gradient-text">Speed, Transparency</span> & Cryptographic Integrity
          </h1>

          <p className="hero-subtitle">
            Engineered inside an ultra-lean Turborepo architecture with a single shared node_modules footprint.
            Streamline tenders, automate multi-criteria scoring, and eliminate fraud with real-time auditability.
          </p>

          <div className="hero-ctas">
            <a href="#sandbox" className="btn btn-primary btn-lg" id="hero-btn-explore">
              Explore Live Sandbox
              <Sparkles size={18} />
            </a>
            <button 
              className="btn btn-secondary btn-lg" 
              onClick={() => setShowDemoModal(true)}
              id="hero-btn-demo"
            >
              Schedule Platform Briefing
              <ExternalLink size={16} />
            </button>
          </div>

          {/* Stats Banner */}
          <div className="stats-banner glass-card">
            <div className="stat-item">
              <span className="stat-number gradient-text">$14.2B+</span>
              <span className="stat-label">Procurement Volume Tracked</span>
            </div>
            <div className="stat-item">
              <span className="stat-number gradient-text-emerald">65%</span>
              <span className="stat-label">Faster Bid Evaluation Cycle</span>
            </div>
            <div className="stat-item">
              <span className="stat-number gradient-text">100%</span>
              <span className="stat-label">Tamper-Proof Audit Trail</span>
            </div>
            <div className="stat-item">
              <span className="stat-number gradient-text-emerald">0 ms</span>
              <span className="stat-label">Turborepo Cache Miss on Clean Run</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Interactive Sandbox Preview */}
      <section id="sandbox" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Interactive Environment</span>
            <h2 className="section-title">Test the eGP Operations Center</h2>
            <p className="section-desc">
              Experience the core modules: Real-time public tenders, dynamic algorithm scoring, and tamper-proof cryptographic audit verification.
            </p>
          </div>

          <div className="preview-container">
            <div className="preview-window">
              <div className="window-bar">
                <div className="window-dots">
                  <div className="dot dot-red"></div>
                  <div className="dot dot-yellow"></div>
                  <div className="dot dot-green"></div>
                </div>
                <div className="window-address">
                  <Lock size={12} style={{ color: 'var(--accent-emerald)' }} />
                  https://portal.egp-solution.gov/cockpit/live-session
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>
                  <span className="pill-dot"></span>
                  Active Node: EGP-TURBO-01
                </div>
              </div>

              {/* Tabs */}
              <div className="window-tabs">
                <button 
                  className={`preview-tab-btn ${activeTab === 'tenders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tenders')}
                  id="tab-tenders-btn"
                >
                  <Layers size={16} />
                  Active Tenders Board
                </button>
                <button 
                  className={`preview-tab-btn ${activeTab === 'evaluation' ? 'active' : ''}`}
                  onClick={() => setActiveTab('evaluation')}
                  id="tab-eval-btn"
                >
                  <BarChart3 size={16} />
                  Dynamic Bid Evaluation Matrix
                </button>
                <button 
                  className={`preview-tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
                  onClick={() => setActiveTab('audit')}
                  id="tab-audit-btn"
                >
                  <ShieldCheck size={16} />
                  Cryptographic Audit Trail
                </button>
              </div>

              <div className="window-content">
                {/* TAB 1: ACTIVE TENDERS */}
                {activeTab === 'tenders' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Published Public & Enterprise Solicitations</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Showing official tenders pending closing and sealed bid submission.</p>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {['all', 'infrastructure', 'healthcare', 'technology', 'energy'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            style={{
                              background: categoryFilter === cat ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                              border: categoryFilter === cat ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                              color: categoryFilter === cat ? 'var(--primary)' : 'var(--text-muted)',
                              padding: '4px 12px',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: '0.78rem',
                              textTransform: 'capitalize',
                              cursor: 'pointer'
                            }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="tender-table-wrap">
                      <table className="tender-table">
                        <thead>
                          <tr>
                            <th>Reference ID</th>
                            <th>Procurement Title</th>
                            <th>Estimated Budget</th>
                            <th>Bids Received</th>
                            <th>Time Remaining</th>
                            <th>Encryption Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTenders.map(t => (
                            <tr key={t.id}>
                              <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--primary)' }}>
                                {t.ref}
                              </td>
                              <td style={{ fontWeight: 600 }}>{t.title}</td>
                              <td style={{ fontFamily: 'var(--font-mono)' }}>{t.budget}</td>
                              <td>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  <Users size={14} style={{ color: 'var(--text-dim)' }} />
                                  {t.bidsCount} sealed
                                </span>
                              </td>
                              <td>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: t.deadlineDays <= 3 ? '#f87171' : 'var(--text-muted)' }}>
                                  <Clock size={14} />
                                  {t.deadlineDays === 0 ? 'Closed' : `${t.deadlineDays} days`}
                                </span>
                              </td>
                              <td>
                                <span className={`status-badge ${t.status === 'Open' ? 'live' : t.status === 'Evaluating' ? 'review' : 'encrypted'}`}>
                                  {t.status === 'Open' ? 'Sealing Active' : t.status === 'Evaluating' ? 'Under AI Review' : 'Dual-Key Encrypted'}
                                </span>
                              </td>
                              <td>
                                <button 
                                  className="btn btn-secondary" 
                                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                                  onClick={() => setActiveTab('evaluation')}
                                >
                                  View Matrix
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 2: DYNAMIC EVALUATION MATRIX */}
                {activeTab === 'evaluation' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Smart Multi-Criteria Scoring Simulation</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Adjust the weighting slider below. Notice how the composite score and recommended vendor re-calculate in real time.
                        </p>
                      </div>

                      <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', minWidth: '280px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                          <span>Technical Weight: <strong style={{ color: 'var(--primary)' }}>{techWeight}%</strong></span>
                          <span>Financial: <strong style={{ color: 'var(--accent-emerald)' }}>{finWeight}%</strong></span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="80"
                          value={techWeight}
                          onChange={(e) => setTechWeight(Number(e.target.value))}
                          className="custom-range"
                          id="weight-slider"
                        />
                      </div>
                    </div>

                    <div className="tender-table-wrap">
                      <table className="tender-table">
                        <thead>
                          <tr>
                            <th>Rank</th>
                            <th>Bidder Entity</th>
                            <th>Technical Score ({techWeight}%)</th>
                            <th>Commercial Bid</th>
                            <th>Compliance Check</th>
                            <th>Composite Index</th>
                            <th>Evaluation Recommendation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scoredBidders.map((b, idx) => (
                            <tr key={b.id} style={{ background: idx === 0 ? 'rgba(56, 189, 248, 0.12)' : undefined }}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  {idx === 0 ? (
                                    <Award size={18} style={{ color: '#fbbf24' }} />
                                  ) : (
                                    <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>#{idx + 1}</span>
                                  )}
                                </div>
                              </td>
                              <td style={{ fontWeight: 600 }}>
                                {b.name}
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 400 }}>
                                  {b.experienceYears} yrs verified public sector credentials
                                </div>
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ width: '60px', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${b.techScore}%`, height: '100%', background: 'var(--primary)' }} />
                                  </div>
                                  <span style={{ fontFamily: 'var(--font-mono)' }}>{b.techScore}/100</span>
                                </div>
                              </td>
                              <td style={{ fontFamily: 'var(--font-mono)' }}>${b.priceBid.toFixed(1)}M</td>
                              <td>
                                <span className={`status-badge ${b.complianceStatus === '100% Verified' ? 'live' : 'review'}`}>
                                  {b.complianceStatus}
                                </span>
                              </td>
                              <td>
                                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: idx === 0 ? 'var(--accent-emerald)' : 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                                  {b.compositeScore.toFixed(1)}
                                </span>
                              </td>
                              <td>
                                {idx === 0 ? (
                                  <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    <CheckCircle2 size={14} /> Preferred Awardee
                                  </span>
                                ) : (
                                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                                    Contender
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 3: CRYPTOGRAPHIC AUDIT */}
                {activeTab === 'audit' && (
                  <div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Immutable Cryptographic Verification</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        All bids and evaluation decisions are sealed with SHA-256 state hashes preventing retrospective manipulation.
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                      <div style={{ background: 'rgba(5, 10, 20, 0.7)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                        <div style={{ color: 'var(--text-dim)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                          <span>LATEST TENDER LEDGER BLOCK #849,203</span>
                          <span style={{ color: 'var(--accent-emerald)' }}>● SYNCHRONIZED</span>
                        </div>
                        <div style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                          ROOT_MERKLE_HASH: 0x9f8e4b7a1239c09d8e7f12345bcdef0192837465aaeeff0918273645bbcd
                        </div>
                        <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          PREV_BLOCK: 0x3d2c1b0a9f8e7d6c5b4a392817263544ffaabbcc11223344556677889900aabb
                        </div>
                        <div style={{ color: '#cbd5e1' }}>
                          TIMESTAMP: 2026-10-03T16:48:22.091Z [UTC] | ALGORITHM: SHA-256-DUAL-KEY
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(15, 23, 42, 0.4)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                        <button
                          className="btn btn-emerald"
                          onClick={handleVerify}
                          disabled={isVerifying}
                          id="btn-verify-hash"
                          style={{ width: '100%', marginBottom: '0.75rem' }}
                        >
                          {isVerifying ? 'Hashing Ledger...' : 'Validate Integrity Hash'}
                        </button>
                        {verifiedHash && !isVerifying && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#34d399', fontWeight: 600 }}>
                            <ShieldCheck size={16} />
                            Cryptographically Validated
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section id="features" className="section" style={{ background: 'rgba(8, 13, 26, 0.5)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">High-Assurance Infrastructure</span>
            <h2 className="section-title">Built for Complex Public & Corporate Sourcing</h2>
            <p className="section-desc">
              Eliminate bureaucracy, prevent collusive behavior, and accelerate tender lifecycles with intelligent automated guardrails.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon-box icon-blue">
                <FileCheck2 size={26} />
              </div>
              <h3 className="feature-title">Smart Solicitation Drafting</h3>
              <p className="feature-desc">
                AI-guided tender specification builder conforming to international procurement guidelines (FIDIC, World Bank, UNCITRAL).
              </p>
              <ul className="feature-list">
                <li><CheckCircle2 size={15} /> Automated clause verification</li>
                <li><CheckCircle2 size={15} /> Bill of Quantities (BoQ) auto-parsers</li>
                <li><CheckCircle2 size={15} /> Standardized e-noticing dissemination</li>
              </ul>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-box icon-emerald">
                <Lock size={26} />
              </div>
              <h3 className="feature-title">Sealed Bid Cryptography</h3>
              <p className="feature-desc">
                Submissions remain mathematically unreadable until the tender closing second, secured with dual-key asymmetric threshold cryptography.
              </p>
              <ul className="feature-list">
                <li><CheckCircle2 size={15} /> Zero-knowledge submission seals</li>
                <li><CheckCircle2 size={15} /> Quorum-based key release mechanisms</li>
                <li><CheckCircle2 size={15} /> Anti-tamper digital signatures</li>
              </ul>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-box icon-violet">
                <Cpu size={26} />
              </div>
              <h3 className="feature-title">Anti-Collusion AI Engine</h3>
              <p className="feature-desc">
                Real-time pattern recognition across bidder metadata, price clusters, submission timestamps, and IP origins to detect cartels.
              </p>
              <ul className="feature-list">
                <li><CheckCircle2 size={15} /> Beneficial ownership cross-checking</li>
                <li><CheckCircle2 size={15} /> Statistical bid rigging anomaly alerts</li>
                <li><CheckCircle2 size={15} /> Historical bidding collusion graphs</li>
              </ul>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-box icon-amber">
                <TrendingUp size={26} />
              </div>
              <h3 className="feature-title">Smart Milestone Payments</h3>
              <p className="feature-desc">
                Link contract milestones to verification workflows. Release contractor tranches with instant automated treasury approvals.
              </p>
              <ul className="feature-list">
                <li><CheckCircle2 size={15} /> Automated retention guarantees</li>
                <li><CheckCircle2 size={15} /> Geo-tagged site progress validation</li>
                <li><CheckCircle2 size={15} /> Direct Central Bank clearing integration</li>
              </ul>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-box icon-blue">
                <Building2 size={26} />
              </div>
              <h3 className="feature-title">Vendor Due Diligence Registry</h3>
              <p className="feature-desc">
                Unified vendor repository with automatic synchronization against tax records, social security clearance, and sanctions lists.
              </p>
              <ul className="feature-list">
                <li><CheckCircle2 size={15} /> Real-time debarment list checking</li>
                <li><CheckCircle2 size={15} /> ISO & financial audit verification</li>
                <li><CheckCircle2 size={15} /> Performance rating index tracking</li>
              </ul>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-box icon-emerald">
                <Zap size={26} />
              </div>
              <h3 className="feature-title">Turborepo High-Performance Core</h3>
              <p className="feature-desc">
                Zero overhead architecture with unified dependencies and instant builds powered by pnpm hoisted single node_modules.
              </p>
              <ul className="feature-list">
                <li><CheckCircle2 size={15} /> Single shared node_modules footprint</li>
                <li><CheckCircle2 size={15} /> Remote pipeline task caching</li>
                <li><CheckCircle2 size={15} /> Zero phantom dependency hazards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Savings & ROI Calculator */}
      <section id="calculator" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Value Realization</span>
            <h2 className="section-title">Calculate Your Efficiency & Cost Dividends</h2>
            <p className="section-desc">
              Estimate quantifiable fiscal savings and throughput improvements achieved by digitizing your procurement pipeline.
            </p>
          </div>

          <div className="calc-card">
            <div className="calc-grid">
              <div>
                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-label">Annual Procurement Budget</span>
                    <span className="slider-val">${annualSpend} Million USD</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={annualSpend}
                    onChange={(e) => setAnnualSpend(Number(e.target.value))}
                    className="custom-range"
                    id="slider-spend"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-label">Annual Tenders / RFPs Processed</span>
                    <span className="slider-val">{tenderCount} Tenders</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="500"
                    step="10"
                    value={tenderCount}
                    onChange={(e) => setTenderCount(Number(e.target.value))}
                    className="custom-range"
                    id="slider-tenders"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-label">Current Average Evaluation Cycle</span>
                    <span className="slider-val">{cycleDays} Days</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="90"
                    step="5"
                    value={cycleDays}
                    onChange={(e) => setCycleDays(Number(e.target.value))}
                    className="custom-range"
                    id="slider-days"
                  />
                </div>
              </div>

              <div className="calc-results-box">
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Projected Annual Fiscal Savings
                </span>
                <div className="calc-result-number">${estimatedSavings}M</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>CYCLE REDUCTION</span>
                    <strong style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>{cycleDaysSaved} Days</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Faster per tender</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>AUDIT HOURS SAVED</span>
                    <strong style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>{auditReductionHours.toLocaleString()} hrs</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Annual staff productivity</span>
                  </div>
                </div>

                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '1.5rem' }}
                  onClick={() => setShowDemoModal(true)}
                >
                  Download Full Economic Impact Model
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Standards */}
      <section id="security" className="section" style={{ background: 'rgba(8, 13, 26, 0.6)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Compliance Standards</span>
            <h2 className="section-title">Government-Grade Security Protocols</h2>
            <p className="section-desc">
              Engineered to meet the most rigorous international cybersecurity and open public procurement frameworks.
            </p>
          </div>

          <div className="security-grid">
            <div className="security-card">
              <ShieldCheck size={32} style={{ color: 'var(--primary)', marginBottom: '0.75rem' }} />
              <h4>ISO/IEC 27001</h4>
              <p>Information Security Management System certified for critical national data.</p>
            </div>
            <div className="security-card">
              <Lock size={32} style={{ color: 'var(--accent-emerald)', marginBottom: '0.75rem' }} />
              <h4>SOC 2 Type II</h4>
              <p>Independently verified security, availability, and confidential handling controls.</p>
            </div>
            <div className="security-card">
              <Activity size={32} style={{ color: 'var(--secondary)', marginBottom: '0.75rem' }} />
              <h4>OCDS Compliant</h4>
              <p>Open Contracting Data Standard schema implementation for full public scrutiny.</p>
            </div>
            <div className="security-card">
              <Cpu size={32} style={{ color: 'var(--accent-amber)', marginBottom: '0.75rem' }} />
              <h4>eIDAS & FIPS 140-3</h4>
              <p>Qualified electronic signatures and tamper-resistant cryptographic HSM support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Technical Knowledge</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">
              Learn more about our single shared node_modules architecture, Turborepo design, and operational integrity.
            </p>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  id={`faq-btn-${idx}`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openFaq === idx ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      color: openFaq === idx ? 'var(--primary)' : 'var(--text-dim)'
                    }}
                  />
                </button>
                {openFaq === idx && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo-group">
                <div className="logo-badge">
                  <ShieldCheck size={20} />
                </div>
                <span className="logo-text">eGP<span style={{ color: 'var(--primary)' }}>Solution</span></span>
              </div>
              <p>
                The next-generation electronic government procurement platform built with Next.js 15, pnpm, and Turborepo monorepo architecture.
              </p>
            </div>

            <div className="footer-col">
              <h5>Platform</h5>
              <ul className="footer-links">
                <li><a href="#sandbox">Tender Sandbox</a></li>
                <li><a href="#features">Evaluation Matrix</a></li>
                <li><a href="#security">Cryptographic Seals</a></li>
                <li><a href="#calculator">ROI Modeling</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Architecture</h5>
              <ul className="footer-links">
                <li><a href="#faq">Turborepo Pipeline</a></li>
                <li><a href="#faq">Single Node Modules</a></li>
                <li><a href="#faq">pnpm Workspaces</a></li>
                <li><a href="#faq">Zero Duplicate Modules</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Compliance</h5>
              <ul className="footer-links">
                <li><a href="#security">ISO 27001 Certified</a></li>
                <li><a href="#security">OCDS Open Data</a></li>
                <li><a href="#security">eIDAS Signatures</a></li>
                <li><a href="#security">SOC 2 Type II</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              &copy; {new Date().getFullYear()} eGP Solution. All rights reserved.
            </div>
            <div className="uptime-badge">
              <span className="pill-dot"></span>
              99.99% Systems Operational • Turborepo Validated
            </div>
          </div>
        </div>
      </footer>

      {/* Shared Modal from @egp/ui */}
      <Modal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        maxWidth="500px"
      >
        {submittedDemo ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#10b981' }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem', color: '#f8fafc' }}>Briefing Request Dispatched</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
              Our public sector procurement solutions team will provide an architectural walkthrough tailored to your agency.
            </p>
            <Button variant="primary" onClick={() => { setShowDemoModal(false); setSubmittedDemo(false); }}>
              Close Window
            </Button>
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: '#f8fafc' }}>Request Platform Sandbox Briefing</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Schedule a private session to evaluate the eGP Solution engine and Turborepo architecture.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setSubmittedDemo(true); }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Agency / Corporate Entity Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ministry of Digital Infrastructure"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Official Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="director@agency.gov"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Primary Scope
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: '#0d1527',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                >
                  <option>National E-Procurement Transformation</option>
                  <option>Enterprise Sourcing & Sealed Bidding</option>
                  <option>Automated Due Diligence & Vendor Scoring</option>
                  <option>Audit Trail & OCDS Compliance</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button type="submit" variant="primary" style={{ flex: 1 }} id="modal-submit-btn">
                  Confirm Schedule
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setShowDemoModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </main>
  );
}
