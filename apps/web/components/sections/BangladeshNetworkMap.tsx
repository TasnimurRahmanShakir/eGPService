'use client';

import React, { useState } from 'react';
import { REAL_BANGLADESH_DIVISIONS, RealDivisionData } from './BangladeshMapData';

import { useLanguage } from '../../context/LanguageContext';

export function BangladeshNetworkMap() {
  const { lang, t } = useLanguage();
  const [hoveredHub, setHoveredHub] = useState<RealDivisionData | null>(null);

  const dhakaHub = REAL_BANGLADESH_DIVISIONS[0]; // Center HQ
  const outerHubs = REAL_BANGLADESH_DIVISIONS.slice(1);

  const getHubName = (hub: RealDivisionData) => {
    if (lang !== 'bn') {
      return hub.isCenter ? `${hub.name} (HQ)` : hub.name;
    }
    switch (hub.id) {
      case 'dhaka': return t.mapHubs.dhakaHq;
      case 'chattogram': return t.mapHubs.chattogram;
      case 'sylhet': return t.mapHubs.sylhet;
      case 'rajshahi': return t.mapHubs.rajshahi;
      case 'khulna': return t.mapHubs.khulna;
      case 'barishal': return t.mapHubs.barishal;
      case 'rangpur': return t.mapHubs.rangpur;
      case 'mymensingh': return t.mapHubs.mymensingh;
      default: return hub.name;
    }
  };

  const currentDisplayName = hoveredHub ? getHubName(hoveredHub) : '';
  // Dynamic pill sizing for hover tooltip
  const tooltipWidth = hoveredHub
    ? Math.max(90, currentDisplayName.length * 11 + 42)
    : 100;
  const tooltipX = -tooltipWidth / 2;

  return (
    <div className="bd-network-map-container">
      {/* SVG Canvas with Real Geographic Bangladesh Map */}
      <div className="bd-map-svg-wrap">
        <svg
          viewBox="160 30 680 940"
          className="bd-map-svg"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Interactive Bangladesh e-GP Service Network Map"
        >
          <defs>
            {/* Emerald Radial Glow */}
            <filter id="emeraldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Division Default Gradient */}
            <linearGradient id="divBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#083E2F" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#04261C" stopOpacity="0.95" />
            </linearGradient>

            {/* Division Active / Highlight Gradient */}
            <linearGradient id="divActiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* 1. Real Geographical Administrative Division Boundaries */}
          <g className="bd-real-divisions-layer">
            {REAL_BANGLADESH_DIVISIONS.map((division) => {
              const isHovered = hoveredHub?.id === division.id;

              return (
                <path
                  key={`div-poly-${division.id}`}
                  d={division.path}
                  id={`bd-div-${division.id}`}
                  className={`real-division-polygon ${isHovered ? 'div-polygon-selected' : ''}`}
                  onMouseEnter={() => setHoveredHub(division)}
                  onMouseLeave={() => setHoveredHub(null)}
                >
                  <title>{division.fullName}</title>
                </path>
              );
            })}
          </g>

          {/* 2. Animated Dotted Connection Lines (Dhaka HQ -> Outer 7 Divisions) */}
          <g className="bd-network-lines-layer">
            {outerHubs.map((hub) => {
              const isHovered = hoveredHub?.id === hub.id;

              return (
                <g key={`conn-${hub.id}`}>
                  {/* Subtle Underline Glow */}
                  <line
                    x1={dhakaHub.x}
                    y1={dhakaHub.y}
                    x2={hub.x}
                    y2={hub.y}
                    className={`map-line-glow ${isHovered ? 'line-selected' : ''}`}
                  />

                  {/* Animated Dotted Flow Line */}
                  <line
                    x1={dhakaHub.x}
                    y1={dhakaHub.y}
                    x2={hub.x}
                    y2={hub.y}
                    className={`map-dash-line ${isHovered ? 'line-selected' : ''}`}
                  />

                  {/* Traveling Signal Dot from Dhaka outward */}
                  <circle r={isHovered ? 5.5 : 4} className="map-signal-dot">
                    <animateMotion
                      path={`M ${dhakaHub.x} ${dhakaHub.y} L ${hub.x} ${hub.y}`}
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </g>

          {/* 3. Outer Division Nodes (Pins without static text) */}
          <g className="bd-outer-hubs-layer">
            {outerHubs.map((hub) => {
              const isHovered = hoveredHub?.id === hub.id;

              return (
                <g
                  key={hub.id}
                  className={`map-node-group ${isHovered ? 'is-active-hub' : ''}`}
                  onMouseEnter={() => setHoveredHub(hub)}
                  onMouseLeave={() => setHoveredHub(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer Pulsing Ripple */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r="22"
                    className="hub-pulse-ring"
                  />

                  {/* Core Base Circle */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isHovered ? 10 : 7.5}
                    className="hub-core-circle"
                  />

                  {/* Inner Light Dot */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r="3.5"
                    fill="#FFFFFF"
                  />
                </g>
              );
            })}
          </g>

          {/* 4. Central Hub: DHAKA (HQ) (No static text) */}
          <g
            className={`map-node-group is-center-hq ${hoveredHub?.id === dhakaHub.id ? 'is-active-hub' : ''}`}
            onMouseEnter={() => setHoveredHub(dhakaHub)}
            onMouseLeave={() => setHoveredHub(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Broad HQ Radar Rings */}
            <circle
              cx={dhakaHub.x}
              cy={dhakaHub.y}
              r="38"
              className="hub-hq-radar-ring"
            />
            <circle
              cx={dhakaHub.x}
              cy={dhakaHub.y}
              r="24"
              className="hub-pulse-ring"
            />

            {/* Central Core Circle */}
            <circle
              cx={dhakaHub.x}
              cy={dhakaHub.y}
              r="12"
              className="hub-hq-core-circle"
            />
            <circle
              cx={dhakaHub.x}
              cy={dhakaHub.y}
              r="5"
              fill="#FFFFFF"
            />
          </g>

          {/* 5. Clean Floating Hover Badge (ONLY shows on hover!) */}
          {hoveredHub && (
            <g
              className="map-hover-badge"
              transform={`translate(${hoveredHub.x}, ${hoveredHub.y - 24})`}
              style={{ pointerEvents: 'none' }}
            >
              {/* Badge Glow & Backdrop */}
              <rect
                x={tooltipX}
                y="-15"
                width={tooltipWidth}
                height="30"
                rx="15"
                fill="#031F17"
                stroke="#34D399"
                strokeWidth="1.8"
                filter="url(#emeraldGlow)"
              />
              <rect
                x={tooltipX}
                y="-15"
                width={tooltipWidth}
                height="30"
                rx="15"
                fill="#04261C"
                stroke="#34D399"
                strokeWidth="1.8"
              />

              {/* Pulsing Green Indicator Dot */}
              <circle cx={tooltipX + 16} cy="0" r="3.5" fill="#34D399" />

              {/* Division Title Text */}
              <text
                x={tooltipX + 27}
                y="4.5"
                textAnchor="start"
                fill="#FFFFFF"
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-sans)"
                letterSpacing="0.02em"
              >
                {currentDisplayName}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
