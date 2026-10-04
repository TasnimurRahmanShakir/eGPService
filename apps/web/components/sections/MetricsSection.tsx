'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';

interface StatItemProps {
  end: number;
  suffix?: string;
  label: string;
  isFormatted?: boolean;
  isInView: boolean;
  duration?: number;
}

function AnimatedStat({
  end,
  suffix = '',
  label,
  isFormatted = false,
  isInView,
  duration = 1400
}: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * end);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, duration]);

  const displayCount = isFormatted
    ? count.toLocaleString('en-US')
    : count.toString();

  return (
    <div className="metric-band-item">
      <span className="metric-band-number">
        {displayCount}
        {suffix}
      </span>
      <span className="metric-band-label metric-band-label-reveal">{label}</span>
    </div>
  );
}

export function MetricsSection() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.25 });

  const stats = [
    { end: 9, suffix: '+', label: 'Years of Experience', duration: 1100 },
    { end: 150, suffix: '+', label: 'Clients', duration: 1300 },
    { end: 32000, suffix: '+', label: 'Tender Submissions', isFormatted: true, duration: 1600 },
    { end: 96, suffix: '%', label: 'Client Satisfaction', duration: 1400 },
    { end: 55, suffix: '%', label: 'Win Rate*', duration: 1200 }
  ];

  return (
    <section
      ref={ref}
      className={`metrics-band-section ${isInView ? 'metrics-in-view' : ''}`}
    >
      <div className="container">
        <div className="metrics-band-row">
          {stats.map((stat) => (
            <AnimatedStat
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              isFormatted={stat.isFormatted}
              isInView={isInView}
              duration={stat.duration}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
