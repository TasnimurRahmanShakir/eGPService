import React from 'react';
import Link from 'next/link';
import { apiClient } from '@egp/api-client';
import { Button, Badge, DataTable, MoneyDisplay, type Column } from '@egp/ui';
import {
  Users,
  FileSpreadsheet,
  History,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import type { TenderDto } from '@egp/api-client';

export const dynamic = 'force-dynamic';

async function getDashboardData() {
  try {
    const [clients, tenders, auditLogs] = await Promise.all([
      apiClient.clients.getAll({ next: { tags: ['clients'], revalidate: 0 } }),
      apiClient.tenders.getAll(undefined, { next: { tags: ['tenders'], revalidate: 0 } }),
      apiClient.auditLogs.getLogs({ pageSize: 5 }, { next: { revalidate: 0 } }),
    ]);
    return { clients, tenders, auditLogs, isConnected: true };
  } catch (error) {
    console.error('Failed to connect to .NET backend:', error);
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

  const columns: Column<TenderDto>[] = [
    {
      header: 'Tender ID',
      accessorKey: 'tenderId',
      cell: (t) => <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#f8fafc' }}>{t.tenderId}</span>,
    },
    {
      header: 'Client',
      accessorKey: 'clientName',
      cell: (t) => <span style={{ color: '#38bdf8', fontWeight: 600 }}>{t.clientName}</span>,
    },
    {
      header: 'Department',
      accessorKey: 'department',
    },
    {
      header: 'Charge',
      align: 'right',
      cell: (t) => <MoneyDisplay amount={t.chargeAmount} size="sm" />,
    },
    {
      header: 'Due',
      align: 'right',
      cell: (t) => <MoneyDisplay amount={t.dueAmount} type={t.dueAmount > 0 ? 'due' : 'neutral'} size="sm" />,
    },
    {
      header: 'Status',
      align: 'center',
      cell: (t) =>
        t.dueAmount > 0 ? (
          <Badge variant="rose" size="sm">
            Due ৳
          </Badge>
        ) : (
          <Badge variant="emerald" size="sm">
            Cleared
          </Badge>
        ),
    },
  ];

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            Procurement Command Center
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>
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
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(15, 23, 42, 0.75)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.825rem', color: '#94a3b8', fontWeight: 600 }}>Active Clients</span>
            <Users size={18} style={{ color: '#38bdf8' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.5rem' }}>
            {totalClients}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '0.25rem', fontWeight: 500 }}>
            {solutionSubscribers} software subscribers
          </div>
        </div>

        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(15, 23, 42, 0.75)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.825rem', color: '#94a3b8', fontWeight: 600 }}>Total Tenders</span>
            <FileSpreadsheet size={18} style={{ color: '#34d399' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.5rem' }}>
            {tenders.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Full spreadsheet matrix records
          </div>
        </div>

        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(15, 23, 42, 0.75)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.825rem', color: '#94a3b8', fontWeight: 600 }}>Collected Revenue</span>
            <CreditCard size={18} style={{ color: '#34d399' }} />
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <MoneyDisplay amount={totalPaid} type="advance" size="lg" />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            From total charge of <MoneyDisplay amount={totalCharge} size="sm" />
          </div>
        </div>

        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(15, 23, 42, 0.75)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.825rem', color: '#94a3b8', fontWeight: 600 }}>Total Outstanding Due</span>
            <AlertCircle size={18} style={{ color: '#f43f5e' }} />
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <MoneyDisplay amount={totalDue} type="due" size="lg" />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#fb7185', marginTop: '0.25rem' }}>
            Pending collection across tenders
          </div>
        </div>
      </div>

      {/* Quick Access & Recent Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Recent Tenders Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>Recent Tenders</h3>
            <Link href="/tenders" style={{ fontSize: '0.825rem', color: '#38bdf8', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              View Excel Matrix <ArrowUpRight size={14} />
            </Link>
          </div>

          <DataTable
            data={recentTenders}
            columns={columns}
            emptyTitle="No recent tenders"
            emptySubtitle="Create a tender in the Excel Matrix view to start tracking submissions."
          />
        </div>

        {/* Audit Stream Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>Live Audit Stream</h3>
            <Link href="/audit-logs" style={{ fontSize: '0.825rem', color: '#38bdf8', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              Full Trail <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ backgroundColor: 'rgba(11, 17, 32, 0.85)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {auditLogs.length === 0 ? (
              <span style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', padding: '1.5rem 0' }}>
                No recent audit events
              </span>
            ) : (
              auditLogs.map((log) => (
                <div key={log.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', paddingBottom: '0.65rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: '#38bdf8', fontSize: '0.8rem' }}>
                      {log.moduleName} #{log.recordId}
                    </span>
                    <Badge variant={log.actionType === 'CREATE' ? 'emerald' : log.actionType === 'UPDATE' ? 'sky' : 'rose'} size="sm">
                      {log.actionType}
                    </Badge>
                  </div>
                  <p style={{ fontSize: '0.785rem', color: '#cbd5e1', lineHeight: 1.3 }}>
                    {log.actionMessage}
                  </p>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
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
