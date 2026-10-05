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

interface WinningTendersSectionProps {
  onOpenModal?: (serviceName?: string) => void;
}

export function WinningTendersSection({ onOpenModal }: WinningTendersSectionProps) {
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
              <span>TRACK RECORD OF SUCCESS</span>
            </div>
            <h2 className="section-title-large" style={{ marginBottom: '0.4rem' }}>
              Winning Tenders
            </h2>
            <p className="section-subtext-regular" style={{ margin: 0 }}>
              Some of our top tender winning features &amp; successfully executed bids across Bangladesh.
            </p>
          </div>

          <div className="winning-tile-header-cta">
            <Link href="/winning-tenders" className="btn-text-animated-arrow">
              <span>See More Projects</span>
              <ArrowRight size={18} strokeWidth={2.4} className="animated-arrow-icon" />
            </Link>
          </div>
        </div>

        {/* Minimalist Tile Grid with Enhanced Hover */}
        <div className="winning-tiles-grid">
          {featuredTenders.map((tender) => {
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

        {/* Mobile See More */}
        <div className="winning-mobile-see-more">
          <Link href="/winning-tenders" className="btn-text-animated-arrow" style={{ justifyContent: 'center' }}>
            <span>See More Projects</span>
            <ArrowRight size={18} strokeWidth={2.4} className="animated-arrow-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}
