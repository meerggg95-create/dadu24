'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<'MOTHER' | 'ADMIN' | 'AGENT' | 'USER' | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      const normalizedId = loginId.trim().toLowerCase();
      if (normalizedId === 'admin@motherpanel.com' && password === 'admin123') {
        setUserRole('MOTHER');
        setStep(2);
        console.log('OTP for Mother Panel: 123456');
      } else if ((normalizedId === 'adm-001@admin.com' || normalizedId === 'adm-001') && password === 'admin123') {
        setUserRole('ADMIN');
        router.push('/admin-dashboard');
      } else if ((normalizedId === 'agt-001@agent.com' || normalizedId === 'agt-001') && password === 'admin123') {
        setUserRole('AGENT');
        router.push('/agent-dashboard');
      } else if ((normalizedId === 'player_john' || normalizedId === 'usr-001' || normalizedId === 'usr-agt001-1024') && password === 'admin123') {
        setUserRole('USER');
        router.push('/user-dashboard');
      } else {
        setError('Invalid credentials. Mother: admin@motherpanel.com, Admin: ADM-001, Agent: AGT-001, User: USR-001 (Password: admin123).');
      }
      setLoading(false);
    }, 800);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (otp === '123456') {
        if (userRole === 'MOTHER') {
          router.push('/dashboard');
        } else if (userRole === 'ADMIN') {
          router.push('/admin-dashboard');
        } else if (userRole === 'AGENT') {
          router.push('/agent-dashboard');
        } else {
          router.push('/user-dashboard');
        }
      } else {
        setError('Invalid OTP');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #1a1d24 0%, #0f1115 100%)' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem', letterSpacing: '1px' }}>9WICKETS PORTAL</h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to access your dashboard</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Email, Panel ID or Username</label>
              <input 
                type="text" 
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="e.g. admin@motherpanel.com, ADM-001, AGT-001, USR-001"
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: 'auto' }}
                />
                Remember me
              </label>
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
            <div style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div>🔑 <strong>Mother Panel:</strong> admin@motherpanel.com / admin123</div>
              <div>👤 <strong>Admin Panel:</strong> ADM-001 / admin123</div>
              <div>💼 <strong>Agent Panel:</strong> AGT-001 / admin123</div>
              <div>🎯 <strong>Player Betting:</strong> USR-001 / admin123</div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Two-Factor Auth (OTP)</label>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Check server console for OTP (use 123456)
              </p>
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <button 
              type="button" 
              onClick={() => setStep(1)}
              style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}
            >
              Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
