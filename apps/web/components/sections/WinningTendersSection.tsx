'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  ArrowRight,
  Trophy
} from 'lucide-react';
import { winningTendersData } from '../../data/winningTenders';
import { useInView } from '../../hooks/useInView';
import { useLanguage } from '../../context/LanguageContext';

interface WinningTendersSectionProps {
  onOpenModal?: (serviceName?: string) => void;
}

export function WinningTendersSection({ onOpenModal }: WinningTendersSectionProps) {
  const { lang, t } = useLanguage();
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [activeTileId, setActiveTileId] = useState<string | null>(null);

  // Top 4 tenders displayed in grid
  const featuredTenders = winningTendersData.slice(0, 4);

  return (
    <section
      ref={ref}
      className={`winning-tenders-section section-padding ${isInView ? 'winning-in-view' : ''}`}
      id="winning-tenders"
    >
      <div className="container">
        {/* Section Header */}
        <div className="winning-tile-header">
          <div>
            <div className="eyebrow-pill">
              <Trophy size={13} style={{ marginRight: '6px', color: 'var(--green-emerald)' }} />
              <span>{t.winningTenders.eyebrow}</span>
            </div>
            <h2 className="section-title-large" style={{ marginBottom: '0.4rem' }}>
              {t.winningTenders.title}
            </h2>
            <p className="section-subtext-regular" style={{ margin: 0 }}>
              {t.winningTenders.subtext}
            </p>
          </div>

          <div className="winning-tile-header-cta">
            <Link href="/winning-tenders" className="btn-text-animated-arrow">
              <span>{t.winningTenders.seeMore}</span>
              <ArrowRight size={18} strokeWidth={2.4} className="animated-arrow-icon" />
            </Link>
          </div>
        </div>

        {/* Minimalist Tile Grid with Enhanced Hover */}
        <div className="winning-tiles-grid">
          {featuredTenders.map((tender) => {
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="tender-tile-bg-image"
                />

                {/* Dark Gradient Backdrop */}
                <div className="tender-tile-gradient-scrim"></div>

                {/* Top Badges (Department & Year) */}
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

        {/* Mobile See More */}
        <div className="winning-mobile-see-more">
          <Link href="/winning-tenders" className="btn-text-animated-arrow" style={{ justifyContent: 'center' }}>
            <span>{t.winningTenders.seeMore}</span>
            <ArrowRight size={18} strokeWidth={2.4} className="animated-arrow-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}
