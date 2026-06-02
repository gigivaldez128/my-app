import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../Hero/Hero';

const programs = [
  { icon: '🔬', title: 'STEM Excellence', desc: 'Cutting-edge labs and research opportunities from Grade 7.' },
  { icon: '🎨', title: 'Arts & Humanities', desc: 'Cultivate creativity through literature, fine arts, and music.' },
  { icon: '⚽', title: 'Sports Academy', desc: 'Develop athletic potential alongside academic achievement.' },
  { icon: '💻', title: 'Tech & Innovation', desc: 'Coding, robotics, AI — preparing students for the digital era.' },
  { icon: '🌐', title: 'Global Studies', desc: 'International curriculum with exchange programs in 15 countries.' },
  { icon: '🎭', title: 'Performing Arts', desc: 'Theater, dance, and speech training for expressive communication.' },
];

const testimonials = [
  { name: 'Maria Santos', role: 'Parent', quote: "Tara Eskwela transformed my daughter's love of science into a full scholarship at UP Diliman." },
  { name: 'Carlo Reyes',  role: "Alumni '19", quote: "The teachers here don't just teach — they mentor. I carry that with me every day at my startup." },
  { name: 'Dr. Elena Cruz',role: 'Faculty',  quote: "We design curriculum around curiosity, not compliance. That's the Tara Eskwela difference." },
];

const Home: React.FC = () => (
  <div className="page page--home">
    <Hero />

    {/* Programs */}
    <section className="section section--light">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Academic Programs</span>
          <h2>Built for Every <em>Brilliant</em> Mind</h2>
          <p>Six pathways designed to ignite passion and build mastery from elementary through senior high school.</p>
        </div>
        <div className="grid grid--3">
          {programs.map(({ icon, title, desc }) => (
            <div key={title} className="card card--program">
              <div className="card__icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <Link to="/services" className="card__link">Learn more →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Band */}
    <section className="cta-band">
      <div className="container">
        <h2>Ready to Begin the Journey?</h2>
        <p>Applications for SY 2025–2026 are now open. Limited slots available per year level.</p>
        <Link to="/register" className="btn btn--primary btn--large">Start Your Application</Link>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section section--dark">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2>Voices of the <em>Tara Eskwela</em> Community</h2>
        </div>
        <div className="grid grid--3">
          {testimonials.map(({ name, role, quote }) => (
            <blockquote key={name} className="testimonial">
              <p>"{quote}"</p>
              <footer>
                <strong>{name}</strong>
                <span>{role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Home;