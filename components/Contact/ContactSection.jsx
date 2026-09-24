export function ContactSection() {
  return (
    <section className="contact-wrap" id="contact">
      <div className="container">
        <div className="contact-row reveal">
          <div className="contact-copy">
            <span className="eyebrow-label">Let&apos;s Connect</span>
            <h2 className="section-title serif" style={{ paddingBottom: 0 }}>Get in Touch</h2>
            <p style={{ paddingBottom: 0 }}>I am always open to discussing new opportunities, partnerships or ideas. Feel free to reach out.</p>
          </div>
          <a href="/contact" className="btn btn-dark">Send a Message
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
      <svg className="world-dots" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#1C1912">
          <circle cx="10" cy="20" r="1.6" /><circle cx="30" cy="15" r="1.6" /><circle cx="50" cy="25" r="1.6" /><circle cx="70" cy="18" r="1.6" /><circle cx="90" cy="30" r="1.6" /><circle cx="110" cy="20" r="1.6" /><circle cx="130" cy="35" r="1.6" /><circle cx="150" cy="22" r="1.6" /><circle cx="170" cy="40" r="1.6" /><circle cx="190" cy="25" r="1.6" /><circle cx="210" cy="45" r="1.6" /><circle cx="230" cy="30" r="1.6" /><circle cx="250" cy="50" r="1.6" /><circle cx="270" cy="35" r="1.6" />
          <circle cx="20" cy="50" r="1.6" /><circle cx="45" cy="55" r="1.6" /><circle cx="65" cy="48" r="1.6" /><circle cx="95" cy="60" r="1.6" /><circle cx="120" cy="52" r="1.6" /><circle cx="145" cy="65" r="1.6" /><circle cx="175" cy="55" r="1.6" /><circle cx="200" cy="68" r="1.6" /><circle cx="225" cy="58" r="1.6" /><circle cx="255" cy="70" r="1.6" /><circle cx="280" cy="60" r="1.6" />
          <circle cx="35" cy="85" r="1.6" /><circle cx="60" cy="90" r="1.6" /><circle cx="85" cy="82" r="1.6" /><circle cx="115" cy="95" r="1.6" /><circle cx="140" cy="88" r="1.6" /><circle cx="165" cy="100" r="1.6" /><circle cx="195" cy="90" r="1.6" /><circle cx="220" cy="102" r="1.6" /><circle cx="245" cy="92" r="1.6" />
          <circle cx="25" cy="120" r="1.6" /><circle cx="55" cy="125" r="1.6" /><circle cx="80" cy="118" r="1.6" /><circle cx="105" cy="130" r="1.6" /><circle cx="135" cy="122" r="1.6" /><circle cx="160" cy="135" r="1.6" /><circle cx="185" cy="125" r="1.6" /><circle cx="215" cy="138" r="1.6" />
        </g>
      </svg>
    </section>
  );
}