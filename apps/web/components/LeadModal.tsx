'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Check, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';
import { Modal } from '@egp/ui';
import { useLanguage } from '../context/LanguageContext';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function LeadModal({ isOpen, onClose, defaultService = 'e-GP Registration' }: LeadModalProps) {
  const { lang, t } = useLanguage();
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

  const servicesList = lang === 'bn' ? [
    'ই-জিপি রেজিস্ট্রেশন',
    'টেন্ডার প্রস্তুতি ও সাবমিশন',
    'লিকুইড অ্যাসেট / লাইন অফ ক্রেডিট',
    'ই-জিপি কনসালটেন্সি',
    'ই-জিপি ট্রেনিং',
    'প্রজেক্ট কস্ট ম্যানেজমেন্ট',
    'ভ্যাট রেজিস্ট্রেশন',
    'ভ্যাট রিটার্ন দাখিল',
    'ট্যাক্স / ই-টিন রেজিস্ট্রেশন',
    'আয়কর রিটার্ন দাখিল'
  ] : [
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
      setPhoneError(t.leadModal.phoneError);
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
            {t.leadModal.success.title}
          </h3>
          <p className="modal-success-subtitle">
            {t.leadModal.success.subtitle}
          </p>
          <p className="modal-success-phone-note">
            {t.leadModal.success.callNote} <strong>+880 {formData.phone}</strong>
          </p>
          <button onClick={handleReset} className="btn-modal-submit" style={{ width: '100%', justifyContent: 'center' }}>
            {t.leadModal.success.closeBtn}
          </button>
        </div>
      ) : (
        <div className="modal-form-container">
          <div className="modal-header-block">
            <div className="eyebrow-pill" style={{ marginBottom: '0.65rem' }}>
              <span>{t.leadModal.eyebrow}</span>
            </div>
            <h3 className="modal-heading">
              {t.leadModal.heading}
            </h3>
            <p className="modal-subheading">
              {t.leadModal.subheading}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="modal-form">
            <div className="modal-form-grid">
              <div className="field-group">
                <label className="field-label">{t.leadModal.fields.fullName}</label>
                <input
                  type="text"
                  required
                  placeholder={t.leadModal.fields.fullNamePlaceholder}
                  className="field-input"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="field-group">
                <label className="field-label">{t.leadModal.fields.company}</label>
                <input
                  type="text"
                  placeholder={t.leadModal.fields.companyPlaceholder}
                  className="field-input"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="field-group">
                <label className="field-label">{t.leadModal.fields.phone}</label>
                <div className="phone-input-wrap">
                  <span className="phone-prefix-badge">+880</span>
                  <input
                    type="tel"
                    required
                    placeholder={t.leadModal.fields.phonePlaceholder}
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
                <label className="field-label">{t.leadModal.fields.tenderRef}</label>
                <input
                  type="text"
                  placeholder={t.leadModal.fields.tenderRefPlaceholder}
                  className="field-input"
                  value={formData.tenderRef}
                  onChange={(e) => setFormData({ ...formData, tenderRef: e.target.value })}
                />
              </div>
            </div>

            {/* Custom Interactive Dropdown */}
            <div className="field-group">
              <label className="field-label">{t.leadModal.fields.serviceRequired}</label>
              <div className="custom-dropdown-wrap" ref={dropdownRef}>
                <button
                  type="button"
                  className={`custom-dropdown-trigger ${dropdownOpen ? 'is-active' : ''}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                >
                  <span className="dropdown-selected-label">{formData.service || t.leadModal.fields.selectService}</span>
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
              <label className="field-label">{t.leadModal.fields.message}</label>
              <textarea
                rows={2}
                placeholder={t.leadModal.fields.messagePlaceholder}
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
                <span>{t.leadModal.sendBtn}</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-modal-cancel"
              >
                {t.leadModal.cancelBtn}
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
