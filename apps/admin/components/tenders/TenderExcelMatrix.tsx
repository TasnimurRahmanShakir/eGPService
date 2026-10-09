'use client';

import React, { useState } from 'react';
import { CreditCard, Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react';
import { Button, MoneyDisplay } from '@egp/ui';
import type { TenderDto, TendererMappingDto } from '@egp/api-client';

interface TenderExcelMatrixProps {
  tenders: TenderDto[];
  onRecordPayment: (tender: TenderDto, tendererId?: number, dueAmount?: number, tendererName?: string) => void;
  onEditTender?: (tender: TenderDto) => void;
  onAddTenderer?: (tender: TenderDto) => void;
  onEditTenderer?: (tenderId: number, mapping: TendererMappingDto) => void;
  onRemoveTenderer?: (tenderId: number, tendererId: number, tendererName: string) => void;
}

export function TenderExcelMatrix({
  tenders,
  onRecordPayment,
  onEditTender,
  onAddTenderer,
  onEditTenderer,
  onRemoveTenderer,
}: TenderExcelMatrixProps) {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (key: string) => {
    setShowPasswords((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderStatus = (val: boolean | null | undefined, label?: string) => {
    if (val === true) {
      return (
        <span
          style={{
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: 'var(--success-bg, #ECFDF5)',
            color: 'var(--success, #047857)',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'lowercase',
            border: '1px solid var(--success-border, #A7F3D0)',
          }}
        >
          {label || 'ok'}
        </span>
      );
    }
    if (val === false) {
      return (
        <span
          style={{
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: 'var(--danger-bg, #FFF1F2)',
            color: 'var(--danger, #BE123C)',
            fontSize: '0.75rem',
            fontWeight: 700,
            border: '1px solid var(--danger-border, #FECDD3)',
          }}
        >
          No
        </span>
      );
    }
    return (
      <span
        style={{
          display: 'inline-block',
          padding: '2px 6px',
          borderRadius: '4px',
          backgroundColor: 'var(--surface-subtle, #F1F5F9)',
          color: 'var(--foreground-secondary, #475569)',
          fontSize: '0.75rem',
          fontWeight: 600,
          border: '1px solid var(--border, #E2E8F0)',
        }}
      >
        NA
      </span>
    );
  };

  const formatLiquidAsset = (val: number) => {
    if (!val || val === 0) return '—';
    if (val >= 10000000) {
      return `Tk. ${(val / 10000000).toFixed(2)} Crore`;
    }
    if (val >= 100000) {
      return `Tk. ${(val / 100000).toFixed(2)} Lakh`;
    }
    return `Tk. ${val.toLocaleString()}`;
  };

  if (tenders.length === 0) {
    return (
      <div
        style={{
          padding: '3rem 1.5rem',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          boxShadow: 'var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05))',
        }}
      >
        <p style={{ color: '#64748B', fontSize: '0.95rem' }}>No tender records found matching your filters.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        overflowX: 'auto',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        backgroundColor: '#FFFFFF',
        boxShadow: 'var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05))',
        contain: 'paint',
        contentVisibility: 'auto',
        containIntrinsicSize: '1200px 600px',
      }}
      className="tender-matrix-scroll-container"
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          textAlign: 'left',
          fontSize: '0.8rem',
          color: 'var(--foreground, #1F2937)',
        }}
        className="tender-matrix-table"
      >
        <thead>
          {/* Header Level 1: Category Banners */}
          <tr style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #CBD5E1' }}>
            <th
              colSpan={3}
              style={{
                ...headerCellStyle,
                position: 'sticky',
                left: 0,
                zIndex: 35,
                width: '338px',
                minWidth: '338px',
                maxWidth: '338px',
                backgroundColor: '#F1F5F9',
                textAlign: 'center',
                color: '#475569',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                borderRight: '2px solid #CBD5E1',
                boxShadow: '4px 0 8px -2px rgba(15, 23, 42, 0.05)',
              }}
            >
              TENDER GENERAL
            </th>
            <th
              colSpan={2}
              style={{
                ...headerCellStyle,
                textAlign: 'center',
                color: '#475569',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                backgroundColor: '#F1F5F9',
              }}
            >
              TIMELINE & DEPT
            </th>
            <th colSpan={11} style={{ ...headerCellStyle, textAlign: 'center', color: '#0F766E', fontSize: '0.75rem', letterSpacing: '0.05em', backgroundColor: '#F1F5F9' }}>
              eGP LICENSE PARTICIPATION MATRIX & CHECKLISTS
            </th>
            <th colSpan={2} style={{ ...headerCellStyle, textAlign: 'center', color: '#0F766E', fontSize: '0.75rem', letterSpacing: '0.05em', backgroundColor: '#F1F5F9' }}>
              ASSETS & APP
            </th>
            <th colSpan={4} style={{ ...headerCellStyle, textAlign: 'center', color: '#0F766E', fontSize: '0.75rem', letterSpacing: '0.05em', backgroundColor: '#F1F5F9' }}>
              PER-LICENSE FINANCIALS & ACTIONS
            </th>
          </tr>

          {/* Header Level 2: Specific Column Names */}
          <tr style={{ backgroundColor: '#F8FAFC', color: '#334155', fontWeight: 600, fontSize: '0.75rem', borderBottom: '1px solid #CBD5E1' }}>
            <th
              style={{
                ...headerCellStyle,
                position: 'sticky',
                left: 0,
                zIndex: 30,
                width: '48px',
                minWidth: '48px',
                maxWidth: '48px',
                textAlign: 'center',
                backgroundColor: '#F8FAFC',
                color: '#334155',
              }}
            >
              Sl
            </th>
            <th
              style={{
                ...headerCellStyle,
                position: 'sticky',
                left: '48px',
                zIndex: 30,
                width: '140px',
                minWidth: '140px',
                maxWidth: '140px',
                backgroundColor: '#F8FAFC',
                color: '#334155',
              }}
            >
              Client
            </th>
            <th
              style={{
                ...headerCellStyle,
                position: 'sticky',
                left: '188px',
                zIndex: 30,
                width: '150px',
                minWidth: '150px',
                maxWidth: '150px',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                borderRight: '2px solid #CBD5E1',
                boxShadow: '4px 0 8px -2px rgba(15, 23, 42, 0.05)',
              }}
            >
              Tender ID
            </th>
            <th style={{ ...headerCellStyle, minWidth: '130px', backgroundColor: '#F8FAFC', color: '#334155' }}>Closing Date & Time</th>
            <th style={{ ...headerCellStyle, minWidth: '130px', backgroundColor: '#F8FAFC', color: '#334155' }}>Department</th>

            {/* License specific headers */}
            <th style={{ ...headerCellStyle, minWidth: '160px', backgroundColor: '#F8FAFC', color: '#334155' }}>eGP License</th>
            <th style={{ ...headerCellStyle, minWidth: '110px', textAlign: 'center', backgroundColor: '#F8FAFC', color: '#334155' }}>Password</th>
            <th style={{ ...headerCellStyle, minWidth: '70px', textAlign: 'center', backgroundColor: '#F8FAFC', color: '#334155' }}>Liquid 1</th>
            <th style={{ ...headerCellStyle, minWidth: '70px', textAlign: 'center', backgroundColor: '#F8FAFC', color: '#334155' }}>Liquid 2</th>
            <th style={{ ...headerCellStyle, minWidth: '70px', textAlign: 'center', backgroundColor: '#F8FAFC', color: '#334155' }}>Liquid 3</th>
            <th style={{ ...headerCellStyle, minWidth: '60px', textAlign: 'center', backgroundColor: '#F8FAFC', color: '#334155' }}>JVCA</th>
            <th style={{ ...headerCellStyle, minWidth: '60px', textAlign: 'center', backgroundColor: '#F8FAFC', color: '#334155' }}>Fill</th>
            <th style={{ ...headerCellStyle, minWidth: '60px', textAlign: 'center', backgroundColor: '#F8FAFC', color: '#334155' }}>Map</th>
            <th style={{ ...headerCellStyle, minWidth: '60px', textAlign: 'center', backgroundColor: '#F8FAFC', color: '#334155' }}>Rate</th>
            <th style={{ ...headerCellStyle, minWidth: '75px', textAlign: 'center', backgroundColor: '#F8FAFC', color: '#334155' }}>Less %</th>
            <th style={{ ...headerCellStyle, minWidth: '60px', textAlign: 'center', backgroundColor: '#F8FAFC', color: '#334155' }}>Submit</th>

            {/* Assets & APP */}
            <th style={{ ...headerCellStyle, minWidth: '130px', backgroundColor: '#F8FAFC', color: '#334155' }}>Liquid Assets</th>
            <th style={{ ...headerCellStyle, minWidth: '100px', backgroundColor: '#F8FAFC', color: '#334155' }}>APP Code</th>

            {/* Per-license financials & actions */}
            <th style={{ ...headerCellStyle, minWidth: '95px', textAlign: 'right', backgroundColor: '#F8FAFC', color: '#334155' }}>Charge (৳)</th>
            <th style={{ ...headerCellStyle, minWidth: '95px', textAlign: 'right', backgroundColor: '#F8FAFC', color: '#334155' }}>Paid (৳)</th>
            <th style={{ ...headerCellStyle, minWidth: '95px', textAlign: 'right', backgroundColor: '#F8FAFC', color: '#334155' }}>Due (৳)</th>
            <th style={{ ...headerCellStyle, minWidth: '140px', textAlign: 'center', backgroundColor: '#F8FAFC', color: '#334155' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender, tIdx) => {
            const mappings = tender.tenderers || [];
            const rowCount = mappings.length > 0 ? mappings.length : 1;
            const closingDate = new Date(tender.closingDateTimeUtc);
            const rowBg = tIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';

            return (mappings.length > 0 ? mappings : [null]).map((m, mIdx) => {
              const isFirstRowOfTender = mIdx === 0;
              const pwdKey = `${tender.id}-${m?.tendererId}`;
              const isPwdVisible = showPasswords[pwdKey];
              const displayPassword = m?.password;

              return (
                <tr
                  key={`${tender.id}-${m ? m.tendererId : 'empty'}`}
                  className="tender-matrix-row"
                  style={{
                    backgroundColor: rowBg,
                    borderBottom: mIdx === rowCount - 1 ? '1px solid #CBD5E1' : '1px solid #F1F5F9',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {/* Rowspanned Tender General Columns */}
                  {isFirstRowOfTender && (
                    <>
                      <td
                        rowSpan={rowCount}
                        style={{
                          ...cellStyle,
                          position: 'sticky',
                          left: 0,
                          zIndex: 20,
                          width: '48px',
                          minWidth: '48px',
                          maxWidth: '48px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          fontWeight: 700,
                          color: '#64748B',
                          backgroundColor: rowBg,
                        }}
                      >
                        {tIdx + 1}
                      </td>

                      <td
                        rowSpan={rowCount}
                        style={{
                          ...cellStyle,
                          position: 'sticky',
                          left: '48px',
                          zIndex: 20,
                          width: '140px',
                          minWidth: '140px',
                          maxWidth: '140px',
                          verticalAlign: 'middle',
                          fontWeight: 600,
                          color: tender.clientName ? '#1F2937' : '#64748B',
                          backgroundColor: rowBg,
                          whiteSpace: 'normal',
                          wordBreak: 'break-word',
                        }}
                      >
                        {tender.clientName || '— Unassigned —'}
                      </td>

                      <td
                        rowSpan={rowCount}
                        style={{
                          ...cellStyle,
                          position: 'sticky',
                          left: '188px',
                          zIndex: 20,
                          width: '150px',
                          minWidth: '150px',
                          maxWidth: '150px',
                          verticalAlign: 'middle',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: '#1F2937',
                          backgroundColor: rowBg,
                          borderRight: '2px solid #CBD5E1',
                          boxShadow: '4px 0 8px -2px rgba(15, 23, 42, 0.05)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '0.3rem',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.86rem',
                              fontWeight: 800,
                              color: '#1F2937',
                              fontFamily: "'JetBrains Mono', monospace",
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {tender.tenderId}
                          </span>
                          {onEditTender && (
                            <button
                              type="button"
                              onClick={() => onEditTender(tender)}
                              title="Edit Tender"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                padding: '2px 7px',
                                borderRadius: '4px',
                                border: '1px solid #CBD5E1',
                                backgroundColor: '#FFFFFF',
                                color: '#334155',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.15s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#0F766E';
                                e.currentTarget.style.color = '#0F766E';
                                e.currentTarget.style.backgroundColor = '#F0FDFA';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#CBD5E1';
                                e.currentTarget.style.color = '#334155';
                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                              }}
                            >
                              <Pencil size={10} /> Edit Tender
                            </button>
                          )}
                        </div>
                      </td>

                      <td
                        rowSpan={rowCount}
                        style={{
                          ...cellStyle,
                          verticalAlign: 'middle',
                          fontSize: '0.78rem',
                        }}
                      >
                        <div style={{ color: '#1F2937', fontWeight: 600 }}>{closingDate.toLocaleDateString()}</div>
                        <div style={{ color: '#64748B' }}>
                          {closingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      <td
                        rowSpan={rowCount}
                        style={{
                          ...cellStyle,
                          verticalAlign: 'middle',
                          color: '#475569',
                        }}
                      >
                        {tender.department}
                      </td>
                    </>
                  )
                  }

                  {/* If no licenses assigned to this tender yet */}
                  {!m ? (
                    <>
                      <td colSpan={11} style={{ ...cellStyle, textAlign: 'center', color: '#64748B', fontStyle: 'italic', padding: '1rem' }}>
                        No eGP license added yet.{' '}
                        {onAddTenderer && (
                          <button
                            type="button"
                            onClick={() => onAddTenderer(tender)}
                            style={{
                              marginLeft: '0.5rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '3px 8px',
                              borderRadius: '5px',
                              backgroundColor: '#F0FDFA',
                              border: '1px solid #99F6E4',
                              color: '#0F766E',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            <Plus size={12} /> Add New License
                          </button>
                        )}
                      </td>
                      <td style={{ ...cellStyle, verticalAlign: 'middle', color: '#047857', fontWeight: 600 }}>
                        {formatLiquidAsset(tender.liquidAssetAmount)}
                      </td>
                      <td style={{ ...cellStyle, verticalAlign: 'middle', fontFamily: 'monospace', color: '#64748B' }}>
                        {tender.appCode || '—'}
                      </td>
                      <td style={{ ...cellStyle, textAlign: 'right', color: '#64748B' }}>—</td>
                      <td style={{ ...cellStyle, textAlign: 'right', color: '#64748B' }}>—</td>
                      <td style={{ ...cellStyle, textAlign: 'right', color: '#64748B' }}>—</td>
                      <td style={{ ...cellStyle, textAlign: 'center', color: '#64748B' }}>
                        —
                      </td>
                    </>
                  ) : (
                    <>
                      {/* License specific items */}
                      <td style={{ ...cellStyle, fontWeight: 600, color: '#1F2937' }}>
                        <span style={{ color: '#1F2937', fontWeight: 700 }}>{m.tendererName}</span>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'monospace' }}>
                          {m.username}
                        </div>
                      </td>

                      {/* Password Column */}
                      <td style={{ ...cellStyle, textAlign: 'center' }}>
                        {displayPassword ? (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                            <span
                              style={{
                                fontFamily: 'monospace',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                color: '#92400E',
                                backgroundColor: '#FFFBEB',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                border: '1px solid #FDE68A',
                              }}
                            >
                              {isPwdVisible ? displayPassword : '••••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(pwdKey)}
                              title={isPwdVisible ? 'Hide password' : 'Show actual password'}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#64748B',
                                padding: '2px',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              {isPwdVisible ? <EyeOff size={13} /> : <Eye size={13} />}
                            </button>
                          </div>
                        ) : (
                          <span style={{ color: '#475569', fontSize: '0.75rem' }}>—</span>
                        )}
                      </td>

                      {/* 3 Fixed Liquid Columns */}
                      <td style={{ ...cellStyle, textAlign: 'center' }}>
                        {renderStatus(m.liquid1Status, 'ok')}
                      </td>
                      <td style={{ ...cellStyle, textAlign: 'center' }}>
                        {renderStatus(m.liquid2Status, 'ok')}
                      </td>
                      <td style={{ ...cellStyle, textAlign: 'center' }}>
                        {renderStatus(m.liquid3Status, 'ok')}
                      </td>

                      {/* Checklists */}
                      <td style={{ ...cellStyle, textAlign: 'center' }}>{renderStatus(m.jvcaStatus, 'ok')}</td>
                      <td style={{ ...cellStyle, textAlign: 'center' }}>{renderStatus(m.fillStatus, 'ok')}</td>
                      <td style={{ ...cellStyle, textAlign: 'center' }}>{renderStatus(m.mapStatus, 'ok')}</td>
                      <td style={{ ...cellStyle, textAlign: 'center' }}>{renderStatus(m.rateStatus, 'ok')}</td>

                      {/* Less % */}
                      <td style={{ ...cellStyle, textAlign: 'center' }}>
                        {m.lessPercentage !== null && m.lessPercentage !== undefined ? (
                          <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#92400E' }}>
                            {Number(m.lessPercentage).toFixed(3)}
                          </span>
                        ) : (
                          <span style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 600 }}>NA</span>
                        )}
                      </td>

                      {/* Submit (between Less % and Liquid Assets) */}
                      <td style={{ ...cellStyle, textAlign: 'center' }}>{renderStatus(m.submitStatus, 'ok')}</td>

                      {/* Liquid Assets & APP Code (Rowspanned per tender) */}
                      {isFirstRowOfTender && (
                        <>
                          <td
                            rowSpan={rowCount}
                            style={{
                              ...cellStyle,
                              verticalAlign: 'middle',
                              color: '#047857',
                              fontWeight: 600,
                            }}
                          >
                            {formatLiquidAsset(tender.liquidAssetAmount)}
                          </td>

                          <td
                            rowSpan={rowCount}
                            style={{
                              ...cellStyle,
                              verticalAlign: 'middle',
                              fontFamily: 'monospace',
                              color: '#64748B',
                            }}
                          >
                            {tender.appCode || '—'}
                          </td>
                        </>
                      )}

                      {/* Financial Columns strictly PER TENDERER */}
                      <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'monospace' }}>
                        <MoneyDisplay amount={m.chargeAmount} size="sm" />
                      </td>

                      <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'monospace' }}>
                        {m.totalPaid > 0 ? (
                          <MoneyDisplay amount={m.totalPaid} type="advance" size="sm" />
                        ) : (
                          <span style={{ color: '#475569' }}>—</span>
                        )}
                      </td>

                      <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'monospace' }}>
                        <MoneyDisplay
                          amount={m.dueAmount}
                          type={m.dueAmount > 0 ? 'due' : 'neutral'}
                          size="sm"
                        />
                      </td>

                      {/* Actions PER LICENSE */}
                      <td style={{ ...cellStyle, textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          {onAddTenderer && isFirstRowOfTender && (
                            <button
                              type="button"
                              onClick={() => onAddTenderer(tender)}
                              title="Add another license to this tender"
                              style={{
                                padding: '3px 7px',
                                borderRadius: '5px',
                                border: '1px solid #99F6E4',
                                backgroundColor: '#F0FDFA',
                                color: '#0F766E',
                                cursor: 'pointer',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              <Plus size={11} /> Add License
                            </button>
                          )}

                          {onEditTenderer && (
                            <button
                              type="button"
                              onClick={() => onEditTenderer(tender.id, m)}
                              title="Edit License Settings"
                              style={{
                                padding: '4px 7px',
                                borderRadius: '5px',
                                border: '1px solid #CBD5E1',
                                backgroundColor: '#FFFFFF',
                                color: '#1F2937',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                              }}
                            >
                              <Pencil size={11} /> Edit
                            </button>
                          )}

                          <Button
                            size="sm"
                            variant={m.dueAmount > 0 ? 'primary' : 'secondary'}
                            icon={<CreditCard size={11} />}
                            onClick={() => onRecordPayment(tender, m.tendererId, m.dueAmount, m.tendererName)}
                          >
                            {m.dueAmount > 0 ? 'Pay' : 'Paid'}
                          </Button>

                          {onRemoveTenderer && (() => {
                            const hasPayments = (m.totalPaid > 0) || (m.chargeAmount !== m.dueAmount);
                            return (
                              <button
                                type="button"
                                disabled={hasPayments}
                                onClick={() => {
                                  if (!hasPayments) {
                                    onRemoveTenderer(tender.id, m.tendererId, m.tendererName);
                                  }
                                }}
                                title={
                                  hasPayments
                                    ? `Cannot remove license because payments (৳${m.totalPaid.toLocaleString()}) have already been recorded.`
                                    : 'Remove license from this tender'
                                }
                                style={{
                                  padding: '4px 6px',
                                  borderRadius: '5px',
                                  border: hasPayments ? '1px solid #E2E8F0' : '1px solid #FECDD3',
                                  backgroundColor: hasPayments ? '#F1F5F9' : '#FFF1F2',
                                  color: hasPayments ? '#94A3B8' : '#BE123C',
                                  cursor: hasPayments ? 'not-allowed' : 'pointer',
                                  fontSize: '0.75rem',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  opacity: hasPayments ? 0.45 : 1,
                                }}
                              >
                                <Trash2 size={12} />
                              </button>
                            );
                          })()}
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
}

const headerCellStyle: React.CSSProperties = {
  padding: '0.65rem 0.65rem',
  borderRight: '1px solid #E2E8F0',
  borderBottom: '1px solid #CBD5E1',
  textTransform: 'none',
  whiteSpace: 'nowrap',
};

const cellStyle: React.CSSProperties = {
  padding: '0.65rem',
  borderRight: '1px solid #F1F5F9',
  borderBottom: '1px solid #F1F5F9',
  whiteSpace: 'nowrap',
};
