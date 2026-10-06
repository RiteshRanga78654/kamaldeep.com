"use client";
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CONTACT_EMAIL = "kamaldeep.prajapati@ireedindia.com";
const CONTACT_ADDRESS = "Sector 49, Ninex City Mart, Gurugram, Haryana";

const LOGOS = [
  "Northline",
  "Verve & Co.",
  "Studio Meridian",
  "Paperlight",
  "Ambervale",
  "Coastal Grove",
];

const CONTACT_IMAGES = {
  primary: "https://i.etsystatic.com/66634731/r/il/53b1b0/8363631956/il_fullxfull.8363631956_pyet.jpg",
  secondary: "https://blog.architizer.com/wp-content/uploads/meeting-2284501_1280.jpg",
  accent: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
};

/* ---------------- Icons ---------------- */
const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22Z" />
    <circle cx="12" cy="9.5" r="2.4" />
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneCallIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

/* ---------------- 3D Card with Hover Shadows ---------------- */
function Tilt3DFormCard() {
  const cardRef = useRef(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isSent) return;

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/v1/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setForm({ name: "", phone: "", email: "", message: "" });
      setIsSent(true);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="card-perspective-scene"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        className="form-3d-card"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Dynamic glossy sheen on top of the card */}
        <div className="card-light-glare" />

        <div className="card-inner-content">
          <div className="card-badge">
            <span className="dot" /> Active Inquiries
          </div>

          <h2 className="card-title">
            Send Us a <em>Message</em>
          </h2>
          <p className="card-subtext">
            Drop your project details below and our team will get in touch with you shortly.
          </p>

          <form onSubmit={handleSubmit} className="form-stack">
            <div className="input-group">
              <label>Full Name *</label>
              <input
                type="text"
                required
                placeholder="Kamaldeep Prajapati"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="contact@ireedindia.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Project Details / Query *</label>
              <textarea
                rows={4}
                required
                placeholder="Tell us what you're looking to build or explore..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || isSent}
              className={`submit-3d-btn ${isSent ? "is-sent" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isSent ? (
                  <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    ✓ Message Transmitted
                  </motion.span>
                ) : isSubmitting ? (
                  <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Transmitting...
                  </motion.span>
                ) : (
                  <motion.span key="ready" className="btn-inner">
                    Send Message <SendIcon />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- Collage with Enhanced Shadows ---------------- */
function ContactCollage() {
  return (
    <div className="contact-collage-scene">
      <motion.div
        className="collage-item hero-image"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <img src={CONTACT_IMAGES.primary} alt="Direct studio hotline" />
        <div className="glass-pill-badge">
          <PhoneCallIcon />
          <span>Direct Lines Active</span>
        </div>
      </motion.div>

      <motion.div
        className="collage-item secondary-image"
        whileHover={{ y: -12, scale: 1.03, rotate: 0 }}
        transition={{ duration: 0.4 }}
      >
        <img src={CONTACT_IMAGES.secondary} alt="Client collaboration session" />
        <div className="meta-tag">Studio Discussion</div>
      </motion.div>

      <motion.div
        className="collage-item accent-image"
        whileHover={{ y: -8, scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img src={CONTACT_IMAGES.accent} alt="Digital connectivity" />
      </motion.div>

      <div className="collage-shadow-plate" />
    </div>
  );
}

/* ---------------- Reach Us ---------------- */
function ReachUs() {
  return (
    <section className="cp-reach-outer">
      <div className="cp-reach-inner">
        <div className="cp-reach-map-card">
          <div className="map-badge-header">
            <span className="live-hub-badge">
              <span className="live-dot" /> Gurugram HQ
            </span>
          </div>
          <iframe
            title="Office location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="cp-reach-details">
          <span className="section-eyebrow">Direct Touchpoints</span>
          <h2>
            Reach Us, <em>Let&rsquo;s Discuss</em>
            <br />
            Your Content Journey
          </h2>
          <p>
            Prefer dropping by our studio or having a direct email exchange? Connect with us via our verified channels.
          </p>

          <div className="touchpoint-cards">
            <div className="tp-card">
              <div className="tp-icon">
                <PinIcon />
              </div>
              <div>
                <h4>Visit Us</h4>
                <p>{CONTACT_ADDRESS}</p>
              </div>
            </div>

            <div className="tp-card">
              <div className="tp-icon">
                <MailIcon />
              </div>
              <div>
                <h4>Email Us</h4>
                <p>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoMarquee() {
  const loop = [...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <div className="marquee-wrapper">
      <div className="marquee-label">Trusted Partnerships & Collaborations</div>
      <div className="marquee-track">
        <div className="marquee-strip">
          {loop.map((item, idx) => (
            <span key={idx} className="marquee-item">
              {item}
              <span className="star">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="contact-page-root">
      <style>{STYLES}</style>
      <Header />
<br/>
<br/>
<br/>
      <main className="contact-main">
        <section className="contact-split-hero">
          <Tilt3DFormCard />
          <ContactCollage />
        </section>

        <LogoMarquee />
        <ReachUs />
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- Enhanced Shadow & 3D CSS ---------------- */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Work+Sans:wght@300;400;500;600&display=swap');

:root {
  --paper: #F6F4ED;
  --surface: #EFEADB;
  --border: #DDD5C3;
  --card-bg: #FFFFFF;
  --olive: #73805B;
  --olive-dark: #586343;
  --gold: #A88B4D;
  --ink: #1B1713;
  --body: #4E473E;
  --radius-card: 20px;
  --radius-input: 8px;
}

.contact-page-root {
  background: var(--paper);
  color: var(--body);
  font-family: 'Work Sans', sans-serif;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

.contact-page-root * { box-sizing: border-box; }
.contact-page-root a { color: inherit; text-decoration: none; }
.contact-page-root h1, .contact-page-root h2, .contact-page-root h4 {
  font-family: 'Cormorant', Georgia, serif;
  color: var(--ink);
  font-weight: 500;
  letter-spacing: -0.01em;
}
.contact-page-root em {
  font-style: italic;
  color: var(--olive-dark);
}

.contact-main {
  padding-top: 48px;
}

.contact-split-hero {
  max-width: 1260px;
  margin: 0 auto;
  padding: 30px 32px 90px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 72px;
  align-items: center;
}

/* ---------------- 3D Card + Multi-layered Hover Shadow ---------------- */
.card-perspective-scene {
  perspective: 1200px;
  display: flex;
  justify-content: center;
}

.form-3d-card {
  position: relative;
  width: 100%;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 44px 40px;
  /* Normal resting shadow */
  box-shadow: 
    0 10px 25px -5px rgba(27, 23, 19, 0.05),
    0 4px 10px -2px rgba(27, 23, 19, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition: box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, transform 0.2s ease;
  overflow: hidden;
}

/* Deep elevated shadow when hovered */
.form-3d-card:hover {
  border-color: rgba(115, 128, 91, 0.35);
  box-shadow: 
    0 35px 70px -15px rgba(27, 23, 19, 0.18),
    0 18px 36px -8px rgba(88, 99, 67, 0.14),
    0 4px 12px 0 rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 1);
}

.card-light-glare {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 180px;
  background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%);
  pointer-events: none;
  z-index: 1;
}

.card-inner-content {
  position: relative;
  z-index: 2;
  transform: translateZ(25px);
}

.card-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--olive-dark);
  background: rgba(115, 128, 91, 0.12);
  padding: 5px 14px;
  border-radius: 40px;
  margin-bottom: 14px;
}

.card-badge .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--olive-dark);
}

.card-title {
  font-size: clamp(30px, 3.4vw, 42px);
  margin: 0 0 8px;
  line-height: 1.15;
}

.card-subtext {
  font-size: 14px;
  color: var(--body);
  opacity: 0.85;
  margin: 0 0 28px;
  line-height: 1.5;
}

.form-stack {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink);
}

.input-group input,
.input-group textarea {
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  padding: 13px 15px;
  background: #FAF8F5;
  border: 1px solid var(--border);
  border-radius: var(--radius-input);
  color: var(--ink);
  transition: all 0.2s ease;
}

.input-group input:focus,
.input-group textarea:focus {
  outline: none;
  background: #FFF;
  border-color: var(--olive);
  box-shadow: 0 0 0 3px rgba(115, 128, 91, 0.15);
}

.submit-3d-btn {
  margin-top: 8px;
  background: var(--olive-dark);
  color: #FFF;
  border: none;
  border-radius: var(--radius-input);
  padding: 15px 30px;
  font-size: 12.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 16px -4px rgba(88, 99, 67, 0.25);
  transition: all 0.25s ease;
}

.submit-3d-btn:hover {
  background: var(--ink);
  box-shadow: 0 10px 24px -4px rgba(27, 23, 19, 0.35);
}

.submit-3d-btn.is-sent {
  background: #2E6539;
  cursor: default;
}

.form-error {
  margin: 0;
  font-size: 13px;
  color: #a0433d;
}

.btn-inner {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* ---------------- Collage Hover Shadows ---------------- */
.contact-collage-scene {
  position: relative;
  width: 100%;
  height: 540px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collage-item {
  position: absolute;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 14px 28px -8px rgba(27, 23, 19, 0.1);
  transition: box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
  cursor: pointer;
}

.collage-item:hover {
  border-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 30px 60px -12px rgba(27, 23, 19, 0.24);
}

.collage-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-image {
  top: 4%;
  right: 0;
  width: 76%;
  height: 64%;
  z-index: 3;
}

.glass-pill-badge {
  position: absolute;
  bottom: 14px;
  left: 14px;
  background: rgba(27, 23, 19, 0.7);
  backdrop-filter: blur(8px);
  padding: 6px 12px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #FFF;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.secondary-image {
  bottom: 6%;
  left: 2%;
  width: 58%;
  height: 44%;
  z-index: 4;
  transform: rotate(-2deg);
}

.meta-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(6px);
  padding: 4px 10px;
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--ink);
  border-radius: 4px;
}

.accent-image {
  bottom: 2%;
  right: 6%;
  width: 38%;
  height: 30%;
  z-index: 5;
}

.collage-shadow-plate {
  position: absolute;
  top: 10%;
  left: -2%;
  width: 86%;
  height: 80%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  z-index: 1;
}

/* ---------------- Reach Us & Interactive Cards ---------------- */
.cp-reach-outer {
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 90px 32px;
}

.cp-reach-inner {
  max-width: 1260px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
}

.cp-reach-map-card {
  position: relative;
  height: 420px;
  border-radius: var(--radius-card);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: 0 14px 28px rgba(0,0,0,0.05);
  transition: box-shadow 0.4s ease, transform 0.3s ease;
}

.cp-reach-map-card:hover {
  box-shadow: 0 24px 50px -10px rgba(0,0,0,0.12);
  transform: translateY(-4px);
}

.cp-reach-map-card iframe {
  width: 100%;
  height: 100%;
  border: 0;
  filter: saturate(0.9) contrast(1.02);
}

.map-badge-header {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
}

.live-hub-badge {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6px);
  padding: 6px 12px;
  border-radius: 30px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2E8540;
}

.section-eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--olive-dark);
}

.cp-reach-details h2 {
  font-size: clamp(32px, 3.6vw, 44px);
  line-height: 1.15;
  margin: 8px 0 16px;
}

.cp-reach-details > p {
  font-size: 15px;
  line-height: 1.65;
  color: var(--body);
  opacity: 0.85;
  margin-bottom: 36px;
  max-width: 48ch;
}

.touchpoint-cards {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.tp-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  padding: 18px 22px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* Touchpoint hover elevation */
.tp-card:hover {
  transform: translateX(4px);
  box-shadow: 0 12px 24px -6px rgba(27, 23, 19, 0.08);
}

.tp-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--surface);
  color: var(--olive-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tp-card h4 {
  font-size: 17px;
  margin: 0 0 3px;
}

.tp-card p {
  font-size: 13.5px;
  margin: 0;
  opacity: 0.85;
}

.tp-card a:hover {
  color: var(--olive-dark);
  text-decoration: underline;
}

/* ---------------- Marquee ---------------- */
.marquee-wrapper {
  padding: 44px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  text-align: center;
  background: rgba(255,255,255,0.4);
}

.marquee-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--olive-dark);
  margin-bottom: 20px;
}

.marquee-track {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.marquee-strip {
  display: flex;
  gap: 48px;
  width: max-content;
  animation: marqueeScroll 28s linear infinite;
}

.marquee-item {
  font-family: 'Cormorant', serif;
  font-style: italic;
  font-size: 24px;
  color: var(--ink);
  opacity: 0.5;
  display: inline-flex;
  align-items: center;
  gap: 48px;
}

.marquee-item .star {
  font-size: 13px;
  color: var(--gold);
  font-style: normal;
}

@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% / 3)); }
}

/* ---------------- Responsive ---------------- */
@media (max-width: 992px) {
  .contact-split-hero,
  .cp-reach-inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .contact-collage-scene {
    order: -1;
    height: 420px;
  }
}

@media (max-width: 640px) {
  .contact-split-hero {
    padding: 20px 20px 60px;
  }
  .form-3d-card {
    padding: 30px 20px;
  }
  .input-row {
    grid-template-columns: 1fr;
  }
  .cp-reach-outer {
    padding: 60px 20px;
  }
  .cp-reach-map-card {
    height: 300px;
  }
}
`;