'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Check, 
  ArrowRight, 
  ChevronDown 
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { StickyMobileBar } from '../../components/StickyMobileBar';
import { LeadModal } from '../../components/LeadModal';
import { useLanguage } from '../../context/LanguageContext';

export default function ContactPage() {
  const { t, lang } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    tenderRef: '',
    service: '',
    message: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const servicesList = t.contactPage.servicesList;

  // Set default service when servicesList is loaded or empty
  useEffect(() => {
    if (!formData.service && servicesList.length > 1) {
      setFormData((prev) => ({ ...prev, service: servicesList[1] }));
    }
  }, [servicesList, formData.service]);

  // Close dropdown on outside click
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

  return (
    <div className="page-wrapper">
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Clean Simple Header */}
      <section className="contact-simple-hero">
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <h1 className="contact-simple-title">{t.contactPage.heroTitle}</h1>
          <p className="contact-simple-subtitle">
            {t.contactPage.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content: Info & Get Consultation Form */}
      <section className="contact-simple-main section-padding">
        <div className="container">
          <div className="contact-simple-grid">
            {/* Left: Contact Info & Office Map */}
            <div className="contact-simple-info-col">
              <h2 className="contact-info-heading">{t.contactPage.getInTouch}</h2>
              <p className="contact-info-text">
                {t.contactPage.getInTouchDesc}
              </p>

              <div className="contact-info-cards-list">
                {/* Phone */}
                <a href="tel:+8801886970197" className="simple-contact-item">
                  <div className="simple-contact-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="simple-contact-label">{t.contactPage.labelPhone}</span>
                    <span className="simple-contact-val">+880 1886-970197</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/8801886970197?text=Hello%20e-GP%20Tender%20BD,%20I%20need%20assistance%20with%20a%20tender" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="simple-contact-item item-whatsapp"
                >
                  <div className="simple-contact-icon icon-wa">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <span className="simple-contact-label">{t.contactPage.labelWhatsApp}</span>
                    <span className="simple-contact-val">{t.contactPage.whatsAppChat}</span>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:bdegptender@gmail.com" className="simple-contact-item">
                  <div className="simple-contact-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="simple-contact-label">{t.contactPage.labelEmail}</span>
                    <span className="simple-contact-val">bdegptender@gmail.com</span>
                  </div>
                </a>

                {/* Office */}
                <div className="simple-contact-item">
                  <div className="simple-contact-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="simple-contact-label">{t.contactPage.labelOffice}</span>
                    <span className="simple-contact-val">{t.contactPage.officeAddress}</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="simple-contact-item">
                  <div className="simple-contact-icon">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="simple-contact-label">{t.contactPage.labelHours}</span>
                    <span className="simple-contact-val">{t.contactPage.hoursTime}</span>
                  </div>
                </div>
              </div>

              {/* Simple Clean Map */}
              <div className="simple-map-box">
                <iframe
                  title="e-GP Tender BD Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.6482121759654!2d90.4219195!3d23.7955219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f7574b21%3A0xe54d6d671bfca2c2!2sBaridhara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Right: Exact Consultation Form From Get Consultation Modal */}
            <div className="contact-simple-form-col">
              <div className="simple-form-card">
                {submitted ? (
                  <div className="modal-success-state" style={{ padding: '2rem 1rem' }}>
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
                      {t.contactPage.phoneNoteBefore} <strong>+880 {formData.phone}</strong> {t.contactPage.phoneNoteRegarding} <strong>{formData.service}</strong>.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className="btn-modal-submit" 
                      style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem' }}
                    >
                      {t.contactPage.submitAnother}
                    </button>
                  </div>
                ) : (
                  <div className="modal-form-container">
                    <div className="modal-header-block">
                      <div className="eyebrow-pill" style={{ marginBottom: '0.65rem' }}>
                        <span>{t.contactPage.inquiryEyebrow}</span>
                      </div>
                      <h3 className="modal-heading">
                        {t.contactPage.inquiryHeading}
                      </h3>
                      <p className="modal-subheading">
                        {t.contactPage.inquirySubheading}
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
                          rows={3}
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
                          id="contact-send-request-btn"
                          style={{ width: '100%', justifyContent: 'center' }}
                        >
                          <span>{t.leadModal.sendBtn}</span>
                          <ArrowRight size={15} strokeWidth={2.5} />
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onOpenModal={() => setModalOpen(true)} />
      <StickyMobileBar />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
