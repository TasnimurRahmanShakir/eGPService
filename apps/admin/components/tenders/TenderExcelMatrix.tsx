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
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#34d399',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'lowercase',
            border: '1px solid rgba(16, 185, 129, 0.3)',
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
            backgroundColor: 'rgba(244, 63, 94, 0.15)',
            color: '#fb7185',
            fontSize: '0.75rem',
            fontWeight: 700,
            border: '1px solid rgba(244, 63, 94, 0.3)',
          }}
        >
          No
        </span>
      );
    }
    return (
      <span style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 600 }}>NA</span>
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
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>No tender records found matching your filters.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        overflowX: 'auto',
        borderRadius: '10px',
        border: '1px solid #334155',
        backgroundColor: '#090d16',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: '0.8rem',
          color: '#e2e8f0',
        }}
      >
        <thead>
          {/* Header Level 1: Category Banners */}
          <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
            <th colSpan={5} style={{ ...headerCellStyle, textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              TENDER GENERAL METRICS
            </th>
            <th colSpan={11} style={{ ...headerCellStyle, textAlign: 'center', color: '#38bdf8', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              eGP LICENSE PARTICIPATION MATRIX & CHECKLISTS
            </th>
            <th colSpan={2} style={{ ...headerCellStyle, textAlign: 'center', color: '#34d399', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              ASSETS & APP
            </th>
            <th colSpan={4} style={{ ...headerCellStyle, textAlign: 'center', color: '#f59e0b', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              PER-LICENSE FINANCIALS & ACTIONS
            </th>
          </tr>

          {/* Header Level 2: Specific Column Names */}
          <tr style={{ backgroundColor: '#1e293b', color: '#f8fafc', fontWeight: 700, fontSize: '0.78rem' }}>
            <th style={{ ...headerCellStyle, width: '40px', textAlign: 'center' }}>Sl</th>
            <th style={{ ...headerCellStyle, minWidth: '140px' }}>Client</th>
            <th style={{ ...headerCellStyle, minWidth: '135px' }}>Tender ID</th>
            <th style={{ ...headerCellStyle, minWidth: '130px' }}>Closing Date & Time</th>
            <th style={{ ...headerCellStyle, minWidth: '130px' }}>Department</th>

            {/* License specific headers */}
            <th style={{ ...headerCellStyle, minWidth: '160px' }}>eGP License</th>
            <th style={{ ...headerCellStyle, minWidth: '110px', textAlign: 'center' }}>Password</th>
            <th style={{ ...headerCellStyle, minWidth: '70px', textAlign: 'center' }}>Liquid 1</th>
            <th style={{ ...headerCellStyle, minWidth: '70px', textAlign: 'center' }}>Liquid 2</th>
            <th style={{ ...headerCellStyle, minWidth: '70px', textAlign: 'center' }}>Liquid 3</th>
            <th style={{ ...headerCellStyle, minWidth: '60px', textAlign: 'center' }}>JVCA</th>
            <th style={{ ...headerCellStyle, minWidth: '60px', textAlign: 'center' }}>Fill</th>
            <th style={{ ...headerCellStyle, minWidth: '60px', textAlign: 'center' }}>Map</th>
            <th style={{ ...headerCellStyle, minWidth: '60px', textAlign: 'center' }}>Rate</th>
            <th style={{ ...headerCellStyle, minWidth: '75px', textAlign: 'center' }}>Less %</th>
            <th style={{ ...headerCellStyle, minWidth: '60px', textAlign: 'center' }}>Submit</th>

            {/* Assets & APP */}
            <th style={{ ...headerCellStyle, minWidth: '130px' }}>Liquid Assets</th>
            <th style={{ ...headerCellStyle, minWidth: '100px' }}>APP Code</th>

            {/* Per-license financials & actions */}
            <th style={{ ...headerCellStyle, minWidth: '95px', textAlign: 'right' }}>Charge (৳)</th>
            <th style={{ ...headerCellStyle, minWidth: '95px', textAlign: 'right' }}>Paid (৳)</th>
            <th style={{ ...headerCellStyle, minWidth: '95px', textAlign: 'right' }}>Due (৳)</th>
            <th style={{ ...headerCellStyle, minWidth: '140px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender, tIdx) => {
            const mappings = tender.tenderers || [];
            const rowCount = mappings.length > 0 ? mappings.length : 1;
            const closingDate = new Date(tender.closingDateTimeUtc);

            return (mappings.length > 0 ? mappings : [null]).map((m, mIdx) => {
              const isFirstRowOfTender = mIdx === 0;
              const pwdKey = `${tender.id}-${m?.tendererId}`;
              const isPwdVisible = showPasswords[pwdKey];
              const displayPassword = m?.password;

              return (
                <tr
                  key={`${tender.id}-${m ? m.tendererId : 'empty'}`}
                  style={{
                    backgroundColor: tIdx % 2 === 0 ? 'rgba(15, 23, 42, 0.4)' : 'rgba(30, 41, 59, 0.25)',
                    borderBottom: isFirstRowOfTender && rowCount === 1 ? '1px solid #334155' : mIdx === rowCount - 1 ? '2px solid #475569' : '1px solid rgba(51, 65, 85, 0.4)',
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
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          fontWeight: 700,
                          color: '#64748b',
                        }}
                      >
                        {tIdx + 1}
                      </td>

                      <td
                        rowSpan={rowCount}
                        style={{
                          ...cellStyle,
                          verticalAlign: 'middle',
                          fontWeight: 700,
                          color: tender.clientName ? '#38bdf8' : '#64748b',
                        }}
                      >
                        {tender.clientName || '— Unassigned —'}
                      </td>

                      <td
                        rowSpan={rowCount}
                        style={{
                          ...cellStyle,
                          verticalAlign: 'middle',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: '#f8fafc',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f8fafc' }}>{tender.tenderId}</span>
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
                                border: '1px solid rgba(148, 163, 184, 0.3)',
                                backgroundColor: 'rgba(51, 65, 85, 0.4)',
                                color: '#cbd5e1',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.15s ease',
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
                    <div style={{ color: '#f8fafc' }}>{closingDate.toLocaleDateString()}</div>
                    <div style={{ color: '#94a3b8' }}>
                      {closingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>

                  <td
                    rowSpan={rowCount}
                    style={{
                      ...cellStyle,
                      verticalAlign: 'middle',
                      color: '#cbd5e1',
                    }}
                  >
                    {tender.department}
                  </td>
                </>
              )
            }

                  {/* If no licenses assigned to this tender yet */ }
                  {!m ? (
              <>
                <td colSpan={11} style={{ ...cellStyle, textAlign: 'center', color: '#94a3b8', fontStyle: 'italic', padding: '1rem' }}>
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
                        backgroundColor: 'rgba(56, 189, 248, 0.15)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        color: '#38bdf8',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <Plus size={12} /> Add New License
                    </button>
                  )}
                </td>
                <td style={{ ...cellStyle, verticalAlign: 'middle', color: '#34d399', fontWeight: 600 }}>
                  {formatLiquidAsset(tender.liquidAssetAmount)}
                </td>
                <td style={{ ...cellStyle, verticalAlign: 'middle', fontFamily: 'monospace', color: '#cbd5e1' }}>
                  {tender.appCode || '—'}
                </td>
                <td style={{ ...cellStyle, textAlign: 'right', color: '#64748b' }}>—</td>
                <td style={{ ...cellStyle, textAlign: 'right', color: '#64748b' }}>—</td>
                <td style={{ ...cellStyle, textAlign: 'right', color: '#64748b' }}>—</td>
                <td style={{ ...cellStyle, textAlign: 'center', color: '#64748b' }}>
                  —
                </td>
              </>
            ) : (
              <>
                {/* License specific items */}
                <td style={{ ...cellStyle, fontWeight: 600, color: '#f1f5f9' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>{m.tendererName}</span>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'monospace' }}>
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
                          color: '#fbbf24',
                          backgroundColor: 'rgba(251, 191, 36, 0.1)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          border: '1px solid rgba(251, 191, 36, 0.25)',
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
                          color: '#94a3b8',
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
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#fbbf24' }}>
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
                        color: '#34d399',
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
                        color: '#cbd5e1',
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
                          border: '1px solid rgba(56, 189, 248, 0.4)',
                          backgroundColor: 'rgba(56, 189, 248, 0.12)',
                          color: '#38bdf8',
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
                          border: '1px solid #334155',
                          backgroundColor: 'rgba(30, 41, 59, 0.7)',
                          color: '#e2e8f0',
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
                      variant={m.dueAmount > 0 ? 'emerald' : 'secondary'}
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
                            border: hasPayments ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid rgba(244, 63, 94, 0.3)',
                            backgroundColor: hasPayments ? 'rgba(148, 163, 184, 0.05)' : 'rgba(244, 63, 94, 0.1)',
                            color: hasPayments ? '#64748b' : '#fb7185',
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
    </div >
  );
}

const headerCellStyle: React.CSSProperties = {
  padding: '0.75rem 0.65rem',
  borderRight: '1px solid #334155',
  borderBottom: '2px solid #334155',
  textTransform: 'none',
  whiteSpace: 'nowrap',
};

const cellStyle: React.CSSProperties = {
  padding: '0.65rem',
  borderRight: '1px solid rgba(51, 65, 85, 0.4)',
  whiteSpace: 'nowrap',
};
