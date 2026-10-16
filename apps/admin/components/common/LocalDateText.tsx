'use client';

import React, { useEffect, useState } from 'react';
import { formatLocalDate, formatLocalTime, formatLocalDateTime, getUserTimezone } from '@/lib/date-utils';

interface LocalDateTextProps {
  date: string | Date | null | undefined;
  format?: 'date' | 'time' | 'datetime';
  timeOptions?: Intl.DateTimeFormatOptions;
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
  showTimezone?: boolean;
}

/**
 * Hydration-safe component to render dates & times in the user's local browser timezone.
 */
export function LocalDateText({
  date,
  format = 'datetime',
  timeOptions,
  fallback = '-',
  className,
  style,
  showTimezone = false,
}: LocalDateTextProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getFormattedValue = () => {
    switch (format) {
      case 'date':
        return formatLocalDate(date, fallback);
      case 'time':
        return formatLocalTime(date, timeOptions, fallback);
      case 'datetime':
      default:
        return formatLocalDateTime(date, fallback);
    }
  };

  const text = getFormattedValue();
  const tz = showTimezone && mounted ? ` (${getUserTimezone()})` : '';

  return (
    <span className={className} style={style} suppressHydrationWarning>
      {text}
      {tz}
    </span>
  );
}
