"use client";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PORTRAIT_IMG = "https://www.ireedindia.com/assets/images/ireed-team/003.jpg";
const LINKEDIN_URL = "https://www.linkedin.com/in/kamaldeep01/";

const STATS = [
  { value: "5+", label: "Years in Real Estate & EdTech" },
  { value: "1,200+", label: "Learners & Aspirants Guided" },
  { value: "20+", label: "Academic & Corporate Alliances" },
  { value: "100%", label: "Focus on Practical Market Readiness" },
];

const VALUES = [
  {
    title: "Up-Country Expansion",
    desc: "Scaling IREED Academy beyond Delhi-NCR, bridging tier-2 & tier-3 educational pipelines with tier-1 developers.",
  },
  {
    title: "Institutional Alliances",
    desc: "Structuring credit-aligned certifications with universities, colleges, and national real estate associations.",
  },
  {
    title: "Workforce Readiness",
    desc: "Translating theoretical real estate law, RERA regulations, and sales funnels into job-ready skills.",
  },
  {
    title: "Long-Term Mentorship",
    desc: "Focusing on sustainable career paths rather than transactional short-term sales placements.",
  },
];

const COLLABORATIONS = [
  "IREED Academy",
  "Trident Realty",
  "DPG Degree College",
  "MDU Affiliated Programs",
  "REACT Framework",
  "RECAP Initiative",
  "NAREDCO Student Chapter",
];

const CHECKLIST = [
  "End-to-end expertise in high-ticket luxury real estate advisory",
  "Strategic leader for institutional alliances & university integration",
  "Curator of executive real estate sales bootcamps",
  "Direct bridge between builders, universities, and top-tier talent",
];

const GALLERY_IMAGES = [
  {
    title: "Campus Masterclass",
    tag: "Academic Leadership",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    span: "col-2",
  },
  {
    title: "Institutional MoU Signing",
    tag: "Strategic Alliances",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
    span: "col-1",
  },
  {
    title: "Developer Conclave",
    tag: "Corporate Outreach",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
    span: "col-1",
  },
  {
    title: "Sales Simulation Workshop",
    tag: "Hands-on Training",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    span: "col-1",
  },
  {
    title: "Leadership Roundtable",
    tag: "Curriculum Strategy",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    span: "col-2",
  },
];

/* ---------------------------------------------------------------------- */
/*  Icons                                                                 */
/* ---------------------------------------------------------------------- */

const Spark = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2c.6 3.6 1.8 6 4.2 8.4C18.6 12.8 21 14 24.6 14.6c-3.6.6-6 1.8-8.4 4.2C13.8 21.2 12.6 23.6 12 27.2c-.6-3.6-1.8-6-4.2-8.4C5.4 16.4 3 15.2-.6 14.6c3.6-.6 6-1.8 8.4-4.2C10.2 8 11.4 5.6 12 2Z"
      fill="#C9A24B"
    />
  </svg>
);

const VALUE_ICONS = [
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="m14.5 9.5-2 5-5 2 2-5 5-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>,
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
  </svg>,
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 19h16M4 15l5-5 4 4 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="16" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>,
];

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="m4 12 5 5L20 6" stroke="#5F694B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------- */
/*  Sections                                                              */
/* ---------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="ab-hero">
      <div className="ab-hero-media">
        <div className="ab-hero-img-wrap">
          <img src={PORTRAIT_IMG} alt="Kamaldeep Prajapati" className="ab-hero-main-img" />
          <div className="ab-badge">
            <span className="ab-badge-dot"></span> Active Leader & Mentor
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80"
          alt="Executive meeting"
          className="ab-hero-media-small"
        />
      </div>

      <div className="ab-hero-copy">
        <div className="ab-eyebrow">
          <Spark size={18} />
          <span>Executive Leadership</span>
        </div>
        <h1>
          Scaling Real Estate Talent &amp; <em>High-Growth Alliances</em>
        </h1>
        <p>
          Kamaldeep Prajapati spearheads up-country business expansion at <strong>IREED Academy</strong>. Combining luxury real estate advisory with institutional curriculum building, he transforms young aspirants into industry-ready leaders.
        </p>

        <div className="ab-cta-row">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="ab-btn">
            Connect on LinkedIn
          </a>
          <a href="/contact" className="ab-btn-ghost">
            Schedule a Meeting
          </a>
        </div>

        <div className="ab-signature">
          <span className="ab-signature-script">Kamaldeep</span>
          <div>
            <strong>Kamaldeep Prajapati</strong>
            <span>Business Head & Strategic Mentor, IREED Academy</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="ab-stats-band">
      <div className="ab-stats-container">
        {STATS.map((stat, i) => (
          <div className="ab-stat-item" key={i}>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="ab-values">
      <div className="ab-values-header">
        <div className="ab-eyebrow">
          <Spark size={18} />
          <span>Strategic Pillars</span>
        </div>
        <h2>Guiding the Next Generation of Real Estate Leaders</h2>
        <p>
          A systemic approach that bridges real-world market intelligence, corporate alliances, and hands-on operational training.
        </p>
      </div>

      <div className="ab-values-grid">
        {VALUES.map((v, i) => (
          <div className="ab-value-card" key={v.title}>
            <div className="ab-value-icon">{VALUE_ICONS[i]}</div>
            <h4>{v.title}</h4>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LogoMarquee() {
  const loop = [...COLLABORATIONS, ...COLLABORATIONS];
  return (
    <section className="ab-marquee-section">
      <p className="ab-marquee-eyebrow">Key Affiliations &amp; Institutional Reach</p>
      <div className="ab-marquee">
        <div className="ab-marquee-track">
          {loop.map((name, i) => (
            <span className="ab-marquee-logo" key={i}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CredentialsSection() {
  return (
    <section className="ab-credentials">
      <div className="ab-credentials-copy">
        <div className="ab-eyebrow">
          <Spark size={18} />
          <span>Track Record</span>
        </div>
        <h2>
          Building Resilient Careers That <em>Thrive</em>
        </h2>
        <p>
          From luxury advisory mandates to curriculum frameworks recognized by leading educational bodies, the focus has always been on concrete execution and outcome-driven mentorship.
        </p>
        <ul className="ab-checklist">
          {CHECKLIST.map((item) => (
            <li key={item}>
              <span className="ab-check-icon"><Check /></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "28px" }}>
          <a href="/contact" className="ab-btn">
            Initiate Corporate Collaboration
          </a>
        </div>
      </div>

      <div className="ab-credentials-media">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&q=80"
          alt="Team Collaboration Session"
          className="ab-credentials-main"
        />
        <div className="ab-credentials-overlay-card">
          <h4>Industry-Ready Model</h4>
          <p>Practical frameworks tailored directly for Tier-1 real estate developers.</p>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="ab-gallery">
      <div className="ab-gallery-header">
        <div className="ab-eyebrow">
          <Spark size={18} />
          <span>Moments &amp; Glimpses</span>
        </div>
        <h2>Impact in Action</h2>
        <p>
          Highlights from university partnership signings, real estate conclaves, and hands-on bootcamps across India.
        </p>
      </div>

      <div className="ab-gallery-grid">
        {GALLERY_IMAGES.map((item, idx) => (
          <div
            key={idx}
            className={`ab-gallery-card ${item.span === "col-2" ? "ab-gallery-span-2" : ""}`}
          >
            <div className="ab-gallery-box">
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className="ab-gallery-overlay">
                <span className="ab-gallery-tag">{item.tag}</span>
                <h4 className="ab-gallery-title">{item.title}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Main Component                                                        */
/* ---------------------------------------------------------------------- */

export default function AboutPage() {
  useEffect(() => {
    if (document.getElementById("rk-fonts")) return;
    const link = document.createElement("link");
    link.id = "rk-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,500&family=Work+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="ab-root">
      <style>{CSS}</style>
      <Header />
      <br/>
      <br/>
      <br/>
      <Hero />
      <StatsBand />
      <ValuesSection />
      <LogoMarquee />
      <CredentialsSection />
      <GallerySection />
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Styles                                                                */
/* ---------------------------------------------------------------------- */

const CSS = `
:root {
  --paper: #F8F6F0;
  --card: #FFFFFF;
  --border: #E4DCCF;
  --olive: #75825C;
  --olive-dark: #4F583D;
  --ink: #120A02;
  --body: #4F4942;
  --gold: #C9A24B;
}

.ab-root {
  background: var(--paper);
  color: var(--body);
  font-family: 'Work Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}
.ab-root * { box-sizing: border-box; }
.ab-root img { display: block; max-width: 100%; }
.ab-root a { color: inherit; text-decoration: none; }
.ab-root h1, .ab-root h2, .ab-root h3, .ab-root h4 {
  font-family: 'Cormorant', Georgia, serif;
  color: var(--ink);
  margin: 0;
  font-weight: 500;
}
.ab-root em { font-style: italic; color: var(--olive-dark); }

.ab-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 600;
  color: var(--olive-dark);
  margin-bottom: 14px;
}

/* Buttons */
.ab-cta-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.ab-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--olive-dark);
  color: #fff;
  padding: 14px 28px;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  transition: all 0.25s ease;
  border-radius: 2px;
  cursor: pointer;
  border: none;
}
.ab-btn:hover {
  background: var(--ink);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(18,10,2,0.12);
}
.ab-btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--ink);
  padding: 13px 26px;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  transition: all 0.25s ease;
  border-radius: 2px;
}
.ab-btn-ghost:hover {
  border-color: var(--ink);
  background: rgba(18,10,2,0.03);
}

/* Hero Section */
.ab-hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 32px 56px;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 64px;
  align-items: center;
}
.ab-hero-media { position: relative; }
.ab-hero-img-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  background: #eae3d5;
}
.ab-hero-main-img {
  width: 100%;
  aspect-ratio: 4/4.8;
  object-fit: cover;
}
.ab-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.ab-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2ECC71;
}
.ab-hero-media-small {
  position: absolute;
  bottom: -28px;
  right: -24px;
  width: 48%;
  border-radius: 6px;
  box-shadow: 0 20px 40px rgba(18,10,2,0.14);
  border: 5px solid var(--paper);
}
.ab-hero-copy h1 {
  font-size: clamp(32px, 4vw, 44px);
  line-height: 1.18;
  margin-bottom: 18px;
}
.ab-hero-copy > p {
  font-size: 15px;
  line-height: 1.75;
  color: var(--body);
  margin: 0 0 28px;
  max-width: 52ch;
}
.ab-signature {
  display: flex;
  align-items: center;
  gap: 18px;
  border-top: 1px solid var(--border);
  padding-top: 24px;
}
.ab-signature-script {
  font-family: 'Cormorant', serif;
  font-style: italic;
  font-size: 34px;
  color: var(--ink);
}
.ab-signature strong { display: block; font-size: 14px; color: var(--ink); }
.ab-signature span { font-size: 12px; color: var(--body); opacity: 0.8; }

/* Stats Band */
.ab-stats-band {
  background: #EFE9DD;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 44px 32px;
}
.ab-stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  text-align: center;
}
.ab-stat-item h3 {
  font-size: clamp(34px, 3.8vw, 44px);
  color: var(--olive-dark);
  margin-bottom: 6px;
}
.ab-stat-item p {
  font-size: 12.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--body);
  margin: 0;
}

/* Values Section */
.ab-values {
  max-width: 1200px;
  margin: 0 auto;
  padding: 88px 32px;
}
.ab-values-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 52px;
}
.ab-values-header h2 {
  font-size: clamp(28px, 3.4vw, 38px);
  line-height: 1.22;
  margin-bottom: 14px;
}
.ab-values-header p {
  font-size: 15px;
  line-height: 1.65;
  color: var(--body);
  margin: 0;
}
.ab-values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.ab-value-card {
  background: var(--card);
  padding: 32px 24px;
  border: 1px solid var(--border);
  border-radius: 4px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.ab-value-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(18,10,2,0.06);
}
.ab-value-icon {
  color: var(--olive-dark);
  margin-bottom: 16px;
}
.ab-value-card h4 { font-size: 19px; margin-bottom: 10px; }
.ab-value-card p {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--body);
  margin: 0;
  opacity: 0.85;
}

/* Logo Marquee */
.ab-marquee-section {
  padding: 56px 0;
  text-align: center;
  border-top: 1px solid var(--border);
}
.ab-marquee-eyebrow {
  font-size: 11.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--olive-dark);
  margin: 0 0 28px;
}
.ab-marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}
.ab-marquee-track {
  display: flex;
  align-items: center;
  gap: 64px;
  width: max-content;
  animation: ab-scroll 24s linear infinite;
}
.ab-marquee:hover .ab-marquee-track { animation-play-state: paused; }
.ab-marquee-logo {
  font-family: 'Cormorant', serif;
  font-style: italic;
  font-weight: 600;
  font-size: 21px;
  color: var(--ink);
  opacity: 0.45;
  white-space: nowrap;
  transition: opacity 0.2s ease, color 0.2s ease;
}
.ab-marquee-logo:hover { opacity: 1; color: var(--olive-dark); }
@keyframes ab-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* Credentials Section */
.ab-credentials {
  max-width: 1200px;
  margin: 0 auto;
  padding: 44px 32px 88px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 64px;
  align-items: center;
}
.ab-credentials-copy h2 {
  font-size: clamp(28px, 3.4vw, 38px);
  line-height: 1.24;
  margin-bottom: 16px;
}
.ab-credentials-copy > p {
  font-size: 14.5px;
  line-height: 1.7;
  margin: 0 0 24px;
  max-width: 50ch;
}
.ab-checklist {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.ab-checklist li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  color: var(--body);
  line-height: 1.5;
}
.ab-check-icon { margin-top: 1px; flex-shrink: 0; }
.ab-credentials-media { position: relative; }
.ab-credentials-main {
  width: 100%;
  border-radius: 6px;
  aspect-ratio: 4/3.2;
  object-fit: cover;
  box-shadow: 0 20px 40px rgba(18,10,2,0.1);
}
.ab-credentials-overlay-card {
  position: absolute;
  bottom: -24px;
  left: -24px;
  background: var(--card);
  border: 1px solid var(--border);
  padding: 20px 24px;
  border-radius: 4px;
  max-width: 280px;
  box-shadow: 0 16px 32px rgba(18,10,2,0.1);
}
.ab-credentials-overlay-card h4 { font-size: 16px; margin-bottom: 6px; }
.ab-credentials-overlay-card p {
  font-size: 12.5px;
  line-height: 1.5;
  margin: 0;
  color: var(--body);
  opacity: 0.8;
}

/* Gallery / Editorial Grid */
.ab-gallery {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 32px 100px;
}
.ab-gallery-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 48px;
}
.ab-gallery-header h2 {
  font-size: clamp(28px, 3.4vw, 38px);
  margin-bottom: 12px;
}
.ab-gallery-header p {
  font-size: 15px;
  color: var(--body);
  opacity: 0.85;
  margin: 0;
}

.ab-gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.ab-gallery-card {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  background: #E8E2D5;
}
.ab-gallery-span-2 {
  grid-column: span 2;
}
.ab-gallery-box {
  position: relative;
  width: 100%;
  height: 290px;
  overflow: hidden;
}
.ab-gallery-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}
.ab-gallery-card:hover .ab-gallery-box img {
  transform: scale(1.04);
}
.ab-gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(18,10,2,0.02) 30%, rgba(18,10,2,0.85) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  color: #fff;
}
.ab-gallery-tag {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 600;
  color: var(--gold);
  margin-bottom: 6px;
}
.ab-gallery-title {
  color: #FFFFFF;
  font-size: 20px;
  line-height: 1.25;
  margin: 0;
}

/* Responsiveness */
@media (max-width: 960px) {
  .ab-hero, .ab-credentials { grid-template-columns: 1fr; gap: 48px; }
  .ab-hero-media-small { display: none; }
  .ab-values-grid { grid-template-columns: 1fr 1fr; }
  .ab-stats-container { grid-template-columns: 1fr 1fr; gap: 32px; }
  .ab-credentials-overlay-card { position: static; margin-top: 16px; max-width: 100%; }
  
  .ab-gallery-grid { grid-template-columns: 1fr 1fr; }
  .ab-gallery-span-2 { grid-column: span 1; }
}

@media (max-width: 560px) {
  .ab-values-grid { grid-template-columns: 1fr; }
  .ab-stats-container { grid-template-columns: 1fr; }
  .ab-hero { padding: 40px 20px; }
  .ab-gallery-grid { grid-template-columns: 1fr; }
  .ab-gallery-box { height: 240px; }
}

@media (prefers-reduced-motion: reduce) {
  .ab-marquee-track { animation: none; }
  .ab-gallery-card:hover .ab-gallery-box img { transform: none; }
}
`;