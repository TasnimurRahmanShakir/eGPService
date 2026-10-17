'use client';

import React, { useState } from 'react';
import { CreditCard, Eye, EyeOff, Pencil, Plus, Trash2, UserPlus, Users } from 'lucide-react';
import { Button, MoneyDisplay } from '@egp/ui';
import type { TenderDto, TendererMappingDto, TenderClientDto } from '@egp/api-client';
import { formatLocalDate, formatLocalTime } from '@/lib/date-utils';

interface TenderExcelMatrixProps {
  tenders: TenderDto[];
  onRecordPayment: (
    tender: TenderDto,
    clientId?: number,
    tendererId?: number,
    dueAmount?: number,
    tendererName?: string,
    clientName?: string
  ) => void;
  onEditTender?: (tender: TenderDto) => void;
  onAddClient?: (tender: TenderDto) => void;
  onRemoveClient?: (tenderId: number, clientId: number, clientName: string) => void;
  onAddTenderer?: (tender: TenderDto, clientId?: number) => void;
  onEditTenderer?: (tenderId: number, mapping: TendererMappingDto) => void;
  onRemoveTenderer?: (tenderId: number, tendererId: number, tendererName: string, clientId?: number) => void;
}

export function TenderExcelMatrix({
  tenders,
  onRecordPayment,
  onEditTender,
  onAddClient,
  onRemoveClient,
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
          backgroundColor: 'var(--surface, #FFFFFF)',
          borderRadius: 'var(--radius-card, 10px)',
          border: '1px solid var(--border, #E2E8F0)',
          color: 'var(--muted-foreground, #64748B)',
        }}
      >
        <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--foreground, #1F2937)' }}>
          No tenders found matching criteria.
        </p>
        <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>
          Create a tender using the "New Tender" button above to get started.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        borderRadius: 'var(--radius-card, 10px)',
        border: '1px solid var(--border, #CBD5E1)',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      }}
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
                width: '358px',
                minWidth: '358px',
                maxWidth: '358px',
                backgroundColor: '#F1F5F9',
                textAlign: 'center',
                color: '#475569',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                borderRight: '2px solid #CBD5E1',
                boxShadow: '4px 0 8px -2px rgba(15, 23, 42, 0.05)',
              }}
            >
              TENDER & CLIENT HIERARCHY
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
                width: '150px',
                minWidth: '150px',
                maxWidth: '150px',
                backgroundColor: '#F8FAFC',
                color: '#334155',
              }}
            >
              Tender ID
            </th>
            <th
              style={{
                ...headerCellStyle,
                position: 'sticky',
                left: '198px',
                zIndex: 30,
                width: '160px',
                minWidth: '160px',
                maxWidth: '160px',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                borderRight: '2px solid #CBD5E1',
                boxShadow: '4px 0 8px -2px rgba(15, 23, 42, 0.05)',
              }}
            >
              Participating Client
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
            <th style={{ ...headerCellStyle, minWidth: '150px', textAlign: 'center', backgroundColor: '#F8FAFC', color: '#334155' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender, tIdx) => {
            // Build client groups
            let clientGroups: {
              clientId: number;
              clientName: string;
              phone?: string | null;
              totalCharge: number;
              totalPaid: number;
              totalDue: number;
              tenderers: TendererMappingDto[];
            }[] = [];

            if (tender.clients && tender.clients.length > 0) {
              clientGroups = tender.clients.map((c) => ({
                clientId: c.clientId,
                clientName: c.clientName,
                phone: c.phone,
                totalCharge: c.totalChargeAmount,
                totalPaid: c.totalPaidAmount,
                totalDue: c.totalDueAmount,
                tenderers: c.tenderers || [],
              }));
            } else if (tender.tenderers && tender.tenderers.length > 0) {
              // Fallback grouping by clientId on mappings
              const mapByClient = new Map<number, TendererMappingDto[]>();
              for (const m of tender.tenderers) {
                const cId = m.clientId || tender.clientId || 0;
                if (!mapByClient.has(cId)) mapByClient.set(cId, []);
                mapByClient.get(cId)!.push(m);
              }
              clientGroups = Array.from(mapByClient.entries()).map(([cId, list]) => ({
                clientId: cId,
                clientName: list[0]?.clientName || tender.clientName || 'Assigned Client',
                totalCharge: list.reduce((s, x) => s + x.chargeAmount, 0),
                totalPaid: list.reduce((s, x) => s + x.totalPaid, 0),
                totalDue: list.reduce((s, x) => s + x.dueAmount, 0),
                tenderers: list,
              }));
            } else {
              // No clients or tenderers yet
              clientGroups = [
                {
                  clientId: tender.clientId || 0,
                  clientName: tender.clientName || 'No Client Assigned',
                  totalCharge: 0,
                  totalPaid: 0,
                  totalDue: 0,
                  tenderers: [],
                },
              ];
            }

            // Total row count across all clients for this tender
            const totalTenderRows = clientGroups.reduce(
              (acc, cg) => acc + Math.max(1, cg.tenderers.length),
              0
            );

            const rowBg = tIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
            let tenderRowOffset = 0;

            return clientGroups.map((cg, cgIdx) => {
              const clientRowCount = Math.max(1, cg.tenderers.length);
              const isFirstClientOfTender = cgIdx === 0;

              return (cg.tenderers.length > 0 ? cg.tenderers : [null]).map((m, mIdx) => {
                const isFirstRowOfTender = isFirstClientOfTender && mIdx === 0;
                const isFirstRowOfClient = mIdx === 0;
                const pwdKey = `${tender.id}-${cg.clientId}-${m?.tendererId}`;
                const isPwdVisible = showPasswords[pwdKey];
                const displayPassword = m?.password;

                tenderRowOffset++;

                return (
                  <tr
                    key={`${tender.id}-${cg.clientId}-${m ? m.tendererId : 'empty'}`}
                    className="tender-matrix-row"
                    style={{
                      backgroundColor: rowBg,
                      borderBottom:
                        tenderRowOffset === totalTenderRows
                          ? '2px solid #CBD5E1'
                          : mIdx === clientRowCount - 1
                          ? '1px solid #CBD5E1'
                          : '1px solid #F1F5F9',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    {/* Tender General: Sl */}
                    {isFirstRowOfTender && (
                      <td
                        rowSpan={totalTenderRows}
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
                    )}

                    {/* Tender General: Tender ID & Tender Actions */}
                    {isFirstRowOfTender && (
                      <td
                        rowSpan={totalTenderRows}
                        style={{
                          ...cellStyle,
                          position: 'sticky',
                          left: '48px',
                          zIndex: 20,
                          width: '150px',
                          minWidth: '150px',
                          maxWidth: '150px',
                          verticalAlign: 'middle',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: '#1F2937',
                          backgroundColor: rowBg,
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.35rem' }}>
                          <span
                            style={{
                              fontSize: '0.88rem',
                              fontWeight: 800,
                              color: '#1F2937',
                              fontFamily: "'JetBrains Mono', monospace",
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {tender.tenderId}
                          </span>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {onEditTender && (
                              <button
                                type="button"
                                onClick={() => onEditTender(tender)}
                                title="Edit Tender General Info"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  border: '1px solid #CBD5E1',
                                  backgroundColor: '#FFFFFF',
                                  color: '#334155',
                                  fontSize: '0.7rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                }}
                              >
                                <Pencil size={10} /> Edit
                              </button>
                            )}
                            {onAddClient && (
                              <button
                                type="button"
                                onClick={() => onAddClient(tender)}
                                title="Add another client to this tender"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  border: '1px solid #93C5FD',
                                  backgroundColor: '#EFF6FF',
                                  color: '#1D4ED8',
                                  fontSize: '0.7rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                }}
                              >
                                <UserPlus size={10} /> + Client
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                    )}

                    {/* Client Group Column (Rowspanned per client) */}
                    {isFirstRowOfClient && (
                      <td
                        rowSpan={clientRowCount}
                        style={{
                          ...cellStyle,
                          position: 'sticky',
                          left: '198px',
                          zIndex: 20,
                          width: '160px',
                          minWidth: '160px',
                          maxWidth: '160px',
                          verticalAlign: 'middle',
                          fontWeight: 600,
                          backgroundColor: rowBg,
                          borderRight: '2px solid #CBD5E1',
                          boxShadow: '4px 0 8px -2px rgba(15, 23, 42, 0.05)',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          <span
                            style={{
                              fontSize: '0.825rem',
                              fontWeight: 700,
                              color: cg.clientId > 0 ? '#0F172A' : '#94A3B8',
                              lineHeight: 1.25,
                            }}
                          >
                            {cg.clientName}
                          </span>

                          {cg.clientId > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                              <span
                                style={{
                                  fontSize: '0.7rem',
                                  padding: '1px 5px',
                                  borderRadius: '3px',
                                  backgroundColor: cg.totalDue > 0 ? '#FEF2F2' : '#F0FDF4',
                                  color: cg.totalDue > 0 ? '#B91C1C' : '#15803D',
                                  border: `1px solid ${cg.totalDue > 0 ? '#FECDD3' : '#BBF7D0'}`,
                                  fontWeight: 700,
                                }}
                              >
                                Due: ৳{cg.totalDue.toLocaleString()}
                              </span>

                              {onAddTenderer && (
                                <button
                                  type="button"
                                  onClick={() => onAddTenderer(tender, cg.clientId)}
                                  title={`Add license under ${cg.clientName}`}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '2px',
                                    padding: '1px 5px',
                                    borderRadius: '3px',
                                    border: '1px solid #99F6E4',
                                    backgroundColor: '#F0FDFA',
                                    color: '#0F766E',
                                    fontSize: '0.68rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                  }}
                                >
                                  <Plus size={9} /> Lic
                                </button>
                              )}

                              {onRemoveClient && cg.totalPaid === 0 && (
                                <button
                                  type="button"
                                  onClick={() => onRemoveClient(tender.id, cg.clientId, cg.clientName)}
                                  title={`Remove ${cg.clientName} from tender`}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '1px 4px',
                                    borderRadius: '3px',
                                    border: '1px solid #FECDD3',
                                    backgroundColor: '#FFF1F2',
                                    color: '#BE123C',
                                    fontSize: '0.68rem',
                                    cursor: 'pointer',
                                  }}
                                >
                                  <Trash2 size={9} />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    )}

                    {/* Timeline & Dept (Rowspanned per tender) */}
                    {isFirstRowOfTender && (
                      <>
                        <td
                          rowSpan={totalTenderRows}
                          style={{
                            ...cellStyle,
                            verticalAlign: 'middle',
                            fontSize: '0.78rem',
                          }}
                          suppressHydrationWarning
                        >
                          <div style={{ color: '#1F2937', fontWeight: 600 }}>
                            {formatLocalDate(tender.closingDateTimeUtc)}
                          </div>
                          <div style={{ color: '#64748B' }}>
                            {formatLocalTime(tender.closingDateTimeUtc, { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>

                        <td
                          rowSpan={totalTenderRows}
                          style={{
                            ...cellStyle,
                            verticalAlign: 'middle',
                            color: '#475569',
                          }}
                        >
                          {tender.department}
                        </td>
                      </>
                    )}

                    {/* License details */}
                    {!m ? (
                      <td
                        colSpan={11}
                        style={{
                          ...cellStyle,
                          textAlign: 'center',
                          color: '#64748B',
                          fontStyle: 'italic',
                          padding: '0.85rem',
                        }}
                      >
                        No license added for {cg.clientName} yet.{' '}
                        {onAddTenderer && cg.clientId > 0 && (
                          <button
                            type="button"
                            onClick={() => onAddTenderer(tender, cg.clientId)}
                            style={{
                              marginLeft: '0.5rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              border: '1px solid #0D9488',
                              backgroundColor: '#0D9488',
                              color: '#FFFFFF',
                              cursor: 'pointer',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                            }}
                          >
                            <Plus size={11} /> Add License
                          </button>
                        )}
                      </td>
                    ) : (
                      <>
                        {/* License Name */}
                        <td style={{ ...cellStyle, fontWeight: 600, color: '#0F172A' }}>
                          <div>{m.tendererName}</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'monospace' }}>
                            {m.username}
                          </div>
                        </td>

                        {/* Password toggle */}
                        <td style={{ ...cellStyle, textAlign: 'center' }}>
                          {displayPassword ? (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <span
                                style={{
                                  fontFamily: 'monospace',
                                  fontSize: '0.74rem',
                                  backgroundColor: '#FEF3C7',
                                  color: '#92400E',
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

                        {/* Liquid 1, 2, 3 */}
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

                        {/* Submit */}
                        <td style={{ ...cellStyle, textAlign: 'center' }}>{renderStatus(m.submitStatus, 'ok')}</td>
                      </>
                    )}

                    {/* Liquid Assets & APP (Rowspanned per tender) */}
                    {isFirstRowOfTender && (
                      <>
                        <td
                          rowSpan={totalTenderRows}
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
                          rowSpan={totalTenderRows}
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

                    {/* Financial Columns & Actions PER LICENSE */}
                    {m ? (
                      <>
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

                        {/* Actions */}
                        <td style={{ ...cellStyle, textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
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
                              onClick={() =>
                                onRecordPayment(
                                  tender,
                                  cg.clientId,
                                  m.tendererId,
                                  m.dueAmount,
                                  m.tendererName,
                                  cg.clientName
                                )
                              }
                            >
                              {m.dueAmount > 0 ? 'Pay' : 'Paid'}
                            </Button>

                            {onRemoveTenderer && (() => {
                              const hasPayments = m.totalPaid > 0 || m.chargeAmount !== m.dueAmount;
                              return (
                                <button
                                  type="button"
                                  disabled={hasPayments}
                                  onClick={() => {
                                    if (!hasPayments) {
                                      onRemoveTenderer(tender.id, m.tendererId, m.tendererName, cg.clientId);
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
                    ) : (
                      <>
                        <td style={{ ...cellStyle, textAlign: 'right' }}>—</td>
                        <td style={{ ...cellStyle, textAlign: 'right' }}>—</td>
                        <td style={{ ...cellStyle, textAlign: 'right' }}>—</td>
                        <td style={{ ...cellStyle, textAlign: 'center' }}>
                          {onAddTenderer && cg.clientId > 0 && (
                            <button
                              type="button"
                              onClick={() => onAddTenderer(tender, cg.clientId)}
                              style={{
                                padding: '3px 8px',
                                borderRadius: '4px',
                                border: '1px solid #99F6E4',
                                backgroundColor: '#F0FDFA',
                                color: '#0F766E',
                                cursor: 'pointer',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                              }}
                            >
                              <Plus size={10} /> Add License
                            </button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                );
              });
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
