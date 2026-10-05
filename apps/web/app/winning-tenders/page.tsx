'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Search, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { StickyMobileBar } from '../../components/StickyMobileBar';
import { LeadModal } from '../../components/LeadModal';
import { winningTendersData, WinningTender } from '../../data/winningTenders';

const departmentsList = [
  'All',
  'RHD',
  'PWD',
  'LGED',
  'BWDB',
  'DPHE',
  'EED'
];

export default function WinningTendersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState<string | undefined>();
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTileId, setActiveTileId] = useState<string | null>(null);

  const openModal = (subject?: string) => {
    setModalSubject(subject);
    setModalOpen(true);
  };

  const filteredTenders = useMemo(() => {
    return winningTendersData.filter((tender) => {
      const matchDept = selectedDept === 'All' || tender.departmentShort.toUpperCase() === selectedDept.toUpperCase();
      const query = searchQuery.trim().toLowerCase();
      const matchQuery = 
        !query ||
        tender.projectName.toLowerCase().includes(query) ||
        tender.tenderId.toLowerCase().includes(query) ||
        tender.department.toLowerCase().includes(query) ||
        tender.winningClient.toLowerCase().includes(query) ||
        tender.location.toLowerCase().includes(query);

      return matchDept && matchQuery;
    });
  }, [selectedDept, searchQuery]);

  return (
    <div className="page-wrapper">
      <Navbar onOpenModal={() => openModal()} />

      {/* Hero Header */}
      <section className="winning-page-hero">
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
          <div className="hero-breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Winning Tenders</span>
          </div>

          <h1 className="page-hero-title">
            Winning Tenders &amp; Projects
          </h1>
          <p className="page-hero-sub">
            A comprehensive record of successfully awarded public works tenders and procurement bids managed through our e-GP consultation, technical bid engineering, and submission support across Bangladesh.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section-padding bg-subtle" style={{ minHeight: '600px' }}>
        <div className="container">
          {/* Filter & Search Bar */}
          <div className="winning-filter-bar">
            {/* Department Filter Tabs */}
            <div className="dept-tabs-wrapper">
              {departmentsList.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`dept-tab-btn ${selectedDept === dept ? 'active' : ''}`}
                >
                  {dept === 'All' ? 'All Departments' : dept}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="tender-search-input-wrap">
              <Search size={16} className="tender-search-icon" />
              <input
                type="text"
                placeholder="Search by Tender ID, client, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tender-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="clear-search-btn"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className="results-summary-row">
            <span>Showing <strong>{filteredTenders.length}</strong> verified winning tenders</span>
            {selectedDept !== 'All' && (
              <span className="active-filter-badge">
                Department: {selectedDept}
                <button onClick={() => setSelectedDept('All')}>×</button>
              </span>
            )}
          </div>

          {/* Cards Grid */}
          {filteredTenders.length === 0 ? (
            <div className="no-tenders-found">
              <Building2 size={48} className="text-muted" style={{ opacity: 0.4, margin: '0 auto 1rem' }} />
              <h3>No winning tenders found</h3>
              <p>Try clearing your search filters or selecting another department.</p>
              <button 
                onClick={() => { setSelectedDept('All'); setSearchQuery(''); }}
                className="btn-outline-pill"
                style={{ marginTop: '1rem' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="winning-tiles-grid">
              {filteredTenders.map((tender) => {
                const isToggled = activeTileId === tender.id;

                return (
                  <div
                    key={tender.id}
                    className={`tender-tile-card ${isToggled ? 'tile-active-touch' : ''}`}
                    onClick={() => setActiveTileId(isToggled ? null : tender.id)}
                  >
                    {/* Background Photo */}
                    <Image
                      src={tender.image}
                      alt={tender.projectName}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="tender-tile-bg-image"
                    />

                    {/* Dark Gradient Backdrop */}
                    <div className="tender-tile-gradient-scrim"></div>

                    {/* Top Badges */}
                    <div className="tender-tile-top-row">
                      <span className="tender-tile-dept-badge">{tender.departmentShort}</span>
                      <span className="tender-tile-year-badge">{tender.year}</span>
                    </div>

                    {/* Floating Emerald Price Tag */}
                    <div className="tender-tile-price-floating">
                      <span className="price-pulse-dot"></span>
                      <span className="price-text">{tender.projectValue}</span>
                    </div>

                    {/* Default Bottom Information */}
                    <div className="tender-tile-default-info">
                      <div className="tender-tile-id-chip">
                        <span>Tender ID: #{tender.tenderId}</span>
                      </div>
                      <h4 className="tender-tile-title">
                        {tender.projectName}
                      </h4>
                    </div>

                    {/* Enhanced Hover Overlay (No Button, Full Text View) */}
                    <div className="tender-tile-hover-panel">
                      <div className="hover-panel-top">
                        <span className="hover-dept-full">{tender.department}</span>
                        <h4 className="hover-project-name">{tender.projectName}</h4>
                      </div>

                      <div className="hover-specs-list">
                        <div className="hover-spec-row">
                          <span className="hover-spec-label">Tender ID:</span>
                          <span className="hover-spec-val">#{tender.tenderId}</span>
                        </div>

                        <div className="hover-spec-row">
                          <span className="hover-spec-label">Location:</span>
                          <span className="hover-spec-val">
                            <MapPin size={12} className="hover-icon text-emerald" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{tender.location}</span>
                          </span>
                        </div>

                        <div className="hover-spec-row">
                          <span className="hover-spec-label">Winning Client:</span>
                          <span className="hover-spec-val hover-client-name">
                            <Building2 size={12} className="hover-icon text-emerald" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{tender.winningClient}</span>
                          </span>
                        </div>

                        <div className="hover-spec-row hover-value-row">
                          <span className="hover-spec-label">Awarded Value:</span>
                          <span className="hover-value-highlight">{tender.projectValue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Conversion Banner */}
          <div className="winning-conversion-banner">
            <div className="conversion-banner-content">
              <span className="pill-badge pill-gold" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                BE OUR NEXT SUCCESS STORY
              </span>
              <h2>Ready to Win Your Next Major Government Tender?</h2>
              <p>
                From tender security banking coordination to rigorous technical document validation and winning financial proposal pricing — we protect your bid from non-responsiveness.
              </p>
              <div className="conversion-actions-row">
                <button
                  onClick={() => openModal('General Winning Tender Consultation')}
                  className="btn-dark-pill"
                >
                  <span>Request Tender Consultation</span>
                  <div className="btn-arrow-circle">
                    <ArrowRight size={14} />
                  </div>
                </button>
                <a href="tel:+8801886970197" className="btn-phone-banner">
                  <PhoneCall size={16} />
                  <span>Call +880 1886-970197</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onOpenModal={() => openModal()} />
      <StickyMobileBar />
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={modalSubject}
      />
    </div>
  );
}
