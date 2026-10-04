'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Check, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';
import { Modal } from '@egp/ui';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function LeadModal({ isOpen, onClose, defaultService = 'e-GP Registration' }: LeadModalProps) {
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const servicesList = [
    'e-GP Registration',
    'Tender Preparation & Submission',
    'Liquid Asset / Line of Credit Preparation',
    'e-GP Consultancy',
    'e-GP Training',
    'Project Cost Management',
    'VAT Registration',
    'VAT Return Submission',
    'Tax Registration',
    'Tax Return Submission'
  ];

  // Sync defaultService when prop changes
  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  // Handle outside click to close custom dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDigits = formData.phone.replace(/\D/g, '');
    if (cleanDigits.length < 10 || cleanDigits.length > 11) {
      setPhoneError('Please enter a valid 10-11 digit mobile number (e.g. 01886-970197)');
      return;
    }
    setPhoneError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setDropdownOpen(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} maxWidth="760px">
      {submitted ? (
        <div className="modal-success-state">
          <div className="modal-success-icon-wrap">
            <Check size={36} strokeWidth={3} />
          </div>
          <h3 className="modal-success-title">
            ধন্যবাদ! আপনার অনুরোধ গ্রহণ করা হয়েছে।
          </h3>
          <p className="modal-success-subtitle">
            আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
          </p>
          <p className="modal-success-phone-note">
            Our tender consulting team will call you shortly at <strong>+880 {formData.phone}</strong> regarding <strong>{formData.service}</strong>.
          </p>
          <button onClick={handleReset} className="btn-modal-submit" style={{ width: '100%', justifyContent: 'center' }}>
            Close Window
          </button>
        </div>
      ) : (
        <div className="modal-form-container">
          <div className="modal-header-block">
            <div className="eyebrow-pill" style={{ marginBottom: '0.65rem' }}>
              <span>DIRECT CONSULTING INQUIRY</span>
            </div>
            <h3 className="modal-heading">
              Tell Us About Your Tender.
            </h3>
            <p className="modal-subheading">
              Have a tender coming up or need help with the e-GP process? Send us the details and our specialists will assist you immediately.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="modal-form">
            <div className="modal-form-grid">
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
                  placeholder="e.g. Islam Construction & Engineering Ltd."
                  className="field-input"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="field-group">
                <label className="field-label">Phone Number *</label>
                <div className="phone-input-wrap">
                  <span className="phone-prefix-badge">+880</span>
                  <input
                    type="tel"
                    required
                    placeholder="1886-970197"
                    className="field-input phone-input-field"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (phoneError) setPhoneError('');
                    }}
                  />
                </div>
                {phoneError && (
                  <p className="field-error-text">
                    {phoneError}
                  </p>
                )}
              </div>

              <div className="field-group">
                <label className="field-label">Tender / Memo Reference (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Tender ID: 948201 or Memo Ref"
                  className="field-input"
                  value={formData.tenderRef}
                  onChange={(e) => setFormData({ ...formData, tenderRef: e.target.value })}
                />
              </div>
            </div>

            {/* Custom Interactive Dropdown */}
            <div className="field-group">
              <label className="field-label">Service Required *</label>
              <div className="custom-dropdown-wrap" ref={dropdownRef}>
                <button
                  type="button"
                  className={`custom-dropdown-trigger ${dropdownOpen ? 'is-active' : ''}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                >
                  <span className="dropdown-selected-label">{formData.service || 'Select a Service'}</span>
                  <ChevronDown size={18} className={`dropdown-chevron ${dropdownOpen ? 'is-rotated' : ''}`} />
                </button>

                {dropdownOpen && (
                  <ul className="custom-dropdown-menu" role="listbox">
                    {servicesList.map((service) => {
                      const isSelected = formData.service === service;
                      return (
                        <li
                          key={service}
                          role="option"
                          aria-selected={isSelected}
                          className={`custom-dropdown-item ${isSelected ? 'is-selected' : ''}`}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, service }));
                            setDropdownOpen(false);
                          }}
                        >
                          <span className="dropdown-item-text">{service}</span>
                          {isSelected && <Check size={16} strokeWidth={2.5} className="dropdown-item-check" />}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Specific Request or Message</label>
              <textarea
                rows={2}
                placeholder="Briefly describe your tender deadline, procurement questions or challenges..."
                className="field-textarea"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <div className="modal-buttons-row">
              <button
                type="submit"
                className="btn-modal-submit"
                id="modal-send-request-btn"
              >
                <span>Send Request</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-modal-cancel"
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
