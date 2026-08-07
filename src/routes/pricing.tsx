import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Glass Nexus Academy" },
      { name: "description", content: "Monthly course fees for Python, Web Design, Cyber Security, UI/UX & Video Editing, plus ₦15,000/month O-Level and JAMB online prep." },
      { property: "og:title", content: "Pricing — Glass Nexus Academy" },
      { property: "og:description", content: "Transparent monthly pricing for every track. Pay via bank transfer, Flutterwave or Paystack. Payment splitting available." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://glass-nexus-academy.lovable.app/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pricing — Glass Nexus Academy" },
      { name: "twitter:description", content: "Monthly course fees for tech tracks and O-Level/JAMB online classes." },
    ],
    links: [{ rel: "canonical", href: "https://glass-nexus-academy.lovable.app/pricing" }],
  }),
  component: Pricing,
});

const FAQS = [
  { q: "How do online classes work?", a: "Classes run live on Zoom or Google Meet. You can ask questions in real time. If you miss a class, recorded backups are uploaded to the student portal within 2 hours." },
  { q: "Can I split my payment?", a: "Yes. We offer payment splitting (e.g. 50% upfront and 50% mid-month) via bank transfer, Flutterwave or Paystack." },
  { q: "Do you run physical classes?", a: "Yes — our physical lab is in Ikorodu, Lagos State, with modern computers and a hardware repair bench." },
  { q: "What hardware services do you offer?", a: "We sell refurbished professional laptops/desktops and provide certified repairs (diagnostics, screen replacements, RAM, batteries and more)." },
];

const wa = (msg: string) => `https://wa.me/2349154338312?text=${encodeURIComponent(msg)}`;

type Plan = { name: string; price: string; was: string; per: string; desc: string; feats: string[]; featured?: boolean; msg: string };
const PLANS: Plan[] = [
  { name: "Python Programming", price: "₦25,000", was: "₦50,000", per: "/ month", desc: "Basic Python — 2 classes/week (teaching + practical).", feats: ["2 classes/week (teaching + practical)", "Beginner-friendly modules", "Projects + certificate"], msg: "Hi, I'd like to enrol in Python Programming." },
  { name: "Computer Operations", price: "₦25,000", was: "₦50,000", per: "/ month", desc: "Microsoft Office packages — 2 classes/week (teaching + practical).", feats: ["Word · Excel · PowerPoint", "2 classes/week (teaching + practical)", "Beginner-friendly"], msg: "Hi, I'd like to enrol in Computer Operations (Microsoft Packages)." },
  { name: "Web Design — Frontend", price: "₦25,000", was: "₦50,000", per: "/ month", desc: "HTML, CSS, React — 2 classes/week (teaching + practical).", feats: ["2 classes/week (teaching + practical)", "Responsive design", "Portfolio projects"], featured: true, msg: "Hi, I'd like to enrol in Frontend Web Design." },
  { name: "Web Design — Backend", price: "₦25,000", was: "₦50,000", per: "/ month", desc: "PHP & MySQL — 2 classes/week (teaching + practical).", feats: ["2 classes/week (teaching + practical)", "MySQL & databases", "Dynamic web apps"], msg: "Hi, I'd like to enrol in Backend Web Design (PHP)." },
  { name: "UI/UX & Video Editing", price: "₦25,000", was: "₦50,000", per: "/ month", desc: "Figma + professional video editing — 2 classes/week (teaching + practical).", feats: ["2 classes/week (teaching + practical)", "Premiere / CapCut", "Client-style projects"], msg: "Hi, I'd like to enrol in UI/UX & Video Editing." },
  { name: "Cyber Security", price: "₦30,000", was: "₦60,000", per: "/ month", desc: "Practical cyber security — 2 classes/week (teaching + practical).", feats: ["2 classes/week (teaching + practical)", "Threat detection basics", "Hands-on labs"], msg: "Hi, I'd like to enrol in Cyber Security." },
  { name: "Data Analysis", price: "₦25,000", was: "₦50,000", per: "/ month", desc: "Advanced Excel & SQL — 2 classes/week (teaching + practical).", feats: ["2 classes/week (teaching + practical)", "SQL basics", "Data storytelling"], msg: "Hi, I'd like to enrol in Data Analysis." },
  { name: "O-Level / JAMB Online", price: "₦15,000", was: "₦30,000", per: "/ month", desc: "WAEC · NECO · GCE · JAMB — online for SS1–SS3.", feats: ["Maths, English, F-Maths, ICT…", "Live online classes", "All exam boards covered"], msg: "Hi, I'm interested in the O-Level/JAMB online classes at Glass Nexus Academy at ₦15,000/month." },
];

type Bundle = { title: string; includes: string; was: string; price: string; term: string; feats: string[]; href: string; accent: string };
const BUNDLES: Bundle[] = [
  {
    title: "Complete Web Developer Track",
    includes: "Frontend Web Design + Backend Web Design + UI/UX & Video Editing",
    was: "₦75,000",
    price: "₦60,000",
    term: "one-time, 3 months",
    feats: ["3 courses in one program", "Frontend + Backend + Design", "Full portfolio: 3+ real projects", "Certificate on completion"],
    href: "https://wa.me/2349154338312?text=Hi%2C%20I'm%20interested%20in%20the%20Complete%20Web%20Developer%20Track%20bundle.",
    accent: "#0EA5E9",
  },
  {
    title: "Complete Data & AI Track",
    includes: "Data Analysis + AI & Automation",
    was: "₦50,000",
    price: "₦42,000",
    term: "one-time, 3 months",
    feats: ["2 courses in one program", "Excel, SQL, Power BI + AI tools", "Real business dataset projects", "Certificate on completion"],
    href: "https://wa.me/2349154338312?text=Hi%2C%20I'm%20interested%20in%20the%20Complete%20Data%20%26%20AI%20Track%20bundle.",
    accent: "#FF8C42",
  },
];

function Pricing() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="hero-bg" />
        <div className="s-inner" style={{ paddingTop: "5rem" }}>
          <span className="eyebrow">Monthly course pricing</span>
          <h1 className="s-title">Simple &amp; Transparent Pricing</h1>
          <p className="s-sub">Monthly fees per course. Pay via bank transfer, Flutterwave or Paystack. Payment splitting available.</p>
        </div>
      </section>

      <section className="bundle-section">
        <div className="s-inner">
          <div className="sec-wrap" style={{ paddingTop: 0 }}>
            <span className="sec-chip">Save more</span>
            <h2 className="sec-title">Save More With a Career Track Bundle</h2>
            <p className="sec-sub">Combine related courses and pay less than enrolling in each track separately.</p>
          </div>
          <div className="bundle-grid">
            {BUNDLES.map((b) => (
              <div className="bundle-card" key={b.title} style={{ borderColor: b.accent }}>
                <span className="bundle-badge">Best Value</span>
                <div className="bundle-title">{b.title}</div>
                <div className="bundle-includes">{b.includes}</div>
                <div className="bundle-price-wrap">
                  <span className="bundle-was">{b.was}</span>
                  <span className="bundle-price">{b.price}</span>
                  <span className="bundle-term">({b.term})</span>
                </div>
                <div className="bundle-divider" />
                <div className="bundle-feats">
                  {b.feats.map((f) => (
                    <div className="bundle-feat" key={f}><i className="ti ti-check" /> {f}</div>
                  ))}
                </div>
                <a href={b.href} target="_blank" rel="noopener" className="bundle-btn">Enrol now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <div className="sec-wrap">
            <span className="sec-chip">Individual courses</span>
            <h2 className="sec-title">Monthly Course Fees</h2>
            <p className="sec-sub">Founding-cohort pricing for every track. Enrol month-to-month or upgrade to a bundle above.</p>
          </div>
          <div className="pricing-grid pricing-grid-wide">
            {PLANS.map((p) => (
              <div className={`p-card${p.featured ? " featured" : ""}`} key={p.name}>
                {p.featured && <span className="p-badge">Most popular</span>}
                <span className="p-badge-founding">Founding Cohort Price</span>
                <div className="p-name">{p.name}</div>
                <div className="p-price-wrap">
                  <span className="p-was">{p.was}</span>
                  <div className="p-price">{p.price} <span>{p.per}</span></div>
                </div>
                <p className="p-desc">{p.desc}</p>
                <div className="p-divider" />
                <div className="p-feats">
                  {p.feats.map((f) => (
                    <div className="p-feat" key={f}><i className="ti ti-check" /> {f}</div>
                  ))}
                </div>
                <a href={wa(p.msg)} target="_blank" rel="noopener" className={`p-btn${p.featured ? "" : " out"}`}>Enrol now</a>
              </div>
            ))}
          </div>
          <p className="services-pay-note">💳 Payments accepted online via Flutterwave / Paystack</p>
        </div>
      </section>

      <section style={{ background: "var(--dark2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="s-inner">
          <div className="sec-wrap">
            <span className="sec-chip">Got Questions?</span>
            <h2 className="sec-title">Frequently Asked Questions</h2>
            <p className="sec-sub">Quick answers about classes, payments and our tech services</p>
          </div>
          <div className="faq-grid">
            {FAQS.map((f, i) => (
              <div className={`faq-item${open === i ? " open" : ""}`} key={f.q}>
                <button className="faq-header" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-question">{f.q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <p className="faq-answer">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <h2>Ready to start your<br /><span style={{ color: "var(--green)" }}>tech journey?</span></h2>
        <p>Enrol today and get certified in your chosen track.</p>
        <Link className="btn-glow" to="/contact">Get started today</Link>
      </div>
    </SiteLayout>
  );
}
