import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  if (user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) await login(form.email, form.password);
      else await signup(form.name, form.email, form.password, form.role);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-page-glow" aria-hidden />
      <div className="auth-card">
        <header className="auth-card-header">
          <div className="auth-brand">
            <img
              src="/ethara-icon.png"
              alt=""
              className="auth-logo-icon"
              width={56}
              height={56}
            />
            <p className="auth-company">Ethara AI</p>
          </div>
          <h1 className="auth-product">TaskFlow</h1>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to your workspace' : 'Create your workspace account'}
          </p>
        </header>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group auth-field">
              <label htmlFor="auth-name">Full name</label>
              <input
                id="auth-name"
                type="text"
                placeholder="John Doe"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          )}
          <div className="form-group auth-field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              placeholder="you@company.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-group auth-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          {!isLogin && (
            <div className="form-group auth-field">
              <label htmlFor="auth-role">Role</label>
              <select
                id="auth-role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Please wait…' : isLogin ? 'Sign In →' : 'Create account →'}
          </button>
        </form>

        <p className="auth-footer">
          {isLogin ? (
            <>
              <span className="auth-footer-muted">No account?</span>{' '}
              <button
                type="button"
                className="auth-footer-link"
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
              >
                Create one
              </button>
            </>
          ) : (
            <>
              <span className="auth-footer-muted">Already have an account?</span>{' '}
              <button
                type="button"
                className="auth-footer-link"
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
