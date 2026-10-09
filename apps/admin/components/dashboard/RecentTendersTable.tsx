'use client';

import React from 'react';
import { DataTable, Badge, MoneyDisplay, type Column } from '@egp/ui';
import type { TenderDto } from '@egp/api-client';

export function RecentTendersTable({ tenders }: { tenders: TenderDto[] }) {
  const columns: Column<TenderDto>[] = [
    {
      header: 'Tender ID',
      accessorKey: 'tenderId',
      cell: (t) => <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1F2937' }}>{t.tenderId}</span>,
    },
    {
      header: 'Client',
      accessorKey: 'clientName',
      cell: (t) => <span style={{ color: '#0F766E', fontWeight: 600 }}>{t.clientName}</span>,
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
    <DataTable
      data={tenders}
      columns={columns}
      emptyTitle="No recent tenders"
      emptySubtitle="Create a tender in the Excel Matrix view to start tracking submissions."
    />
  );
}
