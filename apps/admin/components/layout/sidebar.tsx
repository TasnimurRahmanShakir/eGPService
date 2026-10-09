'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  KeyRound,
  History,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { setSidebarCookie } from '../../app/actions/sidebarActions';
import { logoutAction } from '../../app/actions/authActions';

const NAV_ITEMS = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Clients', href: '/clients', icon: Users },
  { label: 'Tenders (Excel)', href: '/tenders', icon: FileSpreadsheet },
  { label: 'e-GP Licenses', href: '/tenderers', icon: KeyRound },
  { label: 'Audit Trail', href: '/audit-logs', icon: History },
];

export interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function AdminSidebar({
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-brand-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
          <div className="brand-logo-badge" title="eGP Command Enterprise Portal">
            <ShieldCheck size={20} strokeWidth={2.5} />
          </div>
          <div className="sidebar-text-hide" style={{ minWidth: 0 }}>
            <h2 className="brand-title">eGP Command</h2>
            <span className="brand-subtitle">Enterprise Portal</span>
          </div>
        </div>

        {/* Mobile close button */}
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="sidebar-toggle-btn md:hidden"
            style={{ display: isMobileOpen ? 'flex' : 'none' }}
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        )}

        {/* Desktop Collapse/Expand Toggle button */}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="sidebar-toggle-btn"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav-container">
        <div className="sidebar-nav-label sidebar-text-hide">Main Menu</div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              title={isCollapsed ? item.label : undefined}
              className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={19} className="sidebar-nav-icon" />
              <span className="sidebar-text-hide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info & Sign Out */}
      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--success, #047857)', fontWeight: 600, fontSize: '0.75rem', justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--success, #047857)', boxShadow: '0 0 6px rgba(4, 120, 87, 0.4)', flexShrink: 0 }} />
          <span className="sidebar-text-hide">API Connected</span>
        </div>
        <div className="sidebar-text-hide" style={{ marginTop: '0.25rem', fontSize: '0.7rem', color: 'var(--muted-foreground, #64748B)' }}>
          Identity: Administrator
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={() => logoutAction()}
          className="sidebar-signout-btn"
          title={isCollapsed ? 'Sign Out' : undefined}
          aria-label="Sign Out"
        >
          <LogOut size={16} />
          <span className="sidebar-text-hide">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export function AdminLayoutWrapper({
  initialCollapsed = false,
  children,
}: {
  initialCollapsed?: boolean;
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Handle escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleCollapse = async () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    // Persist in server cookie
    try {
      await setSidebarCookie(next);
    } catch {
      // Fallback: document.cookie if server action fails
      document.cookie = `egp-sidebar-collapsed=${next}; path=/; max-age=31536000; SameSite=Lax`;
    }
  };

  // If on /login page, render clean login view without admin shell (after all hooks run)
  if (pathname === '/login') {
    return <div className="admin-login-layout">{children}</div>;
  }

  return (
    <div className="admin-shell-layout">
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Responsive Collapsible Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Column */}
      <div className="admin-main-column">
        {/* Mobile Top Navbar (screens < 1024px) */}
        <header className="mobile-top-bar">
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="mobile-hamburger-btn"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="brand-logo-badge" style={{ width: '28px', height: '28px' }}>
              <ShieldCheck size={16} />
            </div>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-headline)' }}>
              eGP Command
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', color: 'var(--success, #047857)', backgroundColor: 'var(--success-bg, #ECFDF5)', padding: '3px 8px', borderRadius: '12px', border: '1px solid var(--success-border, #A7F3D0)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success, #047857)' }} />
            <span>Online</span>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="admin-main-scroll-content">
          {children}
        </main>
      </div>
    </div>
  );
}
