'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Check, 
  Send, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  Building,
  ExternalLink
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
    service: 'Tender Preparation & Technical Proposal',
    message: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDigits = formData.phone.replace(/\D/g, '');
    if (cleanDigits.length < 10 || cleanDigits.length > 11) {
      setPhoneError('Please enter a valid 10-11 digit Bangladesh mobile number (e.g. 01886-970197)');
      return;
    }
    setPhoneError('');
    setIsSubmitting(true);

    // Simulate fast dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="page-wrapper">
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Hero Header */}
      <section className="contact-page-hero">
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <span className="pill-badge pill-green" style={{ marginBottom: '1.25rem' }}>
            <MessageSquare size={13} style={{ marginRight: '6px' }} />
            DIRECT TENDER LIAISON
          </span>
          <h1 className="page-hero-title">
            Let&apos;s Discuss Your Upcoming Tender
          </h1>
          <p className="page-hero-sub">
            Have a tender coming up or need urgent assistance with e-GP documentation, BOQ pricing, or portal upload? Reach our senior engineering consultants directly.
          </p>
        </div>
      </section>

      {/* Quick Action Contact Cards */}
      <section className="contact-quick-cards-section">
        <div className="container">
          <div className="contact-cards-grid">
            {/* Phone Card */}
            <a href="tel:+8801886970197" className="contact-quick-card">
              <div className="contact-card-icon-wrap">
                <Phone size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-subtitle">Direct Telephone</span>
                <span className="contact-card-title">+880 1886-970197</span>
                <span className="contact-card-desc">Sat - Thu: 9 AM - 7 PM</span>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/8801886970197?text=Hello%20e-GP%20Tender%20BD,%20I%20need%20assistance%20with%20a%20tender" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-quick-card highlight-whatsapp"
            >
              <div className="contact-card-icon-wrap whatsapp-icon">
                <MessageSquare size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-subtitle">Instant Messaging</span>
                <span className="contact-card-title">WhatsApp Chat</span>
                <span className="contact-card-desc">Rapid Response within 15 mins</span>
              </div>
            </a>

            {/* Email Card */}
            <a href="mailto:bdegptender@gmail.com" className="contact-quick-card">
              <div className="contact-card-icon-wrap">
                <Mail size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-subtitle">Official Inquiries</span>
                <span className="contact-card-title">bdegptender@gmail.com</span>
                <span className="contact-card-desc">Send specifications &amp; BOQ</span>
              </div>
            </a>

            {/* Office Location Card */}
            <div className="contact-quick-card">
              <div className="contact-card-icon-wrap">
                <MapPin size={22} />
              </div>
              <div className="contact-card-content">
                <span className="contact-card-subtitle">Dhaka Office</span>
                <span className="contact-card-title">Baridhara J Block</span>
                <span className="contact-card-desc">House 6, Road 2/B, Dhaka 1212</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Section */}
      <section className="section-padding bg-subtle">
        <div className="container">
          <div className="contact-main-grid">
            {/* Left Column: Office Details, Map & Guarantees */}
            <div className="contact-details-col">
              <div className="contact-details-box">
                <span className="pill-badge pill-gold" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                  HEADQUARTERS &amp; OPERATIONS
                </span>
                <h2 className="contact-box-title">
                  Visit Our Dhaka Office
                </h2>
                <p className="contact-box-desc">
                  Our engineering and procurement analysts work directly with contractors and bidders to review tender security guarantees, pre-qualification criteria, and e-GP portal compliance.
                </p>

                <div className="contact-info-list">
                  <div className="contact-info-row">
                    <div className="info-icon-badge">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="info-row-title">Office Address</div>
                      <div className="info-row-val">
                        House 6, Road 2/B, Baridhara J Block<br />
                        Dhaka 1212, Bangladesh
                      </div>
                    </div>
                  </div>

                  <div className="contact-info-row">
                    <div className="info-icon-badge">
                      <Clock size={18} />
                    </div>
                    <div>
                      <div className="info-row-title">Working Hours</div>
                      <div className="info-row-val">
                        Saturday — Thursday: 9:00 AM – 7:00 PM<br />
                        <span className="text-emerald font-medium">24/7 Emergency e-GP Upload Desk</span> for active tender submissions.
                      </div>
                    </div>
                  </div>

                  <div className="contact-info-row">
                    <div className="info-icon-badge">
                      <Building size={18} />
                    </div>
                    <div>
                      <div className="info-row-title">Official Facebook</div>
                      <div className="info-row-val">
                        <a 
                          href="https://facebook.com/bdegptender" 
                          target="_blank" 
                          rel="noreferrer"
                          className="contact-fb-anchor"
                        >
                          facebook.com/bdegptender
                          <ExternalLink size={12} style={{ marginLeft: '4px', display: 'inline' }} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Box */}
                <div className="contact-map-wrapper">
                  <iframe
                    title="e-GP Tender BD Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.6482121759654!2d90.4219195!3d23.7955219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f7574b21%3A0xe54d6d671bfca2c2!2sBaridhara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                    width="100%"
                    height="220"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Trust Badges */}
                <div className="contact-trust-badges">
                  <div className="trust-badge-item">
                    <ShieldCheck size={18} className="text-emerald" />
                    <span>Strict Bidder Data NDA</span>
                  </div>
                  <div className="trust-badge-item">
                    <Check size={18} className="text-emerald" />
                    <span>PPA 2006 &amp; PPR 2008 Compliant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="contact-form-col">
              <div className="contact-form-box">
                {submitted ? (
                  <div className="contact-success-state">
                    <div className="success-icon-wrap">
                      <Check size={36} strokeWidth={3} />
                    </div>
                    <h3 className="success-title">
                      ধন্যবাদ! আপনার অনুরোধ গ্রহণ করা হয়েছে।
                    </h3>
                    <p className="success-subtitle">
                      আমরা দ্রুত আপনার সাথে যোগাযোগ করব।
                    </p>
                    <p className="success-desc">
                      Our senior tender consultant will call you at <strong>+880 {formData.phone}</strong> to review your tender specifications and deadline.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-dark-pill"
                      style={{ marginTop: '1.5rem' }}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="form-box-header">
                      <span className="pill-badge pill-green" style={{ marginBottom: '0.75rem' }}>
                        FAST RESPONSE FORM
                      </span>
                      <h3 className="form-box-title">
                        Tell Us About Your Tender Requirements
                      </h3>
                      <p className="form-box-subtitle">
                        Fill in your details below and our tender consultants will connect with you within 30 minutes.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="contact-form-body">
                      {/* Name & Company */}
                      <div className="form-two-col-grid">
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
                          <label className="field-label">Company / Contractor Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Islam Engineering &amp; Co."
                            className="field-input"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Phone & Tender ID */}
                      <div className="form-two-col-grid">
                        <div className="field-group">
                          <label className="field-label">Mobile Number *</label>
                          <div className="phone-input-wrap">
                            <span className="phone-prefix">+880</span>
                            <input
                              type="tel"
                              required
                              placeholder="1886-970197"
                              className="field-input field-input-phone"
                              value={formData.phone}
                              onChange={(e) => {
                                setFormData({ ...formData, phone: e.target.value });
                                if (phoneError) setPhoneError('');
                              }}
                            />
                          </div>
                          {phoneError && (
                            <p className="field-error-msg">{phoneError}</p>
                          )}
                        </div>

                        <div className="field-group">
                          <label className="field-label">Tender ID / Ref No.</label>
                          <input
                            type="text"
                            placeholder="e.g. 948201 or RHD/2025"
                            className="field-input"
                            value={formData.tenderRef}
                            onChange={(e) => setFormData({ ...formData, tenderRef: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Service Selection */}
                      <div className="field-group">
                        <label className="field-label">Required Assistance Service *</label>
                        <select
                          className="field-select"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        >
                          <option value="Tender Preparation & Technical Proposal">01 — Full Tender Preparation &amp; Technical Proposal</option>
                          <option value="BOQ Analysis & Financial Rate Pricing">02 — BOQ Analysis &amp; Financial Rate Optimization</option>
                          <option value="e-GP Portal Registration & Setup">03 — New e-GP Registration &amp; Certificate Setup</option>
                          <option value="Final Tender Upload & Submission">04 — Emergency e-GP Upload &amp; Submission</option>
                          <option value="Post-Tender Audit & Evaluation Defense">05 — Evaluation &amp; Contract Award Consultancy</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div className="field-group">
                        <label className="field-label">Message / Project Deadline</label>
                        <textarea
                          rows={4}
                          placeholder="Briefly describe your tender deadline, procuring entity, or specific challenges..."
                          className="field-textarea"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-dark-pill"
                        style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                        id="contact-form-submit-btn"
                      >
                        {isSubmitting ? (
                          <span>Processing...</span>
                        ) : (
                          <>
                            <span>Send Consultation Request</span>
                            <div className="btn-arrow-circle">
                              <Send size={14} />
                            </div>
                          </>
                        )}
                      </button>
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
