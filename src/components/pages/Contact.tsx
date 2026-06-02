import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page page--contact">
      <div className="page-hero page-hero--contact">
        <div className="container">
          <span className="section-label">Get in Touch</span>
          <h1>We'd Love to <em>Hear</em> from You</h1>
          <p>Questions about admissions, programs, or campus visits? Our team responds within one business day.</p>
        </div>
      </div>

      <section className="section section--light">
        <div className="container container--contact">

          <div className="contact-info">
            <h2>Contact <em>Details</em></h2>
            <div className="contact-info__item">
              <span>📍</span>
              <div>
                <strong>Campus Address</strong>
                <p>123 Academy Drive, Quezon City, Metro Manila 1100</p>
              </div>
            </div>
            <div className="contact-info__item">
              <span>📞</span>
              <div>
                <strong>Phone</strong>
                <p>+63 2 8888 0000</p>
                <p>+63 917 000 1234</p>
              </div>
            </div>
            <div className="contact-info__item">
              <span>✉️</span>
              <div>
                <strong>Email</strong>
                <p>admissions@taraeskwela.edu.ph</p>
                <p>info@taraeskwela.edu.ph</p>
              </div>
            </div>
            <div className="contact-info__item">
              <span>🕐</span>
              <div>
                <strong>Office Hours</strong>
                <p>Monday – Friday: 7:30 AM – 5:00 PM</p>
                <p>Saturday: 8:00 AM – 12:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {sent ? (
              <div className="contact-success">
                <span>✅</span>
                <h3>Message Received!</h3>
                <p>Thank you for reaching out. Our admissions team will get back to you within one business day.</p>
                <button className="btn btn--primary" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h2>Send a <em>Message</em></h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input id="name" name="name" type="text" required placeholder="Your full name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject" required value={form.subject} onChange={handleChange}>
                    <option value="">Select a topic…</option>
                    <option value="admissions">Admissions Inquiry</option>
                    <option value="programs">Academic Programs</option>
                    <option value="campus">Campus Tour</option>
                    <option value="scholarships">Scholarships</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" required rows={5} placeholder="How can we help you?" value={form.message} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn--primary btn--full">Send Message</button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;