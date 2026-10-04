import React from 'react';

export function MetricsSection() {
  return (
    <section className="metrics-band-section">
      <div className="container">
        <div className="metrics-band-grid">
          <div className="metric-band-item">
            <span className="metric-band-number">9+</span>
            <span className="metric-band-label">Years of Experience</span>
          </div>
          <div className="metric-band-item">
            <span className="metric-band-number">150+</span>
            <span className="metric-band-label">Clients</span>
          </div>
          <div className="metric-band-item">
            <span className="metric-band-number">32,000+</span>
            <span className="metric-band-label">Tender Submissions</span>
          </div>
          <div className="metric-band-item">
            <span className="metric-band-number">96%</span>
            <span className="metric-band-label">Client Satisfaction</span>
          </div>
          <div className="metric-band-item">
            <span className="metric-band-number">55%</span>
            <span className="metric-band-label">Win Rate*</span>
          </div>
        </div>
      </div>
    </section>
  );
}
