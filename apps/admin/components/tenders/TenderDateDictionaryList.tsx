'use client';

import React, { useState } from 'react';
import { Calendar, ChevronRight, PanelLeftClose, PanelLeft, Filter, Layers } from 'lucide-react';
import type { TenderClosingIndexDto } from '@egp/api-client';

interface TenderDateDictionaryListProps {
  indexItems: TenderClosingIndexDto[];
  selectedDate: string | null; // 'YYYY-MM-DD' or null for 'all'
  onSelectDate: (date: string | null) => void;
  isLoading?: boolean;
}

export function TenderDateDictionaryList({
  indexItems,
  selectedDate,
  onSelectDate,
  isLoading = false,
}: TenderDateDictionaryListProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [customDate, setCustomDate] = useState('');

  // Local date strings in YYYY-MM-DD
  const now = new Date();
  const todayStr = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = new Date(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60000).toISOString().split('T')[0];

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomDate(val);
    if (val) {
      onSelectDate(val);
    }
  };

  const totalUpcomingTenders = indexItems.reduce((acc, item) => acc + item.tenderCount, 0);

  if (isCollapsed) {
    return (
      <div
        style={{
          width: '52px',
          flexShrink: 0,
          backgroundColor: 'var(--surface, #FFFFFF)',
          border: '1px solid var(--border, #E2E8F0)',
          borderRadius: 'var(--radius-card, 10px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0.75rem 0',
          gap: '1rem',
          boxShadow: 'var(--shadow-sm)',
          height: 'fit-content',
          minHeight: '400px',
        }}
      >
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          title="Expand Closing Dates List"
          aria-label="Expand Closing Dates List"
          style={{
            padding: '0.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--primary, #4F46E5)',
            cursor: 'pointer',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PanelLeft size={20} />
        </button>

        <div
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--muted-foreground, #64748B)',
            letterSpacing: '0.05em',
            marginTop: '1rem',
          }}
        >
          CLOSING DATES (30D)
        </div>
      </div>
    );
  }

  return (
    <aside
      style={{
        width: '320px',
        flexShrink: 0,
        backgroundColor: 'var(--surface, #FFFFFF)',
        border: '1px solid var(--border, #E2E8F0)',
        borderRadius: 'var(--radius-card, 10px)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-sm)',
        maxHeight: 'calc(100vh - 120px)',
        position: 'sticky',
        top: '1rem',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '0.875rem 1rem',
          borderBottom: '1px solid var(--border, #E2E8F0)',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={18} style={{ color: 'var(--primary, #4F46E5)' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', letterSpacing: '-0.01em' }}>
            Closing Index (30 Days)
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsCollapsed(true)}
          title="Collapse list"
          aria-label="Collapse list"
          style={{
            background: 'none',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
          }}
        >
          <PanelLeftClose size={17} />
        </button>
      </div>

      {/* Quick Action: All Tenders & Custom Date Picker */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderBottom: '1px solid var(--border, #E2E8F0)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* All Tenders Option */}
        <button
          type="button"
          onClick={() => {
            setCustomDate('');
            onSelectDate(null);
          }}
          disabled={isLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            border: selectedDate === null ? '1px solid #4F46E5' : '1px solid #E2E8F0',
            backgroundColor: selectedDate === null ? '#EEF2FF' : '#F8FAFC',
            color: selectedDate === null ? '#3730A3' : '#334155',
            fontWeight: selectedDate === null ? 700 : 500,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={15} style={{ color: selectedDate === null ? '#4F46E5' : '#64748B' }} />
            <span>All Active Tenders</span>
          </div>
          <span
            style={{
              padding: '2px 7px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: selectedDate === null ? '#4F46E5' : '#E2E8F0',
              color: selectedDate === null ? '#FFFFFF' : '#475569',
            }}
          >
            {totalUpcomingTenders}
          </span>
        </button>

        {/* Custom Date Input for dates outside the 30-day window */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', position: 'relative' }}>
          <label
            htmlFor="custom-date-picker"
            style={{
              fontSize: '0.75rem',
              color: '#64748B',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            <Filter size={12} /> Custom Date:
          </label>
          <input
            id="custom-date-picker"
            type="date"
            value={customDate}
            onChange={handleCustomDateChange}
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '0.35rem 0.5rem',
              fontSize: '0.8125rem',
              border: customDate === selectedDate && selectedDate !== null ? '1px solid #4F46E5' : '1px solid #CBD5E1',
              borderRadius: '6px',
              backgroundColor: customDate === selectedDate && selectedDate !== null ? '#EEF2FF' : '#FFFFFF',
              color: '#1E293B',
              outline: 'none',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>

      {/* 30-Days Chronological List */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5rem 0.5rem',
          gap: '0.25rem',
        }}
      >
        {indexItems.map((item) => {
          const isSelected = selectedDate === item.date;
          const isToday = item.date === todayStr;
          const isTomorrow = item.date === tomorrowStr;
          const hasTenders = item.tenderCount > 0;

          // Format Date display
          const dateObj = new Date(item.date + 'T00:00:00Z');
          const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
          const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

          return (
            <button
              key={item.date}
              type="button"
              onClick={() => {
                setCustomDate('');
                onSelectDate(item.date);
              }}
              disabled={isLoading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.625rem 0.75rem',
                borderRadius: '8px',
                border: isSelected
                  ? '1.5px solid #4F46E5'
                  : isToday
                  ? '1px dashed #10B981'
                  : '1px solid transparent',
                backgroundColor: isSelected
                  ? '#EEF2FF'
                  : isToday
                  ? '#F0FDF4'
                  : hasTenders
                  ? '#FFFFFF'
                  : '#FAFAFA',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                position: 'relative',
              }}
            >
              {/* Left Stripe Indicator for Selected */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '15%',
                    bottom: '15%',
                    width: '3.5px',
                    borderRadius: '0 4px 4px 0',
                    backgroundColor: '#4F46E5',
                  }}
                />
              )}

              {/* Date & Labels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: isSelected || hasTenders ? 700 : 500,
                      color: isSelected ? '#3730A3' : hasTenders ? '#0F172A' : '#94A3B8',
                    }}
                  >
                    {monthDay}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: isSelected ? '#4F46E5' : hasTenders ? '#64748B' : '#94A3B8',
                      fontWeight: 500,
                    }}
                  >
                    ({dayName})
                  </span>

                  {isToday && (
                    <span
                      style={{
                        fontSize: '0.625rem',
                        fontWeight: 800,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        backgroundColor: '#10B981',
                        color: '#FFFFFF',
                        letterSpacing: '0.04em',
                      }}
                    >
                      TODAY
                    </span>
                  )}

                  {isTomorrow && (
                    <span
                      style={{
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        backgroundColor: '#0EA5E9',
                        color: '#FFFFFF',
                      }}
                    >
                      TOMORROW
                    </span>
                  )}
                </div>

                {/* Subtitle Counts */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
                  <span
                    style={{
                      fontWeight: hasTenders ? 600 : 400,
                      color: isSelected
                        ? '#3730A3'
                        : hasTenders
                        ? '#4F46E5'
                        : '#94A3B8',
                    }}
                  >
                    {item.tenderCount} {item.tenderCount === 1 ? 'Tender' : 'Tenders'}
                  </span>
                  <span style={{ color: '#CBD5E1' }}>•</span>
                  <span
                    style={{
                      fontWeight: item.clientCount > 0 ? 600 : 400,
                      color: isSelected
                        ? '#065F46'
                        : item.clientCount > 0
                        ? '#059669'
                        : '#94A3B8',
                    }}
                  >
                    {item.clientCount} {item.clientCount === 1 ? 'Client' : 'Clients'}
                  </span>
                </div>
              </div>

              {/* Right Chevron / Arrow indicator */}
              <ChevronRight
                size={16}
                style={{
                  color: isSelected ? '#4F46E5' : hasTenders ? '#94A3B8' : '#CBD5E1',
                  transform: isSelected ? 'translateX(2px)' : 'none',
                  transition: 'transform 0.15s ease',
                }}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
