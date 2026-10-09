'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';

export interface ComboboxOption {
  value: string | number;
  label: string;
  subLabel?: string;
  badge?: string;
}

export interface ComboboxProps {
  label?: string;
  error?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string | number | null;
  onChange: (value: any) => void;
  disabled?: boolean;
  options?: ComboboxOption[];
  onOpenFetch?: () => Promise<ComboboxOption[]>;
  allowClear?: boolean;
  helperText?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Combobox({
  label,
  error,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  value,
  onChange,
  disabled = false,
  options = [],
  onOpenFetch,
  allowClear = true,
  helperText,
  id,
  className = '',
  style,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [internalOptions, setInternalOptions] = useState<ComboboxOption[]>(options);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync internal options if props options change
  useEffect(() => {
    if (options && options.length > 0) {
      setInternalOptions(options);
    }
  }, [options]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle open and dynamic fetch on click
  const handleToggle = async () => {
    if (disabled) return;

    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);

      // Fetch from database on-demand if onOpenFetch provided and not fetched yet
      if (onOpenFetch && !hasFetched) {
        setIsLoading(true);
        try {
          const fetched = await onOpenFetch();
          setInternalOptions(fetched);
          setHasFetched(true);
        } catch (err) {
          console.error('[Combobox] Error fetching options:', err);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      setIsOpen(false);
    }
  };

  const selectedOption = useMemo(() => {
    if (value === null || value === undefined || value === '') return null;
    return internalOptions.find((opt) => String(opt.value) === String(value)) || null;
  }, [value, internalOptions]);

  const filteredOptions = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return internalOptions;
    return internalOptions.filter((opt) => {
      const matchLabel = opt.label.toLowerCase().includes(q);
      const matchSub = opt.subLabel ? opt.subLabel.toLowerCase().includes(q) : false;
      const matchBadge = opt.badge ? opt.badge.toLowerCase().includes(q) : false;
      return matchLabel || matchSub || matchBadge;
    });
  }, [internalOptions, search]);

  const handleSelect = (optValue: string | number | null) => {
    onChange(optValue);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem',
        width: '100%',
        position: 'relative',
        ...style,
      }}
      className={`egp-combobox ${className}`}
    >
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: '0.815rem',
            fontWeight: 500,
            color: '#94a3b8',
          }}
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <div
        id={id}
        onClick={handleToggle}
        style={{
          width: '100%',
          backgroundColor: disabled ? 'rgba(15, 23, 42, 0.4)' : 'rgba(15, 23, 42, 0.95)',
          border: error ? '1px solid #f43f5e' : isOpen ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '0.55rem 0.85rem',
          color: selectedOption ? '#f8fafc' : '#64748b',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: disabled ? 'not-allowed' : 'pointer',
          userSelect: 'none',
          boxShadow: isOpen ? '0 0 10px rgba(56, 189, 248, 0.2)' : 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden', flex: 1 }}>
          {selectedOption ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden' }}>
              <span style={{ fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {selectedOption.label}
              </span>
              {selectedOption.subLabel && (
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                  ({selectedOption.subLabel})
                </span>
              )}
            </div>
          ) : (
            <span style={{ color: '#64748b' }}>{placeholder}</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginLeft: '0.5rem' }}>
          {allowClear && selectedOption && !disabled && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(null);
              }}
              title="Clear selection"
              style={{
                color: '#94a3b8',
                padding: '2px 4px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                lineHeight: 1,
              }}
            >
              ✕
            </span>
          )}

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              color: '#94a3b8',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s ease',
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 9999,
            backgroundColor: '#0b1329',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '10px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: 'absolute', left: '0.65rem' }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              style={{
                width: '100%',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '0.45rem 0.65rem 0.45rem 2rem',
                color: '#f8fafc',
                fontSize: '0.825rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Options List */}
          <div
            style={{
              maxHeight: '220px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            {isLoading ? (
              <div
                style={{
                  padding: '1rem',
                  textAlign: 'center',
                  color: '#38bdf8',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    border: '2px solid #38bdf8',
                    borderRightColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite',
                  }}
                />
                Loading data from server...
              </div>
            ) : filteredOptions.length === 0 ? (
              <div style={{ padding: '0.85rem', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>
                No results found
              </div>
            ) : (
              <>
                {allowClear && (
                  <div
                    onClick={() => handleSelect(null)}
                    style={{
                      padding: '0.5rem 0.65rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      color: '#94a3b8',
                      fontStyle: 'italic',
                      backgroundColor: 'transparent',
                      transition: 'background-color 0.1s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    — None / Clear Selection —
                  </div>
                )}
                {filteredOptions.map((opt) => {
                  const isSelected = String(opt.value) === String(value);
                  return (
                    <div
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      style={{
                        padding: '0.55rem 0.65rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.825rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                        color: isSelected ? '#38bdf8' : '#e2e8f0',
                        border: isSelected ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                        transition: 'background-color 0.1s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', overflow: 'hidden' }}>
                        <span style={{ fontWeight: isSelected ? 700 : 500 }}>{opt.label}</span>
                        {opt.subLabel && (
                          <span style={{ fontSize: '0.725rem', color: isSelected ? '#7dd3fc' : '#94a3b8' }}>
                            {opt.subLabel}
                          </span>
                        )}
                      </div>

                      {opt.badge && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: '#cbd5e1',
                          }}
                        >
                          {opt.badge}
                        </span>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}

      {error && <span style={{ fontSize: '0.75rem', color: '#f43f5e', marginTop: '0.1rem' }}>{error}</span>}
      {helperText && !error && (
        <span style={{ fontSize: '0.725rem', color: '#94a3b8', marginTop: '0.1rem' }}>{helperText}</span>
      )}
    </div>
  );
}
