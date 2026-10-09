import React from 'react';
import Link from 'next/link';
import { apiClient } from '@egp/api-client';
import { Badge, MoneyDisplay } from '@egp/ui';
import {
  Users,
  FileSpreadsheet,
  ArrowUpRight,
  AlertCircle,
  CreditCard,
} from 'lucide-react';
import { RecentTendersTable } from '../components/dashboard/RecentTendersTable';

export const dynamic = 'force-dynamic';

async function getDashboardData() {
  try {
    const [clients, tenders, auditLogs] = await Promise.all([
      apiClient.clients.getAll({ next: { tags: ['clients'], revalidate: 0 } }).catch(() => []),
      apiClient.tenders.getAll(undefined, { next: { tags: ['tenders'], revalidate: 0 } }).catch(() => []),
      apiClient.auditLogs.getLogs({ pageSize: 5 }, { next: { revalidate: 0 } }).catch(() => []),
    ]);
    const isConnected = clients.length > 0 || tenders.length > 0 || auditLogs.length > 0;
    return { clients, tenders, auditLogs, isConnected };
  } catch {
    return { clients: [], tenders: [], auditLogs: [], isConnected: false };
  }
}

export default async function AdminDashboardOverview() {
  const { clients, tenders, auditLogs, isConnected } = await getDashboardData();

  const totalClients = clients.length;
  const solutionSubscribers = clients.filter((c) => c.hasPurchasedSolution).length;
  const totalCharge = tenders.reduce((sum, t) => sum + t.chargeAmount, 0);
  const totalPaid = tenders.reduce((sum, t) => sum + t.totalPaid, 0);
  const totalDue = tenders.reduce((sum, t) => sum + t.dueAmount, 0);

  const recentTenders = tenders.slice(0, 5);

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.02em' }}>
            Procurement Command Center
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Connected to .NET Clean Architecture CQRS Backend with automated transaction pipelines and audit logs.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Badge variant={isConnected ? 'emerald' : 'rose'} dot size="md">
            {isConnected ? 'Backend Online (Port 5000)' : 'Backend Offline'}
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>Active Clients</span>
            <Users size={18} style={{ color: '#0F766E' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1F2937', marginTop: '0.5rem', fontVariantNumeric: 'tabular-nums' }}>
            {totalClients}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#047857', marginTop: '0.25rem', fontWeight: 500 }}>
            {solutionSubscribers} software subscribers
          </div>
        </div>

        <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>Total Tenders</span>
            <FileSpreadsheet size={18} style={{ color: '#0F766E' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1F2937', marginTop: '0.5rem', fontVariantNumeric: 'tabular-nums' }}>
            {tenders.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
            Full spreadsheet matrix records
          </div>
        </div>

        <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>Collected Revenue</span>
            <CreditCard size={18} style={{ color: '#0F766E' }} />
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <MoneyDisplay amount={totalPaid} type="advance" size="lg" />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
            From total charge of <MoneyDisplay amount={totalCharge} size="sm" />
          </div>
        </div>

        <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>Total Outstanding Due</span>
            <AlertCircle size={18} style={{ color: '#BE123C' }} />
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <MoneyDisplay amount={totalDue} type="due" size="lg" />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#BE123C', marginTop: '0.25rem', fontWeight: 500 }}>
            Pending collection across tenders
          </div>
        </div>
      </div>

      {/* Quick Access & Recent Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Recent Tenders Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1F2937' }}>Recent Tenders</h3>
            <Link href="/tenders" style={{ fontSize: '0.825rem', color: '#0F766E', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              View Excel Matrix <ArrowUpRight size={14} />
            </Link>
          </div>

          <RecentTendersTable tenders={recentTenders} />
        </div>

        {/* Audit Stream Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1F2937' }}>Live Audit Stream</h3>
            <Link href="/audit-logs" style={{ fontSize: '0.825rem', color: '#0F766E', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              Full Trail <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {auditLogs.length === 0 ? (
              <span style={{ color: '#64748B', fontSize: '0.85rem', textAlign: 'center', padding: '1.5rem 0' }}>
                No recent audit events
              </span>
            ) : (
              auditLogs.map((log) => (
                <div key={log.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', paddingBottom: '0.65rem', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: '#0F766E', fontSize: '0.8rem' }}>
                      {log.moduleName} #{log.recordId}
                    </span>
                    <Badge variant={log.actionType === 'CREATE' ? 'emerald' : log.actionType === 'UPDATE' ? 'sky' : 'rose'} size="sm">
                      {log.actionType}
                    </Badge>
                  </div>
                  <p style={{ fontSize: '0.785rem', color: '#334155', lineHeight: 1.3 }}>
                    {log.actionMessage}
                  </p>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                    By {log.performedBy} • {new Date(log.timestampUtc).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
