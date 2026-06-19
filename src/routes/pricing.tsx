import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Glass Nexus Academy" },
      { name: "description", content: "Monthly course fees for Python, Web Design, Cyber Security, UI/UX & Video Editing, plus ₦12,000/month O-Level and JAMB online prep." },
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

type Plan = { name: string; price: string; per: string; desc: string; feats: string[]; featured?: boolean; msg: string };
const PLANS: Plan[] = [
  { name: "Python Programming", price: "₦25,000", per: "/ month", desc: "Basic Python — 2 classes/week (teaching + practical).", feats: ["2 classes/week (teaching + practical)", "Beginner-friendly modules", "Projects + certificate"], msg: "Hi, I'd like to enrol in Python Programming." },
  { name: "Computer Operations", price: "₦25,000", per: "/ month", desc: "Microsoft Office packages — 2 classes/week (teaching + practical).", feats: ["Word · Excel · PowerPoint", "2 classes/week (teaching + practical)", "Beginner-friendly"], msg: "Hi, I'd like to enrol in Computer Operations (Microsoft Packages)." },
  { name: "Web Design — Frontend", price: "₦25,000", per: "/ month", desc: "HTML, CSS, React — 2 classes/week (teaching + practical).", feats: ["2 classes/week (teaching + practical)", "Responsive design", "Portfolio projects"], featured: true, msg: "Hi, I'd like to enrol in Frontend Web Design." },
  { name: "Web Design — Backend", price: "₦25,000", per: "/ month", desc: "PHP & MySQL — 2 classes/week (teaching + practical).", feats: ["2 classes/week (teaching + practical)", "MySQL & databases", "Dynamic web apps"], msg: "Hi, I'd like to enrol in Backend Web Design (PHP)." },
  { name: "UI/UX & Video Editing", price: "₦25,000", per: "/ month", desc: "Figma + professional video editing — 2 classes/week (teaching + practical).", feats: ["2 classes/week (teaching + practical)", "Premiere / CapCut", "Client-style projects"], msg: "Hi, I'd like to enrol in UI/UX & Video Editing." },
  { name: "Cyber Security", price: "₦30,000", per: "/ month", desc: "Practical cyber security — 2 classes/week (teaching + practical).", feats: ["2 classes/week (teaching + practical)", "Threat detection basics", "Hands-on labs"], msg: "Hi, I'd like to enrol in Cyber Security." },
  { name: "Data Analysis", price: "₦25,000", per: "/ month", desc: "Advanced Excel & SQL — 2 classes/week (teaching + practical).", feats: ["2 classes/week (teaching + practical)", "SQL basics", "Data storytelling"], msg: "Hi, I'd like to enrol in Data Analysis." },
  { name: "O-Level / JAMB Online", price: "₦12,000", per: "/ month", desc: "WAEC · NECO · GCE · JAMB — online for SS1–SS3.", feats: ["Maths, English, F-Maths, ICT…", "Live online classes", "All exam boards covered"], msg: "Hi, I'm interested in the O-Level/JAMB online classes at Glass Nexus Academy." },
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

      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <div className="pricing-grid pricing-grid-wide">
            {PLANS.map((p) => (
              <div className={`p-card${p.featured ? " featured" : ""}`} key={p.name}>
                {p.featured && <span className="p-badge">Most popular</span>}
                <div className="p-name">{p.name}</div>
                <div className="p-price">{p.price} <span>{p.per}</span></div>
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
