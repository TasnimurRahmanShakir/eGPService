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

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    tenderRef: '',
    service: 'Tender Preparation & Submission',
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
      setPhoneError('Please enter a valid 10-11 digit mobile number (e.g. 01886-970197)');
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
          <h1 className="contact-simple-title">Contact Us</h1>
          <p className="contact-simple-subtitle">
            Have questions about an upcoming e-GP tender or need consultation? Reach out to our team directly.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Get Consultation Form */}
      <section className="contact-simple-main section-padding">
        <div className="container">
          <div className="contact-simple-grid">
            {/* Left: Contact Info & Office Map */}
            <div className="contact-simple-info-col">
              <h2 className="contact-info-heading">Get in Touch</h2>
              <p className="contact-info-text">
                Feel free to call, email, or message us on WhatsApp. You can also visit our Dhaka office during working hours.
              </p>

              <div className="contact-info-cards-list">
                {/* Phone */}
                <a href="tel:+8801886970197" className="simple-contact-item">
                  <div className="simple-contact-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="simple-contact-label">Phone</span>
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
                    <span className="simple-contact-label">WhatsApp</span>
                    <span className="simple-contact-val">Chat on WhatsApp</span>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:bdegptender@gmail.com" className="simple-contact-item">
                  <div className="simple-contact-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="simple-contact-label">Email</span>
                    <span className="simple-contact-val">bdegptender@gmail.com</span>
                  </div>
                </a>

                {/* Office */}
                <div className="simple-contact-item">
                  <div className="simple-contact-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="simple-contact-label">Office Location</span>
                    <span className="simple-contact-val">House 6, Road 2/B, Baridhara J Block, Dhaka 1212</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="simple-contact-item">
                  <div className="simple-contact-icon">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="simple-contact-label">Working Hours</span>
                    <span className="simple-contact-val">Saturday — Thursday: 9:00 AM – 7:00 PM</span>
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
                      ধন্যবাদ! আপনার অনুরোধ গ্রহণ করা হয়েছে।
                    </h3>
                    <p className="modal-success-subtitle">
                      আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                    </p>
                    <p className="modal-success-phone-note">
                      Our tender consulting team will call you shortly at <strong>+880 {formData.phone}</strong> regarding <strong>{formData.service}</strong>.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className="btn-modal-submit" 
                      style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem' }}
                    >
                      Submit Another Request
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
                            placeholder="e.g. Islam Construction &amp; Engineering Ltd."
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
                          rows={3}
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
                          id="contact-send-request-btn"
                          style={{ width: '100%', justifyContent: 'center' }}
                        >
                          <span>Send Request</span>
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
