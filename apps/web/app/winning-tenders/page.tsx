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
import { useLanguage } from '../../context/LanguageContext';

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
  const { lang, t } = useLanguage();
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
        (tender.projectNameBn && tender.projectNameBn.toLowerCase().includes(query)) ||
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
            <Link href="/" className="breadcrumb-link">{t.nav.links.home}</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{t.nav.links.winningTenders}</span>
          </div>

          <h1 className="page-hero-title">
            {t.winningTenders.pageTitle}
          </h1>
          <p className="page-hero-sub">
            {t.winningTenders.pageSubtitle}
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
                  {dept === 'All' ? t.winningTenders.allDepts : dept}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="tender-search-input-wrap">
              <Search size={16} className="tender-search-icon" />
              <input
                type="text"
                placeholder={t.winningTenders.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tender-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="clear-search-btn"
                >
                  {lang === 'bn' ? 'মুছুন' : 'Clear'}
                </button>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className="results-summary-row">
            <span>
              {lang === 'bn' 
                ? <>মোট <strong>{filteredTenders.length}</strong> টি সফল টেন্ডার প্রদর্শিত হচ্ছে</>
                : <>Showing <strong>{filteredTenders.length}</strong> verified winning tenders</>
              }
            </span>
            {selectedDept !== 'All' && (
              <span className="active-filter-badge">
                {t.winningTenders.filterByDept} {selectedDept}
                <button onClick={() => setSelectedDept('All')}>×</button>
              </span>
            )}
          </div>

          {/* Cards Grid */}
          {filteredTenders.length === 0 ? (
            <div className="no-tenders-found">
              <Building2 size={48} className="text-muted" style={{ opacity: 0.4, margin: '0 auto 1rem' }} />
              <h3>{t.winningTenders.noResultsTitle}</h3>
              <p>{t.winningTenders.noResultsSub}</p>
              <button 
                onClick={() => { setSelectedDept('All'); setSearchQuery(''); }}
                className="btn-outline-pill"
                style={{ marginTop: '1rem' }}
              >
                {lang === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            <div className="winning-tiles-grid">
              {filteredTenders.map((tender) => {
                const isToggled = activeTileId === tender.id;
                const projectName = (lang === 'bn' && tender.projectNameBn) ? tender.projectNameBn : tender.projectName;
                const department = (lang === 'bn' && tender.departmentBn) ? tender.departmentBn : tender.department;
                const location = (lang === 'bn' && tender.locationBn) ? tender.locationBn : tender.location;
                const projectValue = (lang === 'bn' && tender.projectValueBn) ? tender.projectValueBn : tender.projectValue;
                const winningClient = (lang === 'bn' && tender.winningClientBn) ? tender.winningClientBn : tender.winningClient;

                return (
                  <div
                    key={tender.id}
                    className={`tender-tile-card ${isToggled ? 'tile-active-touch' : ''}`}
                    onClick={() => setActiveTileId(isToggled ? null : tender.id)}
                  >
                    {/* Background Photo */}
                    <Image
                      src={tender.image}
                      alt={projectName}
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
                      <span className="price-text">{projectValue}</span>
                    </div>

                    {/* Default Bottom Information */}
                    <div className="tender-tile-default-info">
                      <div className="tender-tile-id-chip">
                        <span>{t.winningTenders.tenderIdPrefix}{tender.tenderId}</span>
                      </div>
                      <h4 className="tender-tile-title">
                        {projectName}
                      </h4>
                    </div>

                    {/* Enhanced Hover Overlay (No Button, Full Text View) */}
                    <div className="tender-tile-hover-panel">
                      <div className="hover-panel-top">
                        <span className="hover-dept-full">{department}</span>
                        <h4 className="hover-project-name">{projectName}</h4>
                      </div>

                      <div className="hover-specs-list">
                        <div className="hover-spec-row">
                          <span className="hover-spec-label">{t.winningTenders.tenderIdPrefix}</span>
                          <span className="hover-spec-val">#{tender.tenderId}</span>
                        </div>

                        <div className="hover-spec-row">
                          <span className="hover-spec-label">{lang === 'bn' ? 'স্থান:' : 'Location:'}</span>
                          <span className="hover-spec-val">
                            <MapPin size={12} className="hover-icon text-emerald" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{location}</span>
                          </span>
                        </div>

                        <div className="hover-spec-row">
                          <span className="hover-spec-label">{lang === 'bn' ? 'জয়ী ক্লায়েন্ট:' : 'Winning Client:'}</span>
                          <span className="hover-spec-val hover-client-name">
                            <Building2 size={12} className="hover-icon text-emerald" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{winningClient}</span>
                          </span>
                        </div>

                        <div className="hover-spec-row hover-value-row">
                          <span className="hover-spec-label">{lang === 'bn' ? 'চুক্তিমূল্য:' : 'Awarded Value:'}</span>
                          <span className="hover-value-highlight">{projectValue}</span>
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
                {t.winningTenders.eyebrow}
              </span>
              <h2>{t.winningTenders.ctaBannerTitle}</h2>
              <p>
                {t.winningTenders.ctaBannerSub}
              </p>
              <div className="conversion-actions-row">
                <button
                  onClick={() => openModal(lang === 'bn' ? 'সফল টেন্ডার পরামর্শ' : 'Winning Tender Consultation')}
                  className="btn-dark-pill"
                >
                  <span>{t.winningTenders.ctaBannerBtn}</span>
                  <div className="btn-arrow-circle">
                    <ArrowRight size={14} />
                  </div>
                </button>
                <a href="tel:+8801886970197" className="btn-phone-banner">
                  <PhoneCall size={16} />
                  <span>{t.finalCta.callNumber}</span>
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
