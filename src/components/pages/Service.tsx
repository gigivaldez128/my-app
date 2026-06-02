import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: '📚', title: 'Elementary School',
    levels: ['Grade 1–3: Foundation Years', 'Grade 4–6: Enrichment Track'],
    desc: 'A nurturing environment where literacy, numeracy, and curiosity are built from the ground up.',
  },
  {
    icon: '🧪', title: 'Junior High School',
    levels: ['Grade 7–8: Core Academics', 'Grade 9–10: Specialization Prep'],
    desc: 'Students explore disciplines deeply with lab-based learning and mentored projects.',
  },
  {
    icon: '🎓', title: 'Senior High School',
    levels: ['STEM Strand', 'ABM Strand', 'HUMSS Strand', 'GAS Strand'],
    desc: 'Four specialized tracks aligned with DepEd K–12, enhanced with college-readiness modules.',
  },
  {
    icon: '🌐', title: 'International Exchange',
    levels: ['Summer Programs', 'Semester Abroad'],
    desc: 'Partner schools in Japan, Australia, Canada, and the UK offer immersive learning experiences.',
  },
  {
    icon: '🤸', title: 'Extracurriculars',
    levels: ['30+ Clubs & Organizations', 'Varsity Sports', 'Student Government'],
    desc: 'Holistic development beyond the classroom — leadership, teamwork, and passion projects.',
  },
  {
    icon: '🧠', title: 'Counseling & Support',
    levels: ['Academic Advising', 'Mental Health Services', 'Learning Difference Support'],
    desc: "Every student's wellbeing is a priority. Licensed counselors are available daily.",
  },
];

const Services: React.FC = () => (
  <div className="page page--services">
    <div className="page-hero page-hero--services">
      <div className="container">
        <span className="section-label">Our Services</span>
        <h1>Programs Built for <em>Every Stage</em></h1>
        <p>From Grade 1 through Senior High, Tara Eskwela offers comprehensive programs that evolve with your child's growing potential.</p>
      </div>
    </div>

    <section className="section section--light">
      <div className="container">
        <div className="services-grid">
          {services.map(({ icon, title, levels, desc }) => (
            <article key={title} className="service-card">
              <div className="service-card__header">
                <span className="service-card__icon">{icon}</span>
                <h2>{title}</h2>
              </div>
              <p className="service-card__desc">{desc}</p>
              <ul className="service-card__levels">
                {levels.map(l => <li key={l}>{l}</li>)}
              </ul>
              <Link to="/register" className="btn btn--ghost">Inquire Now →</Link>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="cta-band">
      <div className="container">
        <h2>Not Sure Which Program Fits?</h2>
        <p>Our admissions team is happy to guide you through the best path for your child.</p>
        <Link to="/contact" className="btn btn--primary btn--large">Talk to Admissions</Link>
      </div>
    </section>
  </div>
);

export default Services;