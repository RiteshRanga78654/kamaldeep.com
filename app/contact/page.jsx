"use client";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ImageStrip from "../../components/ImageStrip";

/**
 * ContactPage — matches the Risy kit's contact layout:
 *   Header → map + "Reach Us" info block → message form + photo collage
 *   → logo marquee → image strip → Footer
 *
 * Same fonts (Cormorant + Work Sans) and palette (cream / tan / olive / ink)
 * as Header.jsx / Footer.jsx / ProjectsPage.jsx / BlogPage.jsx.
 */

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

const COLLAGE = [
    "https://picsum.photos/seed/contact-1/500/620",
    "https://picsum.photos/seed/contact-2/420/320",
    "https://picsum.photos/seed/contact-3/420/420",
];

/* ---------------------------------------------------------------------- */
/*  Icons                                                                  */
/* ---------------------------------------------------------------------- */

const Spark = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path
            d="M12 1c.6 3.9 1.8 6.5 4.2 8.9C18.6 12.3 21.2 13.4 25 14c-3.8.6-6.4 1.7-8.8 4.1C13.8 20.5 12.6 23.1 12 27c-.6-3.9-1.8-6.5-4.2-8.9C5.4 15.7 2.8 14.6-1 14c3.8-.6 6.4-1.7 8.8-4.1C10.2 7.5 11.4 4.9 12 1Z"
            fill="#C9A24B"
        />
    </svg>
);

const PinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
            d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22Z"
            stroke="currentColor"
            strokeWidth="1.6"
        />
        <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
);

const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* ---------------------------------------------------------------------- */
/*  Pieces                                                                 */
/* ---------------------------------------------------------------------- */

function ReachUs() {
    return (
        <section className="cp-reach">
            <div className="cp-map">
                <iframe
                    title="Office location"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                        CONTACT_ADDRESS
                    )}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            <div className="cp-reach-copy">
                <Spark />
                <h1>
                    Reach Us, <em>Let&rsquo;s Discuss</em>
                    <br />
                    Your Content Journey
                </h1>
                <p>
                    Have a project in mind or just want to say hello? Drop your details
                    and we&rsquo;ll get back to you within a day or two.
                </p>

                <div className="cp-info-grid">
                    <div className="cp-info-item">
                        <span className="cp-info-icon"><PinIcon /></span>
                        <div>
                            <h4>Visit Us</h4>
                            <p>{CONTACT_ADDRESS}</p>
                        </div>
                    </div>
                    <div className="cp-info-item">
                        <span className="cp-info-icon"><MailIcon /></span>
                        <div>
                            <h4>Email Us</h4>
                            <p>
                                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MessageForm() {
    const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
    const [sent, setSent] = useState(false);

    const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const submit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email) return;
        setSent(true);
    };

    return (
        <section className="cp-message">
            <div className="cp-message-form">
                <h2>
                    Send Us a <em>Message</em>
                </h2>
                <p>Tell us a little about what you need — we&rsquo;ll follow up by email or phone.</p>

                <form onSubmit={submit}>
                    <label>
                        Name *
                        <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={form.name}
                            onChange={update("name")}
                        />
                    </label>

                    <div className="cp-form-row">
                        <label>
                            Phone No *
                            <input
                                type="tel"
                                required
                                placeholder="+91 00000 00000"
                                value={form.phone}
                                onChange={update("phone")}
                            />
                        </label>
                        <label>
                            Email *
                            <input
                                type="email"
                                required
                                placeholder="you@domain.com"
                                value={form.email}
                                onChange={update("email")}
                            />
                        </label>
                    </div>

                    <label>
                        Description *
                        <textarea
                            rows={5}
                            required
                            placeholder="What can we help you with?"
                            value={form.description}
                            onChange={update("description")}
                        />
                    </label>

                    <button type="submit">{sent ? "Message Sent" : "Send Message"}</button>
                </form>
            </div>

            <div className="cp-collage">
                <div className="cp-collage-block" />
                <img src={COLLAGE[0]} alt="" className="cp-collage-main" />
                <img src={COLLAGE[1]} alt="" className="cp-collage-a" />
                <img src={COLLAGE[2]} alt="" className="cp-collage-b" />
            </div>
        </section>
    );
}

function LogoMarquee() {
    const loop = [...LOGOS, ...LOGOS];
    return (
        <section className="cp-marquee-section">
            <p className="cp-marquee-eyebrow">You Might Have Seen Me On</p>
            <div className="cp-marquee">
                <div className="cp-marquee-track">
                    {loop.map((name, i) => (
                        <span className="cp-marquee-logo" key={i}>
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------------------------------------------------------------------- */
/*  Fonts                                                                  */
/* ---------------------------------------------------------------------- */

function useGoogleFonts() {
    useEffect(() => {
        if (document.getElementById("rk-fonts")) return;
        const link = document.createElement("link");
        link.id = "rk-fonts";
        link.rel = "stylesheet";
        link.href =
            "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,500&family=Work+Sans:wght@400;500;600&display=swap";
        document.head.appendChild(link);
    }, []);
}

/* ---------------------------------------------------------------------- */
/*  Root                                                                    */
/* ---------------------------------------------------------------------- */

export default function ContactPage() {
    useGoogleFonts();
    return (
        <div className="cp-root">
            <style>{CSS}</style>
            <Header />
            <br />
            <br />
            <br />
           
            <MessageForm /> 
            <ReachUs />
            {/* <LogoMarquee />
      <ImageStrip /> */}
            <Footer />
        </div>
    );
}

/* ---------------------------------------------------------------------- */
/*  Styles — same tokens as Header.jsx / Footer.jsx / ProjectsPage.jsx     */
/* ---------------------------------------------------------------------- */

const CSS = `
:root{
  --paper:#F7F4ED;
  --card:#EAE2D0;
  --border:#D3CAB8;
  --olive:#75825C;
  --olive-dark:#5F694B;
  --ink:#120A02;
  --body:#49443C;
}
.cp-root{
  background:var(--paper);
  color:var(--body);
  font-family:'Work Sans', sans-serif;
  -webkit-font-smoothing:antialiased;
}
.cp-root *{ box-sizing:border-box; }
.cp-root img{ display:block; max-width:100%; }
.cp-root a{ color:inherit; }
.cp-root h1,.cp-root h2,.cp-root h4{ font-family:'Cormorant', Georgia, serif; color:var(--ink); margin:0; font-weight:500; }
.cp-root em{ font-style:italic; color:var(--olive-dark); }

/* reach us */
.cp-reach{
  max-width:1180px; margin:0 auto; padding:64px 32px 32px;
  display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:stretch;
}
.cp-map{ border-radius:6px; overflow:hidden; min-height:340px; border:1px solid var(--border); }
.cp-map iframe{ width:100%; height:100%; min-height:340px; border:0; display:block; filter:saturate(0.85) contrast(1.02); }
.cp-reach-copy{ display:flex; flex-direction:column; gap:16px; justify-content:center; }
.cp-reach-copy h1{ font-size:clamp(28px,3.6vw,38px); line-height:1.18; }
.cp-reach-copy > p{ font-size:14.5px; line-height:1.7; color:var(--body); opacity:.85; max-width:44ch; margin:0; }

.cp-info-grid{ display:flex; gap:36px; margin-top:12px; flex-wrap:wrap; }
.cp-info-item{ display:flex; gap:12px; align-items:flex-start; }
.cp-info-icon{
  width:38px; height:38px; border-radius:50%; border:1px solid var(--border);
  display:flex; align-items:center; justify-content:center; color:var(--olive-dark); flex:none;
}
.cp-info-item h4{ font-size:15px; margin-bottom:4px; }
.cp-info-item p{ font-size:13.5px; color:var(--body); opacity:.85; margin:0; max-width:24ch; }
.cp-info-item a{ text-decoration:underline; text-decoration-color:var(--border); }
.cp-info-item a:hover{ color:var(--olive-dark); }

@media (max-width:860px){
  .cp-reach{ grid-template-columns:1fr; }
  .cp-map{ min-height:280px; }
}

/* message + form */
.cp-message{
  max-width:1180px; margin:0 auto; padding:56px 32px 88px;
  display:grid; grid-template-columns:1fr 0.9fr; gap:64px; align-items:start;
}
.cp-message-form h2{ font-size:clamp(26px,3.2vw,34px); margin-bottom:12px; }
.cp-message-form > p{ font-size:14px; color:var(--body); opacity:.8; margin:0 0 28px; max-width:44ch; }
.cp-message-form form{ display:flex; flex-direction:column; gap:18px; }
.cp-form-row{ display:grid; grid-template-columns:1fr 1fr; gap:18px; }
.cp-message-form label{ display:flex; flex-direction:column; gap:8px; font-size:12.5px; letter-spacing:0.03em; color:var(--body); }
.cp-message-form input, .cp-message-form textarea{
  font-family:inherit; font-size:14.5px; padding:13px 15px; border:1px solid var(--border);
  background:#fff; color:var(--ink); resize:vertical; transition:border-color .2s ease, box-shadow .2s ease;
}
.cp-message-form input:focus, .cp-message-form textarea:focus{
  outline:none; border-color:var(--olive); box-shadow:0 0 0 3px rgba(117,130,92,0.15);
}
.cp-message-form button{
  align-self:flex-start; margin-top:4px; background:var(--olive-dark); color:#fff; border:none;
  padding:14px 30px; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; font-weight:600;
  cursor:pointer; transition:background .2s ease, transform .2s ease;
}
.cp-message-form button:hover{ background:var(--ink); transform:translateY(-1px); }

@media (max-width:700px){
  .cp-form-row{ grid-template-columns:1fr; }
}

/* photo collage */
.cp-collage{ position:relative; min-height:420px; }
.cp-collage-block{
  position:absolute; top:8%; left:6%; width:70%; height:60%;
  background:var(--card); border:1px solid var(--border);
}
.cp-collage-main{
  position:absolute; top:0; right:0; width:66%; border-radius:4px;
  object-fit:cover; height:64%; box-shadow:0 24px 48px rgba(18,10,2,0.12);
  transition:transform .5s ease;
}
.cp-collage-a{
  position:absolute; left:0; bottom:0; width:48%; border-radius:4px;
  object-fit:cover; height:38%; box-shadow:0 20px 40px rgba(18,10,2,0.12);
  transition:transform .5s ease;
}
.cp-collage-b{
  position:absolute; right:6%; bottom:2%; width:38%; border-radius:4px;
  object-fit:cover; height:34%; box-shadow:0 20px 40px rgba(18,10,2,0.12);
  transition:transform .5s ease;
}
.cp-collage:hover img{ transform:translateY(-4px); }
@media (max-width:860px){
  .cp-message{ grid-template-columns:1fr; }
  .cp-collage{ min-height:340px; }
}

/* logo marquee */
.cp-marquee-section{ padding:8px 0 84px; text-align:center; }
.cp-marquee-eyebrow{
  font-size:12px; letter-spacing:0.16em; text-transform:uppercase; font-weight:600;
  color:var(--olive-dark); margin:0 0 32px;
}
.cp-marquee{
  overflow:hidden;
  -webkit-mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.cp-marquee-track{
  display:flex; align-items:center; gap:64px; width:max-content;
  animation:cp-scroll 26s linear infinite;
}
.cp-marquee:hover .cp-marquee-track{ animation-play-state:paused; }
.cp-marquee-logo{
  font-family:'Cormorant', serif; font-style:italic; font-weight:600; font-size:24px;
  color:var(--ink); opacity:.4; white-space:nowrap; transition:opacity .25s ease, color .25s ease;
}
.cp-marquee-logo:hover{ opacity:1; color:var(--olive-dark); }
@keyframes cp-scroll{
  from{ transform:translateX(0); }
  to{ transform:translateX(-50%); }
}
@media (prefers-reduced-motion: reduce){
  .cp-marquee-track{ animation:none; }
  .cp-collage img{ transition:none; }
}
`;