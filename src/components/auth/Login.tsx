import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Set mock authentication token
    localStorage.setItem('token', 'mock-token');
    navigate('/dashboard');
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

          <button type="submit" className="btn btn--primary btn--full">Sign In</button>

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