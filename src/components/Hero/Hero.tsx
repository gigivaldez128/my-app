import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      {/* Dynamic background elements */}
      <div className="hero__background">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid-pattern" />
      </div>

      <div className="container hero__container">
        <div className="hero__content">
          <span className="hero__badge">✨ Admissions Open for SY 2025–2026</span>
          <h1 className="hero__title">
            Shaping Curious Minds, <br />
            Empowering <em>Global Leaders</em>
          </h1>
          <p className="hero__description">
            Tara Eskwela provides a future-ready education that blends rigorous academics, character development, and hands-on innovation in Metro Manila.
          </p>

          <div className="hero__actions">
            <Link to="/register" className="btn btn--primary btn--large">
              Start Application
            </Link>
            <Link to="/services" className="btn btn--ghost btn--large">
              Explore Programs &rarr;
            </Link>
          </div>

          {/* Key metrics */}
          <div className="hero__stats">
            <div className="hero__stat-item">
              <span className="hero__stat-number">Level IV</span>
              <span className="hero__stat-label">PAASCU Accredited</span>
            </div>
            <div className="hero__stat-item">
              <span className="hero__stat-number">100%</span>
              <span className="hero__stat-label">College Acceptance</span>
            </div>
            <div className="hero__stat-item">
              <span className="hero__stat-number">15+</span>
              <span className="hero__stat-label">Global Partner Countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
