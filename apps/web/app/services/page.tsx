'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building, FileText, ShieldCheck, Award, Users, ArrowRight, Check } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LeadModal } from '../../components/LeadModal';
import { StickyMobileBar } from '../../components/StickyMobileBar';

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState('01 — e-GP Registration');

  const openModal = (serviceName: string) => {
    setActiveService(serviceName);
    setModalOpen(true);
  };

  const servicesList = [
    {
      num: '01',
      title: 'e-GP Registration',
      desc: 'Get assistance with e-GP registration, setup and required documentation.',
      icon: <Building size={26} />,
      points: [
        'Complete registration on eprocure.gov.bd',
        'Organization profile documentation audit',
        'Digital signature certificate (token) integration',
        'Annual renewal and fee payment verification'
      ]
    },
    {
      num: '02',
      title: 'Tender Preparation',
      desc: 'Understand requirements and prepare forms, BOQ and supporting documents.',
      icon: <FileText size={26} />,
      points: [
        'Standard Tender Document (STD) thorough review',
        'BOQ pricing spreadsheet formulation & verification',
        'Tender capacity, turnover & liquid asset calculations',
        'Joint Venture (JVCA) agreement packaging'
      ]
    },
    {
      num: '03',
      title: 'Tender Submission',
      desc: 'Get support with final checks, uploads and online e-GP submission.',
      icon: <ShieldCheck size={26} />,
      points: [
        'Pre-closing dual-tier document audit',
        'Tender security & bank guarantee confirmation',
        'Error-free encrypted portal upload',
        'Official submission acknowledgment receipt archiving'
      ]
    },
    {
      num: '04',
      title: 'Consultancy',
      desc: 'Get practical advice for tender and e-GP-related challenges.',
      icon: <Award size={26} />,
      points: [
        'PPR-2008 regulatory compliance review',
        'Post-bid evaluation and clarification response support',
        'Debriefing and technical responsiveness assessment',
        'Procurement risk mitigation advice'
      ]
    },
    {
      num: '05',
      title: 'Training',
      desc: 'Build practical e-GP knowledge within your team.',
      icon: <Users size={26} />,
      points: [
        'Hands-on portal navigation training',
        'BOQ upload and electronic form filling practice',
        'Common rejection reasons and avoidance strategies',
        'Sessions customized for management and estimators'
      ]
    }
  ];

  return (
    <div>
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Hero */}
      <section style={{ padding: '5rem 0 3.5rem', background: 'linear-gradient(180deg, #FFFFFF 0%, var(--bg-canvas) 100%)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <span className="pill-badge pill-green" style={{ marginBottom: '1rem' }}>
            OUR SERVICE OFFERINGS
          </span>
          <h1 style={{ fontSize: '3.2rem', color: 'var(--green-deep)', marginBottom: '1.25rem' }}>
            e-GP Support, Built Around Your Process.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
            Practical guidance, meticulous documentation, and reliable execution for contractors and businesses participating in Bangladesh government procurement.
          </p>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {servicesList.map((svc) => (
              <div
                key={svc.num}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2.5rem 3rem',
                  boxShadow: 'var(--shadow-card)',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '2rem',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--green-soft)',
                  color: 'var(--green-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-sans)'
                }}>
                  {svc.num}
                </div>

                <div>
                  <h2 style={{ fontSize: '1.75rem', color: 'var(--green-deep)', marginBottom: '0.5rem' }}>
                    {svc.num} — {svc.title}
                  </h2>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {svc.desc}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                    {svc.points.map((pt, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-headline)', fontWeight: 500 }}>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => openModal(`${svc.num} — ${svc.title}`)}
                    className="btn-red"
                    style={{ fontSize: '0.9rem', padding: '0.65rem 1.4rem' }}
                  >
                    Request Support for {svc.title} ▸
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
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
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={activeService}
      />
    </div>
  );
}
