import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', remember: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Invalid email or password.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="auth-card">
        <div className="auth-card__brand">
          <Link to="/" className="navbar__brand">
            <img src="/logo/logo.svg" alt="TaraEskwela Logo" className="navbar__logo" />
            <span className="navbar__brand-text">Tara<em>Eskwela</em></span>
          </Link>
          <p>Student & Parent Portal</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h2>Welcome <em>Back</em></h2>
          <p className="auth-form__sub">Sign in to access your portal</p>

          {error && (
            <div className="auth-error-alert">
              <span>⚠️</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email" name="email" type="email" required autoComplete="email"
              value={form.email} onChange={handleChange} placeholder="your@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password
              <a href="#" className="form-group__forgot">Forgot password?</a>
            </label>
            <input
              id="password" name="password" type="password" required autoComplete="current-password"
              value={form.password} onChange={handleChange} placeholder="••••••••"
            />
          </div>

          <div className="form-group form-group--checkbox">
            <input id="remember" name="remember" type="checkbox" checked={form.remember} onChange={handleChange} />
            <label htmlFor="remember">Keep me signed in</label>
          </div>

          <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="auth-divider"><span>or continue with</span></div>

          <div className="auth-socials">
            <button type="button" className="btn btn--social">🔵 Google</button>
            <button type="button" className="btn btn--social">🔷 Microsoft</button>
          </div>
        </form>

        <p className="auth-footer">New to Tara Eskwela? <Link to="/register">Apply for admission</Link></p>
      </div>
    </div>
  );
};

export default Login;