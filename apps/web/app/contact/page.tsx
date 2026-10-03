'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Check, Send } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { StickyMobileBar } from '../../components/StickyMobileBar';
import { LeadModal } from '../../components/LeadModal';

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    tenderRef: '',
    service: 'Tender Preparation',
    message: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDigits = formData.phone.replace(/\D/g, '');
    if (cleanDigits.length < 10 || cleanDigits.length > 11) {
      setPhoneError('Please enter a valid 10-11 digit Bangladesh mobile number (e.g. 01886-970197)');
      return;
    }
    setPhoneError('');
    setSubmitted(true);
  };

  return (
    <div>
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Hero */}
      <section style={{ padding: '5rem 0 3.5rem', background: 'linear-gradient(180deg, #FFFFFF 0%, var(--bg-canvas) 100%)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '760px' }}>
          <span className="pill-badge pill-green" style={{ marginBottom: '1rem' }}>
            GET IN TOUCH
          </span>
          <h1 style={{ fontSize: '3.2rem', color: 'var(--green-deep)', marginBottom: '1.25rem' }}>
            Let&apos;s Talk About Your Tender.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
            Have a tender coming up or need help with the e-GP process? Send us the details and we&apos;ll help you identify the next step.
          </p>
        </div>
      </section>

      {/* Main Form & Info Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Contact Information */}
            <div className="contact-info-card">
              <span className="pill-badge pill-gold" style={{ marginBottom: '1.25rem' }}>
                DIRECT OFFICE LIAISON
              </span>
              <h2 style={{ fontSize: '1.85rem', color: 'var(--green-deep)', marginBottom: '1.5rem' }}>
                Contact Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Office Location</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-headline)', marginTop: '2px' }}>
                      e-GP Tender BD
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '2px' }}>
                      House 6, Road 2/B<br />
                      Baridhara J Block<br />
                      Dhaka 1212, Bangladesh
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Direct Telephone</div>
                    <a href="tel:+8801886970197" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--green-primary)', textDecoration: 'none', display: 'block', marginTop: '2px' }}>
                      +880 1886-970197
                    </a>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct line &amp; WhatsApp messaging</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email Inquiries</div>
                    <a href="mailto:bdegptender@gmail.com" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-headline)', textDecoration: 'none', display: 'block', marginTop: '2px' }}>
                      bdegptender@gmail.com
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '1.2rem' }}>
                    f
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Facebook Page</div>
                    <a href="https://facebook.com/bdegptender" target="_blank" rel="noreferrer" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--green-primary)', textDecoration: 'none', display: 'block', marginTop: '2px' }}>
                      facebook.com/bdegptender
                    </a>
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                🕒 <strong>Office Hours:</strong> Saturday to Thursday, 9:00 AM – 7:00 PM. Emergency portal upload assistance available 24/7 for active contract clients.
              </div>
            </div>

            {/* Form */}
            <div className="form-card-container">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                  <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Check size={40} strokeWidth={3} />
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--green-deep)', marginBottom: '0.75rem' }}>
                    ধন্যবাদ! আপনার অনুরোধ গ্রহণ করা হয়েছে।
                  </h3>
                  <p style={{ color: 'var(--text-headline)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                    Our senior tender consultant will call you at <strong>+880 {formData.phone}</strong> to review your specifications.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline-green"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <div>
                  <h2 style={{ fontSize: '1.85rem', color: 'var(--green-deep)', marginBottom: '0.5rem' }}>
                    Tell Us About Your Tender.
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                    Send us your project details or tender ID to schedule immediate bid preparation assistance.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="field-group">
                      <label className="field-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Md. Rafiqul Islam"
                        className="field-input"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Company Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Islam Construction &amp; Engineering"
                        className="field-input"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Phone Number *</label>
                      <div style={{ display: 'flex' }}>
                        <span style={{
                          background: 'var(--bg-canvas)',
                          border: '1.5px solid var(--border-card)',
                          borderRight: 'none',
                          borderTopLeftRadius: '6px',
                          borderBottomLeftRadius: '6px',
                          padding: '0.75rem 0.9rem',
                          fontWeight: 700,
                          color: 'var(--green-primary)',
                          fontSize: '0.95rem',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          +880
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="1886-970197"
                          className="field-input"
                          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (phoneError) setPhoneError('');
                          }}
                        />
                      </div>
                      {phoneError && (
                        <p style={{ color: 'var(--red-action)', fontSize: '0.8rem', marginTop: '4px', fontWeight: 600 }}>
                          {phoneError}
                        </p>
                      )}
                    </div>

                    <div className="field-group">
                      <label className="field-label">Tender / Reference No.</label>
                      <input
                        type="text"
                        placeholder="e.g. Tender ID: 948201 or Memo Ref"
                        className="field-input"
                        value={formData.tenderRef}
                        onChange={(e) => setFormData({ ...formData, tenderRef: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Service Required *</label>
                      <select
                        className="field-select"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="e-GP Registration">01 — e-GP Registration &amp; Setup</option>
                        <option value="Tender Preparation">02 — Tender Preparation &amp; BOQ</option>
                        <option value="Tender Submission">03 — Tender Submission &amp; Upload</option>
                        <option value="e-GP Consultancy">04 — e-GP Consultancy</option>
                        <option value="e-GP Training">05 — e-GP Corporate Training</option>
                      </select>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Message</label>
                      <textarea
                        rows={4}
                        placeholder="Describe your tender deadline or specific assistance needed..."
                        className="field-textarea"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-red"
                      style={{ width: '100%', padding: '0.85rem' }}
                      id="contact-form-submit-btn"
                    >
                      Send Request
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyMobileBar />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
