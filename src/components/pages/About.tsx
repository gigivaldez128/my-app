import React from 'react';
import { Link } from 'react-router-dom';

const milestones = [
  { year: '1998', label: 'Founded', desc: 'Tara Eskwela opened its doors with 120 students and a vision for excellence.' },
  { year: '2005', label: 'Expanded', desc: 'Junior High School program launched, doubling enrollment within two years.' },
  { year: '2013', label: 'Accredited', desc: 'Received Level IV accreditation from PAASCU — the highest recognition in Philippine education.' },
  { year: '2019', label: 'SHS Campus', desc: 'Dedicated Senior High School building opened with state-of-the-art STEM laboratories.' },
  { year: '2024', label: 'Global Network', desc: 'Exchange partnerships now active in 15 countries across Asia, Oceania, and Europe.' },
];

const team = [
  { name: 'Dr. Amelia Reyes', role: 'School President', emoji: '👩‍💼' },
  { name: 'Mr. Jonathan Cruz', role: 'Academic Director', emoji: '👨‍🏫' },
  { name: 'Ms. Sofia Lim', role: 'Head of Admissions', emoji: '👩‍💻' },
  { name: 'Dr. Ramon Sta. Ana', role: 'Director of Student Affairs', emoji: '👨‍⚕️' },
];

const About: React.FC = () => (
  <div className="page page--about">
    <div className="page-hero page-hero--about">
      <div className="container">
        <span className="section-label">Our Story</span>
        <h1>More Than a School — <em>A Community</em></h1>
        <p>For over 25 years, Tara Eskwela has been shaping curious minds and compassionate leaders in the heart of Metro Manila.</p>
      </div>
    </div>

    {/* Mission & Vision */}
    <section className="section section--light">
      <div className="container container--split">
        <div className="about-mission">
          <span className="section-label">Mission</span>
          <h2>Why We <em>Exist</em></h2>
          <p>To provide an inclusive, innovative, and values-driven education that empowers every student to reach their full potential and contribute meaningfully to society.</p>
        </div>
        <div className="about-vision">
          <span className="section-label">Vision</span>
          <h2>Where We're <em>Going</em></h2>
          <p>To be the leading K–12 institution in the Philippines, recognized globally for academic excellence, character formation, and forward-thinking education.</p>
        </div>
      </div>
    </section>

    {/* Milestones */}
    <section className="section section--dark">
      <div className="container">
        <div className="section-header">
          <span className="section-label">History</span>
          <h2>Milestones That <em>Shaped</em> Us</h2>
        </div>
        <div className="timeline">
          {milestones.map(({ year, label, desc }) => (
            <div key={year} className="timeline__item">
              <div className="timeline__year">{year}</div>
              <div className="timeline__content">
                <strong>{label}</strong>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Leadership */}
    <section className="section section--light">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Leadership</span>
          <h2>Meet the <em>Team</em></h2>
          <p>Experienced educators and administrators dedicated to every student's success.</p>
        </div>
        <div className="grid grid--4">
          {team.map(({ name, role, emoji }) => (
            <div key={name} className="card card--team">
              <div className="card__icon">{emoji}</div>
              <h3>{name}</h3>
              <p>{role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="cta-band">
      <div className="container">
        <h2>Want to Learn More?</h2>
        <p>Schedule a campus tour or speak directly with our admissions team.</p>
        <Link to="/contact" className="btn btn--primary btn--large">Contact Us</Link>
      </div>
    </section>
  </div>
);

export default About;
