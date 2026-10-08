'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  KeyRound,
  History,
  ShieldCheck
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Clients', href: '/clients', icon: Users },
  { label: 'Tenders (Excel)', href: '/tenders', icon: FileSpreadsheet },
  { label: 'e-GP Tenderers', href: '/tenderers', icon: KeyRound },
  { label: 'Audit Trail', href: '/audit-logs', icon: History },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* Brand Header */}
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#070b16',
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
          }}
        >
          <ShieldCheck size={20} />
        </div>
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            eGP Command
          </h2>
          <span style={{ fontSize: '0.725rem', color: '#94a3b8', fontWeight: 500 }}>
            Enterprise Portal
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ padding: '1.25rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                color: isActive ? '#38bdf8' : '#94a3b8',
                backgroundColor: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                border: isActive ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid transparent',
              }}
            >
              <Icon size={18} style={{ color: isActive ? '#38bdf8' : '#64748b' }} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.75rem', color: '#64748b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontWeight: 600 }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          .NET 10 API Connected
        </div>
        <span style={{ marginTop: '0.2rem', display: 'block' }}>Identity: admin-guid-123</span>
      </div>
    </aside>
  );
}
