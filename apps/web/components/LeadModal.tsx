'use client';

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Modal } from '@egp/ui';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function LeadModal({ isOpen, onClose, defaultService = 'Tender Preparation' }: LeadModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    tenderRef: '',
    service: defaultService,
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

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} maxWidth="540px">
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <Check size={36} strokeWidth={3} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--green-deep)', marginBottom: '0.5rem' }}>
            ধন্যবাদ! অনুরোধ গ্রহণ করা হয়েছে।
          </h3>
          <p style={{ color: 'var(--text-headline)', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.75rem' }}>
            আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
            Our procurement consulting team will call you shortly at <strong>+880 {formData.phone}</strong>.
          </p>
          <button onClick={handleReset} className="btn-red" style={{ width: '100%' }}>
            Close Window
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="pill-badge pill-green" style={{ marginBottom: '0.5rem' }}>
              DIRECT CONSULTING INQUIRY
            </span>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--green-deep)', marginTop: '0.25rem' }}>
              Tell Us About Your Tender.
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Have a tender coming up or need help with the e-GP process? Send us the details and we&apos;ll help you identify the next step.
            </p>
          </div>

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
                placeholder="e.g. Islam Construction & Engineering"
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
                <option value="e-GP Registration">01 — e-GP Registration & Setup</option>
                <option value="Tender Preparation">02 — Tender Preparation & BOQ</option>
                <option value="Tender Submission">03 — Tender Submission & Upload</option>
                <option value="e-GP Consultancy">04 — e-GP Consultancy</option>
                <option value="e-GP Training">05 — e-GP Corporate Training</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Message</label>
              <textarea
                rows={3}
                placeholder="Briefly describe your tender deadline or specific question..."
                className="field-textarea"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="submit"
                className="btn-red"
                style={{ flex: 1 }}
                id="modal-send-request-btn"
              >
                Send Request
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-outline-green"
                style={{ padding: '0.75rem 1.25rem' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
