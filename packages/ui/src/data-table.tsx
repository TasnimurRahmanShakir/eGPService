'use client';

import React from 'react';

export interface Column<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor?: (item: T, index: number) => string | number;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
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
        backgroundColor: 'rgba(11, 17, 32, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
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
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.85rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  outline: 'none',
                }}
              />
            </div>
          ) : <div />}

          {headerActions && <div>{headerActions}</div>}
        </div>
      )}

      {/* Table Body */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
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
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{
                    padding: '0.75rem 1rem',
                    color: '#94a3b8',
                    fontWeight: 600,
                    fontSize: '0.785rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
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
                <td colSpan={columns.length} style={{ padding: '3rem', textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        border: '2.5px solid #38bdf8',
                        borderRightColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.6s linear infinite',
                      }}
                    />
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Loading records...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                    <h4 style={{ color: '#f8fafc', fontSize: '1rem', fontWeight: 600 }}>{emptyTitle}</h4>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', maxWidth: '380px' }}>{emptySubtitle}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, rowIdx) => (
                <tr
                  key={keyExtractor ? keyExtractor(item, rowIdx) : rowIdx}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.35)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      style={{
                        padding: '0.85rem 1rem',
                        color: '#f8fafc',
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
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.815rem',
            color: '#94a3b8',
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
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                color: currentPage <= 1 ? '#475569' : '#f8fafc',
                cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
              }}
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              style={{
                padding: '0.35rem 0.75rem',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                color: currentPage >= totalPages ? '#475569' : '#f8fafc',
                cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
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
