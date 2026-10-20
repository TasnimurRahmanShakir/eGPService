'use client';

import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Pencil, 
  Plus, 
  Trash2, 
  UserPlus, 
  Users, 
  Building2, 
  Clock, 
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { MoneyDisplay } from '@egp/ui';
import type { TenderDto, TendererMappingDto } from '@egp/api-client';
import { formatLocalDate, formatLocalTime } from '@/lib/date-utils';

interface TenderExcelMatrixProps {
  tenders: TenderDto[];
  onEditTender?: (tender: TenderDto) => void;
  onAddClient?: (tender: TenderDto) => void;
  onRemoveClient?: (tenderId: number, clientId: number, clientName: string) => void;
  onAddTenderer?: (tender: TenderDto, clientId?: number) => void;
  onEditTenderer?: (tenderId: number, mapping: TendererMappingDto) => void;
  onRemoveTenderer?: (tenderId: number, tendererId: number, tendererName: string, clientId?: number) => void;
}

export function TenderExcelMatrix({
  tenders,
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
            backgroundColor: '#ECFDF5',
            color: '#047857',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'lowercase',
            border: '1px solid #A7F3D0',
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
            backgroundColor: '#FFF1F2',
            color: '#BE123C',
            fontSize: '0.75rem',
            fontWeight: 700,
            border: '1px solid #FECDD3',
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
          backgroundColor: '#F1F5F9',
          color: '#64748B',
          fontSize: '0.75rem',
          fontWeight: 600,
          border: '1px solid #E2E8F0',
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
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          color: '#64748B',
        }}
      >
        <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1F2937' }}>
          No tenders found matching criteria.
        </p>
        <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>
          Create a tender using the &quot;New Tender&quot; button above to get started.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {tenders.map((tender, tIdx) => {
        // Group clients for this tender
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
          clientGroups = tender.clients.map((c) => {
            const list = c.tenderers || [];
            const sumCharge = list.reduce((s, x) => s + (x.chargeAmount || 0), 0);
            const sumPaid = list.reduce((s, x) => s + (x.totalPaid || 0), 0);
            const sumDue = list.reduce((s, x) => s + (x.dueAmount || 0), 0);
            return {
              clientId: c.clientId,
              clientName: c.clientName,
              phone: c.phone,
              totalCharge: c.totalChargeAmount > 0 ? c.totalChargeAmount : sumCharge,
              totalPaid: c.totalPaidAmount > 0 ? c.totalPaidAmount : sumPaid,
              totalDue: c.totalDueAmount > 0 ? c.totalDueAmount : sumDue,
              tenderers: list,
            };
          });
        } else if (tender.tenderers && tender.tenderers.length > 0) {
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
        } else if (tender.clientId) {
          clientGroups = [
            {
              clientId: tender.clientId,
              clientName: tender.clientName || `Client #${tender.clientId}`,
              phone: null,
              totalCharge: tender.chargeAmount || 0,
              totalPaid: tender.totalPaid || 0,
              totalDue: tender.dueAmount || 0,
              tenderers: [],
            },
          ];
        }

        const totalLicensesCount = clientGroups.reduce((sum, cg) => sum + cg.tenderers.length, 0);

        return (
          <div
            key={tender.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #CBD5E1',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
            }}
          >
            {/* 1. TENDER MASTER HEADER BANNER */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.875rem 1.25rem',
                backgroundColor: '#EEF2FF', // Indigo master banner
                borderBottom: '2px solid #C7D2FE',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              {/* Tender Identity & Attributes */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#4338CA',
                    backgroundColor: '#E0E7FF',
                    padding: '3px 8px',
                    borderRadius: '5px',
                    border: '1px solid #C7D2FE',
                  }}
                >
                  #{tIdx + 1}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#6366F1', fontWeight: 600 }}>Tender ID:</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '1.125rem',
                      fontWeight: 800,
                      color: '#1E1B4B',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {tender.tenderId}
                  </span>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8125rem',
                    color: '#334155',
                    backgroundColor: '#FFFFFF',
                    padding: '3px 9px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    fontWeight: 500,
                  }}
                  title="Procuring Department"
                >
                  <Building2 size={13} style={{ color: '#64748B' }} />
                  <span>{tender.department}</span>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8125rem',
                    color: '#BE123C',
                    backgroundColor: '#FFF1F2',
                    padding: '3px 9px',
                    borderRadius: '6px',
                    border: '1px solid #FECDD3',
                    fontWeight: 600,
                  }}
                  title="Closing Date & Time"
                  suppressHydrationWarning
                >
                  <Clock size={13} style={{ color: '#BE123C' }} />
                  <span>
                    Closing: {formatLocalDate(tender.closingDateTimeUtc)} {formatLocalTime(tender.closingDateTimeUtc, { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {tender.liquidAssetAmount > 0 && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8125rem',
                      color: '#047857',
                      backgroundColor: '#ECFDF5',
                      padding: '3px 9px',
                      borderRadius: '6px',
                      border: '1px solid #A7F3D0',
                      fontWeight: 600,
                    }}
                    title="Liquid Asset Requirement"
                  >
                    <span>💧 {formatLiquidAsset(tender.liquidAssetAmount)}</span>
                  </div>
                )}

                {tender.appCode && (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: '#64748B',
                      fontFamily: 'monospace',
                      backgroundColor: '#FFFFFF',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    APP: {tender.appCode}
                  </span>
                )}

                {/* Counter Badges */}
                <div style={{ display: 'inline-flex', gap: '4px' }}>
                  <span style={{ fontSize: '0.72rem', backgroundColor: '#FFFFFF', color: '#4338CA', padding: '2px 7px', borderRadius: '4px', border: '1px solid #C7D2FE', fontWeight: 600 }}>
                    👥 {clientGroups.length} Clients
                  </span>
                  <span style={{ fontSize: '0.72rem', backgroundColor: '#FFFFFF', color: '#0F766E', padding: '2px 7px', borderRadius: '4px', border: '1px solid #99F6E4', fontWeight: 600 }}>
                    📑 {totalLicensesCount} Licenses
                  </span>
                </div>
              </div>

              {/* Master Tender Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {onEditTender && (
                  <button
                    type="button"
                    onClick={() => onEditTender(tender)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      color: '#334155',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Pencil size={12} /> Edit Tender
                  </button>
                )}

                {onAddClient && (
                  <button
                    type="button"
                    onClick={() => onAddClient(tender)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      border: '1px solid #4F46E5',
                      backgroundColor: '#4F46E5',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 1px 2px rgba(79, 70, 229, 0.2)',
                    }}
                  >
                    <UserPlus size={13} /> + Add Client
                  </button>
                )}
              </div>
            </div>

            {/* 2. PARTICIPATING CLIENTS SECTIONS */}
            {clientGroups.length === 0 ? (
              <div
                style={{
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  backgroundColor: '#F8FAFC',
                  color: '#64748B',
                }}
              >
                <Users size={28} style={{ color: '#94A3B8', margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>
                  No participating clients assigned to this tender yet.
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>
                  Click &quot;+ Add Client&quot; above to link a procurement client.
                </div>
                {onAddClient && (
                  <button
                    type="button"
                    onClick={() => onAddClient(tender)}
                    style={{
                      marginTop: '0.75rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '5px 14px',
                      borderRadius: '6px',
                      border: '1px solid #4F46E5',
                      backgroundColor: '#4F46E5',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <UserPlus size={13} /> Add Participating Client
                  </button>
                )}
              </div>
            ) : (
              clientGroups.map((cg, cgIdx) => {
                return (
                  <div
                    key={cg.clientId || cgIdx}
                    style={{
                      borderTop: cgIdx > 0 ? '2px solid #E2E8F0' : 'none',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    {/* CLIENT HEADER STRIP */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.65rem 1.25rem',
                        backgroundColor: '#F0FDF4', // Emerald soft strip
                        borderBottom: '1px solid #BBF7D0',
                        borderLeft: '4px solid #10B981', // Prominent visual anchor
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                      }}
                    >
                      {/* Client Info */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: '#065F46',
                            backgroundColor: '#D1FAE5',
                            padding: '2px 7px',
                            borderRadius: '4px',
                            border: '1px solid #A7F3D0',
                          }}
                        >
                          CLIENT #{cgIdx + 1}
                        </span>

                        <span
                          style={{
                            fontSize: '0.9375rem',
                            fontWeight: 800,
                            color: '#0F172A',
                          }}
                        >
                          {cg.clientName}
                        </span>

                        {cg.phone && (
                          <span style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 500 }}>
                            📞 {cg.phone}
                          </span>
                        )}

                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: '#475569',
                            backgroundColor: '#FFFFFF',
                            padding: '2px 7px',
                            borderRadius: '4px',
                            border: '1px solid #CBD5E1',
                            fontWeight: 600,
                          }}
                        >
                          Licenses: {cg.tenderers.length}
                        </span>
                      </div>

                      {/* Client Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {onAddTenderer && (
                          <button
                            type="button"
                            onClick={() => onAddTenderer(tender, cg.clientId)}
                            title={`Add eGP License for ${cg.clientName}`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 10px',
                              borderRadius: '5px',
                              border: '1px solid #0D9488',
                              backgroundColor: '#0D9488',
                              color: '#FFFFFF',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            <Plus size={12} /> + Add License / Tenderer
                          </button>
                        )}

                        {onRemoveClient && cg.clientId > 0 && (() => {
                          const hasPaid = cg.totalPaid > 0;
                          return (
                            <button
                              type="button"
                              disabled={hasPaid}
                              onClick={() => onRemoveClient(tender.id, cg.clientId, cg.clientName)}
                              title={
                                hasPaid
                                  ? 'Cannot remove client with existing payments'
                                  : 'Remove client from this tender'
                              }
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                padding: '4px 8px',
                                borderRadius: '5px',
                                border: hasPaid ? '1px solid #E2E8F0' : '1px solid #FECDD3',
                                backgroundColor: hasPaid ? '#F1F5F9' : '#FFF1F2',
                                color: hasPaid ? '#94A3B8' : '#BE123C',
                                fontSize: '0.72rem',
                                cursor: hasPaid ? 'not-allowed' : 'pointer',
                                opacity: hasPaid ? 0.5 : 1,
                              }}
                            >
                              <Trash2 size={11} /> Remove Client
                            </button>
                          );
                        })()}
                      </div>
                    </div>

                    {/* CLIENT'S DEDICATED LICENSE MATRIX TABLE */}
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                      <table
                        style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          fontSize: '0.8rem',
                          textAlign: 'left',
                        }}
                      >
                        <thead>
                          <tr style={{ backgroundColor: '#F8FAFC', color: '#475569', borderBottom: '1px solid #E2E8F0', fontSize: '0.75rem' }}>
                            <th style={{ ...subHeaderStyle, minWidth: '170px' }}>eGP License &amp; User</th>
                            <th style={{ ...subHeaderStyle, minWidth: '110px', textAlign: 'center' }}>Password</th>
                            <th style={{ ...subHeaderStyle, minWidth: '70px', textAlign: 'center' }}>Liquid 1</th>
                            <th style={{ ...subHeaderStyle, minWidth: '70px', textAlign: 'center' }}>Liquid 2</th>
                            <th style={{ ...subHeaderStyle, minWidth: '70px', textAlign: 'center' }}>Liquid 3</th>
                            <th style={{ ...subHeaderStyle, minWidth: '60px', textAlign: 'center' }}>JVCA</th>
                            <th style={{ ...subHeaderStyle, minWidth: '60px', textAlign: 'center' }}>Fill</th>
                            <th style={{ ...subHeaderStyle, minWidth: '60px', textAlign: 'center' }}>Map</th>
                            <th style={{ ...subHeaderStyle, minWidth: '60px', textAlign: 'center' }}>Rate</th>
                            <th style={{ ...subHeaderStyle, minWidth: '75px', textAlign: 'center' }}>Less %</th>
                            <th style={{ ...subHeaderStyle, minWidth: '65px', textAlign: 'center' }}>Submit</th>
                            <th style={{ ...subHeaderStyle, minWidth: '95px', textAlign: 'right' }}>Charge (৳)</th>
                            <th style={{ ...subHeaderStyle, minWidth: '95px', textAlign: 'right' }}>Paid (৳)</th>
                            <th style={{ ...subHeaderStyle, minWidth: '95px', textAlign: 'right' }}>Due (৳)</th>
                            <th style={{ ...subHeaderStyle, minWidth: '100px', textAlign: 'center' }}>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {cg.tenderers.length === 0 ? (
                            <tr>
                              <td
                                colSpan={15}
                                style={{
                                  padding: '1rem',
                                  textAlign: 'center',
                                  color: '#64748B',
                                  backgroundColor: '#FFFFFF',
                                  fontSize: '0.8125rem',
                                  fontStyle: 'italic',
                                }}
                              >
                                No licenses mapped under {cg.clientName} yet.{' '}
                                {onAddTenderer && (
                                  <button
                                    type="button"
                                    onClick={() => onAddTenderer(tender, cg.clientId)}
                                    style={{
                                      marginLeft: '0.5rem',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px',
                                      padding: '2px 8px',
                                      borderRadius: '4px',
                                      border: '1px solid #0D9488',
                                      backgroundColor: '#F0FDFA',
                                      color: '#0F766E',
                                      fontSize: '0.72rem',
                                      fontWeight: 600,
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <Plus size={11} /> Add First License
                                  </button>
                                )}
                              </td>
                            </tr>
                          ) : (
                            cg.tenderers.map((m, mIdx) => {
                              const pwdKey = `${tender.id}-${cg.clientId}-${m.tendererId}`;
                              const isPwdVisible = showPasswords[pwdKey];
                              const displayPassword = m.password;

                              return (
                                <tr
                                  key={m.tendererId || mIdx}
                                  style={{
                                    borderBottom: mIdx === cg.tenderers.length - 1 ? 'none' : '1px solid #F1F5F9',
                                    backgroundColor: mIdx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                                  }}
                                >
                                  {/* License & User */}
                                  <td style={{ ...subCellStyle, fontWeight: 600, color: '#0F172A' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <span style={{ color: '#0D9488', fontWeight: 700 }}>•</span>
                                      <div>
                                        <div style={{ fontWeight: 700, color: '#1E293B' }}>{m.tendererName}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'monospace' }}>
                                          {m.username}
                                        </div>
                                      </div>
                                    </div>
                                  </td>

                                  {/* Password */}
                                  <td style={{ ...subCellStyle, textAlign: 'center' }}>
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
                                      <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>—</span>
                                    )}
                                  </td>

                                  {/* Liquid 1, 2, 3 */}
                                  <td style={{ ...subCellStyle, textAlign: 'center' }}>
                                    {renderStatus(m.liquid1Status, 'ok')}
                                  </td>
                                  <td style={{ ...subCellStyle, textAlign: 'center' }}>
                                    {renderStatus(m.liquid2Status, 'ok')}
                                  </td>
                                  <td style={{ ...subCellStyle, textAlign: 'center' }}>
                                    {renderStatus(m.liquid3Status, 'ok')}
                                  </td>

                                  {/* Checklists */}
                                  <td style={{ ...subCellStyle, textAlign: 'center' }}>
                                    {renderStatus(m.jvcaStatus, 'ok')}
                                  </td>
                                  <td style={{ ...subCellStyle, textAlign: 'center' }}>
                                    {renderStatus(m.fillStatus, 'ok')}
                                  </td>
                                  <td style={{ ...subCellStyle, textAlign: 'center' }}>
                                    {renderStatus(m.mapStatus, 'ok')}
                                  </td>
                                  <td style={{ ...subCellStyle, textAlign: 'center' }}>
                                    {renderStatus(m.rateStatus, 'ok')}
                                  </td>

                                  {/* Less % */}
                                  <td style={{ ...subCellStyle, textAlign: 'center' }}>
                                    {m.lessPercentage !== null && m.lessPercentage !== undefined ? (
                                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#92400E' }}>
                                        {Number(m.lessPercentage).toFixed(3)}%
                                      </span>
                                    ) : (
                                      <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>NA</span>
                                    )}
                                  </td>

                                  {/* Submit */}
                                  <td style={{ ...subCellStyle, textAlign: 'center' }}>
                                    {renderStatus(m.submitStatus, 'ok')}
                                  </td>

                                  {/* Financials */}
                                  <td style={{ ...subCellStyle, textAlign: 'right', fontFamily: 'monospace' }}>
                                    <MoneyDisplay amount={m.chargeAmount} size="sm" />
                                  </td>
                                  <td style={{ ...subCellStyle, textAlign: 'right', fontFamily: 'monospace' }}>
                                    {m.totalPaid > 0 ? (
                                      <MoneyDisplay amount={m.totalPaid} type="advance" size="sm" />
                                    ) : (
                                      <span style={{ color: '#94A3B8' }}>—</span>
                                    )}
                                  </td>
                                  <td style={{ ...subCellStyle, textAlign: 'right', fontFamily: 'monospace' }}>
                                    <MoneyDisplay
                                      amount={m.dueAmount}
                                      type={m.dueAmount > 0 ? 'due' : 'neutral'}
                                      size="sm"
                                    />
                                  </td>

                                  {/* Actions */}
                                  <td style={{ ...subCellStyle, textAlign: 'center' }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                      {onEditTenderer && (
                                        <button
                                          type="button"
                                          onClick={() => onEditTenderer(tender.id, m)}
                                          title="Edit License Matrix & Settings"
                                          style={{
                                            padding: '3px 7px',
                                            borderRadius: '4px',
                                            border: '1px solid #CBD5E1',
                                            backgroundColor: '#FFFFFF',
                                            color: '#1F2937',
                                            cursor: 'pointer',
                                            fontSize: '0.72rem',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '3px',
                                          }}
                                        >
                                          <Pencil size={11} /> Edit
                                        </button>
                                      )}

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
                                                ? `Cannot remove license because payments have already been recorded.`
                                                : 'Remove license from this tender'
                                            }
                                            style={{
                                              padding: '3px 6px',
                                              borderRadius: '4px',
                                              border: hasPayments ? '1px solid #E2E8F0' : '1px solid #FECDD3',
                                              backgroundColor: hasPayments ? '#F1F5F9' : '#FFF1F2',
                                              color: hasPayments ? '#94A3B8' : '#BE123C',
                                              cursor: hasPayments ? 'not-allowed' : 'pointer',
                                              fontSize: '0.72rem',
                                              display: 'inline-flex',
                                              alignItems: 'center',
                                              opacity: hasPayments ? 0.45 : 1,
                                            }}
                                          >
                                            <Trash2 size={11} />
                                          </button>
                                        );
                                      })()}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        );
      })}
    </div>
  );
}

const subHeaderStyle: React.CSSProperties = {
  padding: '0.55rem 0.65rem',
  fontWeight: 600,
  borderRight: '1px solid #E2E8F0',
  whiteSpace: 'nowrap',
};

const subCellStyle: React.CSSProperties = {
  padding: '0.55rem 0.65rem',
  borderRight: '1px solid #F1F5F9',
  whiteSpace: 'nowrap',
};
