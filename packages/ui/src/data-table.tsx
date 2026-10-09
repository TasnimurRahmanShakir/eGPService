'use client';

import React from 'react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T | string;
  cell?: (item: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor?: (item: T, index: number) => string | number;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  headerActions?: React.ReactNode;
  isLoading?: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  tableClassName?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  searchPlaceholder = 'Search records...',
  searchValue,
  onSearchChange,
  headerActions,
  isLoading = false,
  emptyTitle = 'No records found',
  emptySubtitle = 'Try adjusting your search or filters to find what you are looking for.',
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
  tableClassName = '',
}: DataTableProps<T>) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: 'var(--surface, #FFFFFF)',
        border: '1px solid var(--border, #E2E8F0)',
        borderRadius: 'var(--radius-card, 10px)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
      }}
      className={`egp-data-table-container ${className}`}
    >
      {/* Table Toolbar */}
      {(onSearchChange || headerActions) && (
        <div
          style={{
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            borderBottom: '1px solid var(--border, #E2E8F0)',
            flexWrap: 'wrap',
          }}
        >
          {onSearchChange ? (
            <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue ?? ''}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem',
                  fontSize: '0.875rem',
                  backgroundColor: 'var(--input-bg, #FFFFFF)',
                  border: '1px solid var(--border-strong, #CBD5E1)',
                  borderRadius: 'var(--radius-control, 8px)',
                  color: 'var(--foreground, #1F2937)',
                  outline: 'none',
                  transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary, #0F766E)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(15, 118, 110, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-strong, #CBD5E1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          ) : <div />}

          {headerActions && <div>{headerActions}</div>}
        </div>
      )}

      {/* Table Body with Performance Optimization (Step 3: content-visibility & contain: paint) */}
      <div
        style={{
          overflowX: 'auto',
          width: '100%',
          contain: 'paint',
          contentVisibility: 'auto',
          containIntrinsicSize: '800px 450px',
        }}
        className="data-table-container"
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.875rem',
          }}
          className={`egp-table ${tableClassName}`}
        >
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--surface-subtle, #F1F5F9)',
                borderBottom: '1px solid var(--border, #E2E8F0)',
              }}
            >
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{
                    padding: '0.75rem 1rem',
                    color: 'var(--foreground-secondary, #475569)',
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    textAlign: col.align || 'left',
                    width: col.width,
                    whiteSpace: 'nowrap',
                  }}
                  className={col.className}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: '3.5rem', textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        border: '2.5px solid var(--primary, #0F766E)',
                        borderRightColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.6s linear infinite',
                      }}
                    />
                    <span style={{ color: 'var(--muted-foreground, #64748B)', fontSize: '0.85rem' }}>Loading records...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                    <h4 style={{ color: 'var(--foreground, #1F2937)', fontSize: '1rem', fontWeight: 600 }}>{emptyTitle}</h4>
                    <p style={{ color: 'var(--muted-foreground, #64748B)', fontSize: '0.85rem', maxWidth: '380px' }}>{emptySubtitle}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, rowIdx) => (
                <tr
                  key={keyExtractor ? keyExtractor(item, rowIdx) : rowIdx}
                  style={{
                    borderBottom: '1px solid var(--border, #E2E8F0)',
                    transition: 'background-color var(--duration-fast) var(--ease-standard)',
                    backgroundColor: 'var(--surface, #FFFFFF)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-hover, #F8FAFC)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface, #FFFFFF)')}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      style={{
                        padding: '0.85rem 1rem',
                        color: 'var(--foreground, #1F2937)',
                        textAlign: col.align || 'left',
                        verticalAlign: 'middle',
                      }}
                      className={col.className}
                    >
                      {col.cell
                        ? col.cell(item, rowIdx)
                        : col.accessorKey
                          ? String((item as Record<string, unknown>)[col.accessorKey as string] ?? '')
                          : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && onPageChange && (
        <div
          style={{
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--admin-border, #E2E8F0)',
            fontSize: '0.815rem',
            color: 'var(--text-muted, #64748B)',
            backgroundColor: '#F8FAFC',
          }}
        >
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              style={{
                padding: '0.35rem 0.75rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--admin-border, #CBD5E1)',
                borderRadius: '6px',
                color: currentPage <= 1 ? '#94A3B8' : 'var(--text-main, #0F172A)',
                cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                fontWeight: 500,
              }}
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              style={{
                padding: '0.35rem 0.75rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--admin-border, #CBD5E1)',
                borderRadius: '6px',
                color: currentPage >= totalPages ? '#94A3B8' : 'var(--text-main, #0F172A)',
                cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                fontWeight: 500,
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
