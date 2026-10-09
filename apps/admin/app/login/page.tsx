'use client';

import React, { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { loginAction } from '../actions/authActions';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username.trim());
    formData.append('password', password);

    startTransition(async () => {
      try {
        const res = await loginAction(formData);
        if (res.success) {
          toast.success('Authentication successful! Welcome to eGP Command.');
          router.push(redirectUrl);
          router.refresh();
        } else {
          setErrorMsg(res.error || 'Invalid credentials. Please verify and try again.');
          toast.error(res.error || 'Authentication failed');
        }
      } catch (err) {
        setErrorMsg('An unexpected error occurred. Please try again.');
        toast.error('Authentication error');
      }
    });
  };

  return (
    <div className="login-screen-wrapper">
      <div className="login-screen-bg-pattern" aria-hidden="true" />

      <div className="login-card-container">
        {/* Brand Header */}
        <div className="login-brand-header">
          <div className="login-brand-badge">
            <ShieldCheck size={28} strokeWidth={2.3} />
          </div>
          <h1 className="login-brand-title">eGP Command</h1>
          <p className="login-brand-subtitle">
            Enterprise Administrative Portal &amp; Procurement Management
          </p>
        </div>

        {/* Security Warning / Error Box */}
        {errorMsg && (
          <div className="login-error-alert" role="alert">
            <AlertCircle size={18} className="login-error-icon" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field-group">
            <label htmlFor="admin-username" className="login-field-label">
              Admin Username
            </label>
            <div className="login-input-wrap">
              <span className="login-input-icon">
                <User size={18} />
              </span>
              <input
                id="admin-username"
                type="text"
                name="username"
                required
                autoComplete="username"
                autoFocus
                disabled={isPending}
                placeholder="Enter username (e.g. admin)"
                className="login-input"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
              />
            </div>
          </div>

          <div className="login-field-group">
            <label htmlFor="admin-password" className="login-field-label">
              Password
            </label>
            <div className="login-input-wrap">
              <span className="login-input-icon">
                <Lock size={18} />
              </span>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                autoComplete="current-password"
                disabled={isPending}
                placeholder="Enter password"
                className="login-input login-input-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle-btn"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="login-submit-btn"
          >
            {isPending ? (
              <>
                <Loader2 size={18} className="btn-spinner" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Command</span>
                <ArrowRight size={17} strokeWidth={2.3} />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
