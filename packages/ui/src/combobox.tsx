'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';

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
  const [mounted, setMounted] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    width: number;
    placeAbove: boolean;
  }>({ top: 0, left: 0, width: 0, placeAbove: false });

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const estimatedHeight = 280;
      const placeAbove = spaceBelow < estimatedHeight && rect.top > spaceBelow;
      setDropdownPos({
        top: placeAbove ? rect.top - 4 : rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        placeAbove,
      });
    }
  }, []);

  // Sync internal options if props options change
  useEffect(() => {
    if (options && options.length > 0) {
      setInternalOptions(options);
    }
  }, [options]);

  // Click outside and viewport resize/scroll listeners
  useEffect(() => {
    if (!isOpen) return;

    updatePosition();
    const handleScrollOrResize = () => {
      updatePosition();
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, updatePosition]);

  // Handle open and dynamic fetch on click
  const handleToggle = async () => {
    if (disabled) return;

    if (!isOpen) {
      updatePosition();
      setIsOpen(true);
      setTimeout(() => {
        updatePosition();
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
            fontWeight: 600,
            color: 'var(--foreground-secondary, #475569)',
          }}
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <div
        ref={triggerRef}
        id={id}
        onClick={handleToggle}
        style={{
          width: '100%',
          backgroundColor: disabled ? 'var(--disabled-bg, #F1F5F9)' : 'var(--input-bg, #FFFFFF)',
          border: error ? '1px solid var(--danger, #BE123C)' : isOpen ? '1px solid var(--primary, #0F766E)' : '1px solid var(--input-border, #CBD5E1)',
          borderRadius: 'var(--radius-control, 8px)',
          padding: '0.55rem 0.85rem',
          color: selectedOption ? 'var(--foreground, #1F2937)' : 'var(--muted-foreground, #64748B)',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: disabled ? 'not-allowed' : 'pointer',
          userSelect: 'none',
          boxShadow: isOpen ? '0 0 0 3px rgba(15, 118, 110, 0.15)' : 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden', flex: 1 }}>
          {selectedOption ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden' }}>
              <span style={{ fontWeight: 600, color: 'var(--foreground, #1F2937)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {selectedOption.label}
              </span>
              {selectedOption.subLabel && (
                <span style={{ fontSize: '0.75rem', color: '#64748B', whiteSpace: 'nowrap' }}>
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

      {/* Dropdown Menu Portal */}
      {isOpen && mounted && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: dropdownPos.placeAbove ? 'auto' : `${dropdownPos.top}px`,
            bottom: dropdownPos.placeAbove ? `${Math.max(8, window.innerHeight - dropdownPos.top)}px` : 'auto',
            left: `${dropdownPos.left}px`,
            width: `${dropdownPos.width}px`,
            zIndex: 99999,
            backgroundColor: 'var(--surface, #FFFFFF)',
            border: '1px solid var(--border-strong, #CBD5E1)',
            borderRadius: 'var(--radius-card, 10px)',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.08)',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            boxSizing: 'border-box',
          }}
          onMouseDown={(e) => e.stopPropagation()}
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
              stroke="#64748B"
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
                backgroundColor: 'var(--surface-subtle, #F1F5F9)',
                border: '1px solid var(--border-strong, #CBD5E1)',
                borderRadius: '6px',
                padding: '0.45rem 0.65rem 0.45rem 2rem',
                color: 'var(--foreground, #1F2937)',
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
                  color: 'var(--primary, #0F766E)',
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
                    border: '2px solid var(--primary, #0F766E)',
                    borderRightColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite',
                  }}
                />
                Loading data from server...
              </div>
            ) : filteredOptions.length === 0 ? (
              <div style={{ padding: '0.85rem', textAlign: 'center', color: 'var(--muted-foreground, #64748B)', fontSize: '0.8rem' }}>
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
                      color: 'var(--muted-foreground, #64748B)',
                      fontStyle: 'italic',
                      backgroundColor: 'transparent',
                      transition: 'background-color 0.1s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-hover, #F8FAFC)')}
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
                        backgroundColor: isSelected ? 'var(--surface-selected, #F0FDFA)' : 'transparent',
                        color: isSelected ? 'var(--primary, #0F766E)' : 'var(--foreground, #1F2937)',
                        border: isSelected ? '1px solid var(--primary-border, #99F6E4)' : '1px solid transparent',
                        transition: 'background-color 0.1s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--surface-hover, #F8FAFC)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', overflow: 'hidden' }}>
                        <span style={{ fontWeight: isSelected ? 700 : 500 }}>{opt.label}</span>
                        {opt.subLabel && (
                          <span style={{ fontSize: '0.725rem', color: isSelected ? 'var(--primary, #0F766E)' : 'var(--muted-foreground, #64748B)' }}>
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
                            backgroundColor: isSelected ? 'var(--primary-border, #99F6E4)' : 'var(--surface-subtle, #F1F5F9)',
                            color: isSelected ? 'var(--primary-active, #134E4A)' : 'var(--foreground-secondary, #475569)',
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
        </div>,
        document.body
      )}

      {error && <span style={{ fontSize: '0.75rem', color: 'var(--danger, #BE123C)', marginTop: '0.1rem' }}>{error}</span>}
      {helperText && !error && (
        <span style={{ fontSize: '0.725rem', color: 'var(--muted-foreground, #64748B)', marginTop: '0.1rem' }}>{helperText}</span>
      )}
    </div>
  );
}
