import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    password: '', confirmPassword: '',
    studentName: '', gradeApplying: '', strand: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) { setStep(s => s + 1); return; }
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-page__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
      </div>

      <div className="auth-card auth-card--wide">
        <div className="auth-card__brand">
          <Link to="/" className="navbar__brand">
            <img src="/logo/logo.svg" alt="TaraEskwela Logo" className="navbar__logo" />
            <span className="navbar__brand-text">Tara<em>Eskwela</em></span>
          </Link>
        </div>

        <div className="reg-steps">
          {['Account', 'Student Info', 'Confirm'].map((label, i) => (
            <div key={label} className={`reg-step${step > i + 1 ? ' reg-step--done' : ''}${step === i + 1 ? ' reg-step--active' : ''}`}>
              <span className="reg-step__dot">{step > i + 1 ? '✓' : i + 1}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {step === 1 && (
            <>
              <h2>Create Your <em>Account</em></h2>
              <p className="auth-form__sub">Parent / Guardian information</p>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" name="firstName" type="text" required value={form.firstName} onChange={handleChange} placeholder="Juan" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" name="lastName" type="text" required value={form.lastName} onChange={handleChange} placeholder="dela Cruz" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="juan@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Mobile Number</label>
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="+63 9XX XXX XXXX" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required value={form.password} onChange={handleChange} placeholder="Min. 8 characters" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" required value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Student <em>Information</em></h2>
              <p className="auth-form__sub">Tell us about the applicant</p>
              <div className="form-group">
                <label htmlFor="studentName">Student Full Name</label>
                <input id="studentName" name="studentName" type="text" required value={form.studentName} onChange={handleChange} placeholder="Full legal name" />
              </div>
              <div className="form-group">
                <label htmlFor="gradeApplying">Grade Level Applying For</label>
                <select id="gradeApplying" name="gradeApplying" required value={form.gradeApplying} onChange={handleChange}>
                  <option value="">Select grade level…</option>
                  {['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6',
                    'Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              {(form.gradeApplying === 'Grade 11' || form.gradeApplying === 'Grade 12') && (
                <div className="form-group">
                  <label htmlFor="strand">SHS Strand</label>
                  <select id="strand" name="strand" required value={form.strand} onChange={handleChange}>
                    <option value="">Select strand…</option>
                    <option>STEM</option>
                    <option>ABM</option>
                    <option>HUMSS</option>
                    <option>GAS</option>
                  </select>
                </div>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <h2>Almost <em>Done!</em></h2>
              <p className="auth-form__sub">Review your application details</p>
              <div className="review-box">
                <div><strong>Guardian:</strong> {form.firstName} {form.lastName}</div>
                <div><strong>Email:</strong> {form.email}</div>
                <div><strong>Phone:</strong> {form.phone}</div>
                <div><strong>Student:</strong> {form.studentName}</div>
                <div><strong>Grade:</strong> {form.gradeApplying} {form.strand && `— ${form.strand}`}</div>
              </div>
              <p className="auth-form__sub" style={{ marginTop: '1rem' }}>
                By submitting you agree to our <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>.
              </p>
            </>
          )}

          <div className="auth-form__actions">
            {step > 1 && (
              <button type="button" className="btn btn--ghost" onClick={() => setStep(s => s - 1)}>← Back</button>
            )}
            <button type="submit" className="btn btn--primary btn--full">
              {step < 3 ? 'Continue →' : 'Submit Application'}
            </button>
          </div>
        </form>

        <p className="auth-footer">Already have an account? <Link to="/login">Sign in here</Link></p>
      </div>
    </div>
  );
};

export default Registration;