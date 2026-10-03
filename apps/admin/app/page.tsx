'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  FileText,
  Users,
  KeyRound,
  Activity,
  Layers,
  Search,
  Bell,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  Building,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ExternalLink,
  Filter
} from 'lucide-react';
import { Button, Badge, Card, StatCard } from '@egp/ui';

interface AdminTender {
  id: string;
  ref: string;
  title: string;
  department: string;
  budget: string;
  submittedDate: string;
  status: 'Pending Review' | 'Published' | 'Rejected' | 'Evaluating';
  riskScore: 'Low' | 'Medium' | 'High';
}

interface Vendor {
  id: string;
  name: string;
  tin: string;
  status: 'Compliant' | 'Auditing' | 'Debarred';
  pastContracts: number;
  antiCollusionRisk: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tenders' | 'vendors' | 'quorum' | 'audit'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Tenders State
  const [tenders, setTenders] = useState<AdminTender[]>([
    {
      id: 't-101',
      ref: 'GOV-2026-081',
      title: 'National Digital Identity Biometric Enclave Upgrade',
      department: 'Ministry of ICT',
      budget: '$14.5M',
      submittedDate: '2026-10-02',
      status: 'Pending Review',
      riskScore: 'Low'
    },
    {
      id: 't-102',
      ref: 'GOV-2026-082',
      title: 'Autonomous Port Gantry Crane Electrification',
      department: 'Maritime Port Authority',
      budget: '$38.0M',
      submittedDate: '2026-10-01',
      status: 'Published',
      riskScore: 'Low'
    },
    {
      id: 't-103',
      ref: 'GOV-2026-083',
      title: 'Pediatric Specialty Hospital Oxygen Plant & Cryo Tanks',
      department: 'Health Services Directorate',
      budget: '$8.2M',
      submittedDate: '2026-09-29',
      status: 'Pending Review',
      riskScore: 'Medium'
    },
    {
      id: 't-104',
      ref: 'GOV-2026-079',
      title: 'Metropolitan Expressway Bridge Seismic Retrofit',
      department: 'Roads & Highways Department',
      budget: '$64.0M',
      submittedDate: '2026-09-25',
      status: 'Evaluating',
      riskScore: 'High'
    }
  ]);

  // Vendors State
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: 'v-1',
      name: 'TransGlobal Engineering Consortium',
      tin: 'TIN-98421034-X',
      status: 'Compliant',
      pastContracts: 14,
      antiCollusionRisk: 4
    },
    {
      id: 'v-2',
      name: 'Vortex Cloud Solutions Inc.',
      tin: 'TIN-44589211-C',
      status: 'Compliant',
      pastContracts: 8,
      antiCollusionRisk: 9
    },
    {
      id: 'v-3',
      name: 'Pinnacle Heavy Industries',
      tin: 'TIN-77341908-A',
      status: 'Auditing',
      pastContracts: 22,
      antiCollusionRisk: 42
    },
    {
      id: 'v-4',
      name: 'Apex Infrastructure Technologies',
      tin: 'TIN-11209843-K',
      status: 'Compliant',
      pastContracts: 31,
      antiCollusionRisk: 2
    }
  ]);

  // Quorum ceremony state
  const [key1Unlocked, setKey1Unlocked] = useState(true);
  const [key2Unlocked, setKey2Unlocked] = useState(false);
  const [quorumDecrypted, setQuorumDecrypted] = useState(false);

  const handleApproveTender = (id: string) => {
    setTenders(prev => prev.map(t => t.id === id ? { ...t, status: 'Published' } : t));
  };

  const handleRejectTender = (id: string) => {
    setTenders(prev => prev.map(t => t.id === id ? { ...t, status: 'Rejected' } : t));
  };

  const toggleVendorStatus = (id: string) => {
    setVendors(prev => prev.map(v => {
      if (v.id === id) {
        const nextStatus = v.status === 'Compliant' ? 'Auditing' : v.status === 'Auditing' ? 'Debarred' : 'Compliant';
        return { ...v, status: nextStatus };
      }
      return v;
    }));
  };

  const filteredTenders = tenders.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="admin-badge">
            <Lock size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.2 }}>eGP Operations</h2>
            <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>ADMIN PORTAL v4.2</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-category">Command Overview</span>
          <button 
            className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            id="nav-overview"
          >
            <Activity size={17} />
            Executive Cockpit
          </button>

          <span className="nav-category">Procurement Management</span>
          <button 
            className={`sidebar-item ${activeTab === 'tenders' ? 'active' : ''}`}
            onClick={() => setActiveTab('tenders')}
            id="nav-tenders"
          >
            <FileText size={17} />
            Solicitations & RFPs
            <span style={{ marginLeft: 'auto', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--primary)', padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>
              {tenders.filter(t => t.status === 'Pending Review').length}
            </span>
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'vendors' ? 'active' : ''}`}
            onClick={() => setActiveTab('vendors')}
            id="nav-vendors"
          >
            <Users size={17} />
            Vendor Due Diligence
          </button>

          <span className="nav-category">High-Assurance Security</span>
          <button 
            className={`sidebar-item ${activeTab === 'quorum' ? 'active' : ''}`}
            onClick={() => setActiveTab('quorum')}
            id="nav-quorum"
          >
            <KeyRound size={17} />
            Dual-Key Quorum
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => setActiveTab('audit')}
            id="nav-audit"
          >
            <ShieldAlert size={17} />
            Anti-Collusion Radar
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-avatar">AD</div>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Director General
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)' }}></span>
              HSM Authenticated
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Header */}
        <header className="topbar">
          <div className="topbar-search">
            <Search size={15} style={{ color: 'var(--text-dim)' }} />
            <input 
              type="text" 
              placeholder="Search tenders, ref codes, or suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a 
              href="http://localhost:3000" 
              target="_blank" 
              rel="noreferrer"
              className="btn-sm btn-admin-ghost"
              style={{ textDecoration: 'none' }}
            >
              Public Website
              <ExternalLink size={13} />
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 10px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--admin-border)' }}>
              <Bell size={15} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3 System Alerts</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="content-body">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Procurement Command Cockpit</h1>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Real-time supervision of public expenditures, active tenders, and algorithm integrity.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-sm btn-admin-primary" onClick={() => setActiveTab('tenders')}>
                    Review Pending Tenders
                  </button>
                </div>
              </div>

              {/* Shared Stat Cards from @egp/ui */}
              <div className="metrics-row">
                <StatCard
                  title="Active Solicitations"
                  value="42"
                  subText="+8 published this week"
                  subType="positive"
                  icon={<Layers size={16} />}
                />
                <StatCard
                  title="Fiscal Value Under Bid"
                  value="$184.2M"
                  subText="100% Escrow backed"
                  subType="positive"
                  icon={<DollarSign size={16} />}
                />
                <StatCard
                  title="Pending Evaluations"
                  value="12"
                  subText="3 closing today"
                  subType="warning"
                  icon={<FileText size={16} />}
                />
                <StatCard
                  title="Anti-Collusion Flagged"
                  value="1"
                  subText="Anomalous IP cluster detected"
                  subType="danger"
                  icon={<ShieldAlert size={16} />}
                />
              </div>

              {/* Tenders Table */}
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h3 className="panel-title">Tenders Requiring Administrative Approval</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Validate budget allocation, BoQ specifications, and legal declarations.</p>
                  </div>
                </div>

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Ref Code</th>
                      <th>Solicitation Title</th>
                      <th>Procuring Entity</th>
                      <th>Estimated Budget</th>
                      <th>Risk Rating</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenders.map((t) => (
                      <tr key={t.id}>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--primary)' }}>
                          {t.ref}
                        </td>
                        <td style={{ fontWeight: 600 }}>{t.title}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{t.department}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{t.budget}</td>
                        <td>
                          <Badge 
                            variant={t.riskScore === 'Low' ? 'green' : t.riskScore === 'Medium' ? 'yellow' : 'red'}
                            dot
                          >
                            {t.riskScore} Risk
                          </Badge>
                        </td>
                        <td>
                          <Badge 
                            variant={t.status === 'Published' ? 'green' : t.status === 'Pending Review' ? 'yellow' : t.status === 'Rejected' ? 'red' : 'blue'}
                          >
                            {t.status}
                          </Badge>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            {t.status === 'Pending Review' && (
                              <>
                                <Button 
                                  size="sm"
                                  variant="primary"
                                  onClick={() => handleApproveTender(t.id)}
                                  icon={<CheckCircle size={13} />}
                                >
                                  Approve
                                </Button>
                                <Button 
                                  size="sm"
                                  variant="danger"
                                  onClick={() => handleRejectTender(t.id)}
                                  icon={<XCircle size={13} />}
                                />
                              </>
                            )}
                            {t.status !== 'Pending Review' && (
                              <Button size="sm" variant="ghost">Inspect Details</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: TENDERS */}
          {activeTab === 'tenders' && (
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2 className="panel-title">All Procurement Solicitations</h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Filter, inspect, approve or archive government tenders.</p>
                </div>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Procurement Title</th>
                    <th>Ministry / Agency</th>
                    <th>Budget</th>
                    <th>Date Submitted</th>
                    <th>Workflow Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTenders.map(t => (
                    <tr key={t.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>{t.ref}</td>
                      <td style={{ fontWeight: 600 }}>{t.title}</td>
                      <td>{t.department}</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{t.budget}</td>
                      <td>{t.submittedDate}</td>
                      <td>
                        <span className={`badge ${t.status === 'Published' ? 'badge-green' : t.status === 'Pending Review' ? 'badge-yellow' : 'badge-blue'}`}>
                          {t.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button 
                            className="btn-sm btn-admin-ghost"
                            onClick={() => handleApproveTender(t.id)}
                          >
                            Set Published
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: VENDORS */}
          {activeTab === 'vendors' && (
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2 className="panel-title">Vendor Due Diligence Registry</h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Track contractor compliance, beneficial ownership, and sanction status.</p>
                </div>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Vendor Entity</th>
                    <th>Tax Identification Number</th>
                    <th>Completed Contracts</th>
                    <th>Anti-Collusion Risk</th>
                    <th>Compliance Status</th>
                    <th>Toggle State</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map(v => (
                    <tr key={v.id}>
                      <td style={{ fontWeight: 600 }}>{v.name}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{v.tin}</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{v.pastContracts} awarded</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '50px', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${v.antiCollusionRisk * 2}%`, height: '100%', background: v.antiCollusionRisk > 30 ? 'var(--accent-rose)' : 'var(--accent-emerald)' }} />
                          </div>
                          <span style={{ fontSize: '0.78rem', color: v.antiCollusionRisk > 30 ? 'var(--accent-rose)' : 'var(--text-muted)' }}>
                            {v.antiCollusionRisk}%
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${v.status === 'Compliant' ? 'badge-green' : v.status === 'Auditing' ? 'badge-yellow' : 'badge-red'}`}>
                          {v.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn-sm btn-admin-ghost"
                          onClick={() => toggleVendorStatus(v.id)}
                        >
                          Change Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: QUORUM CEREMONY */}
          {activeTab === 'quorum' && (
            <div className="panel" style={{ maxWidth: '800px' }}>
              <div className="panel-header">
                <div>
                  <h2 className="panel-title">Sealed Bid Decryption Key Ceremony</h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Bids remain sealed until a quorum of 2 authorized key-holders insert their private HSM shards.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--admin-border)', textAlign: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: key1Unlocked ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: key1Unlocked ? '#10b981' : 'var(--text-dim)' }}>
                    {key1Unlocked ? <Unlock size={24} /> : <Lock size={24} />}
                  </div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Officer Shard #1</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Tender Evaluation Committee Chair</p>
                  <button 
                    className={`btn-sm ${key1Unlocked ? 'btn-admin-ghost' : 'btn-admin-primary'}`}
                    onClick={() => setKey1Unlocked(!key1Unlocked)}
                  >
                    {key1Unlocked ? 'Shard Active' : 'Insert Private Key'}
                  </button>
                </div>

                <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--admin-border)', textAlign: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: key2Unlocked ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: key2Unlocked ? '#10b981' : 'var(--text-dim)' }}>
                    {key2Unlocked ? <Unlock size={24} /> : <Lock size={24} />}
                  </div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Officer Shard #2</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Anti-Corruption Independent Watchdog</p>
                  <button 
                    className={`btn-sm ${key2Unlocked ? 'btn-admin-ghost' : 'btn-admin-primary'}`}
                    onClick={() => setKey2Unlocked(!key2Unlocked)}
                  >
                    {key2Unlocked ? 'Shard Active' : 'Insert Private Key'}
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--admin-border)' }}>
                {key1Unlocked && key2Unlocked ? (
                  <div>
                    <div style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.75rem', fontWeight: 600 }}>
                      <CheckCircle size={20} />
                      Quorum Threshold Achieved (2/2 Keys Active)
                    </div>
                    <button 
                      className="btn-sm btn-admin-primary" 
                      style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                      onClick={() => setQuorumDecrypted(true)}
                    >
                      Execute Bid Decryption Protocol
                    </button>
                    {quorumDecrypted && (
                      <p style={{ marginTop: '0.75rem', color: '#38bdf8', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                        ✓ 11 Commercial bids decrypted and published to evaluation matrix.
                      </p>
                    )}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                    Awaiting both key shards to enable sealed bid unboxing ceremony.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT */}
          {activeTab === 'audit' && (
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2 className="panel-title">Anti-Collusion & Cartel Radar</h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automated neural anomaly detector scanning pricing rings, submission timing, and device fingerprints.</p>
                </div>
              </div>

              <div style={{ padding: '1rem 1.25rem', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <AlertTriangle size={24} style={{ color: '#fb7185', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#fb7185', fontSize: '0.9rem' }}>Suspicious Bid Pattern Detected in Tender #EGP-2026-889</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Bidder 3 and Bidder 4 submitted proposals within 14 seconds from matching ASN and identical TLS client fingerprints. Automatic anti-collusion audit opened.
                  </p>
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', background: 'rgba(5, 10, 20, 0.8)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--admin-border)' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>[MONITOR] Audit Stream Active • Listening to Event Horizon</div>
                <div style={{ color: 'var(--text-muted)' }}>2026-10-03 16:50:12 | Event: SealedBidSubmitted | Vendor: Apex Infra | Hash: 0xa8f2c... [VALID]</div>
                <div style={{ color: 'var(--text-muted)' }}>2026-10-03 16:51:04 | Event: SealedBidSubmitted | Vendor: Zenith Matrix | Hash: 0x93bd1... [VALID]</div>
                <div style={{ color: 'var(--accent-rose)' }}>2026-10-03 16:51:18 | WARNING: Cluster correlation 0.94 between Zenith & BlueHorizon [FLAGGED]</div>
                <div style={{ color: 'var(--accent-emerald)' }}>2026-10-03 16:52:00 | Event: MerkleRootCommitted | Block #849,203 [CONFIRMED]</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
