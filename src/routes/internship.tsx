import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/internship")({
  head: () => ({
    meta: [
      { title: "Internship Programme — Glass Nexus Academy" },
      { name: "description", content: "12-week unpaid internship at Glass Nexus Academy. Certificate, mentorship and real hands-on experience in teaching, development, marketing, admin, hardware and client support. Ikorodu, Lagos, Nigeria." },
      { property: "og:title", content: "Internship Programme — Glass Nexus Academy" },
      { property: "og:description", content: "12-week unpaid internship with certificate + mentorship. Teaching, development, marketing, admin, hardware and client support roles." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://glass-nexus-academy.lovable.app/internship" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Internship Programme — Glass Nexus Academy" },
      { name: "twitter:description", content: "12-week unpaid internship with certificate + mentorship." },
    ],
    links: [{ rel: "canonical", href: "https://glass-nexus-academy.lovable.app/internship" }],
  }),
  component: Internship,
});

const GLANCE = [
  { icon: "ti-calendar-time", num: "12 weeks", dsc: "Duration (renewable)" },
  { icon: "ti-certificate", num: "Unpaid", dsc: "Certificate + Mentorship" },
  { icon: "ti-clock", num: "3 days/week", dsc: "Minimum commitment" },
  { icon: "ti-users", num: "6", dsc: "Roles available" },
];

const ROLES = [
  {
    name: "Teaching / Facilitator Assistant",
    desc: "Supports class delivery and helps struggling students keep pace.",
    icon: "ti-chalkboard",
    iconBg: "rgba(24,95,165,0.15)",
    iconColor: "#5BA4F5",
  },
  {
    name: "Web / App Development Intern",
    desc: "Helps build and maintain our marketing site and student LMS.",
    icon: "ti-code",
    iconBg: "var(--green-soft)",
    iconColor: "var(--green)",
  },
  {
    name: "Content & Social Media Intern",
    desc: "Owns our social calendar, captions, and flyers.",
    icon: "ti-share",
    iconBg: "rgba(255,140,66,0.15)",
    iconColor: "#FF8C42",
  },
  {
    name: "Data / Admin Intern",
    desc: "Manages student records, enrolment tracking, and certificates.",
    icon: "ti-database",
    iconBg: "rgba(83,74,183,0.15)",
    iconColor: "#9B8FFF",
  },
  {
    name: "Hardware & Repairs Intern",
    desc: "Handles walk-in repairs and lab equipment maintenance.",
    icon: "ti-cpu",
    iconBg: "rgba(186,117,23,0.15)",
    iconColor: "#F5C542",
  },
  {
    name: "Client Support / Freelance Assistant Intern",
    desc: "Supports client web projects under mentorship.",
    icon: "ti-headset",
    iconBg: "rgba(14,165,233,0.15)",
    iconColor: "#0EA5E9",
  },
];

const STEPS = [
  "Send us a note stating your preferred role and why it fits you.",
  "Include any coursework, portfolio, or past work — graduates should mention their track.",
  "Shortlisted applicants are invited for a short conversation before placement.",
];

function Internship() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="page-hero">
        <div className="hero-bg" />
        <div className="s-inner" style={{ paddingTop: "5rem" }}>
          <span className="eyebrow">Career Starter</span>
          <h1 className="s-title">Internship Programme</h1>
          <p className="s-sub">Unpaid · Certificate + Mentorship · 12 Weeks</p>
          <p className="s-sub" style={{ marginTop: "1.25rem" }}>
            Get real hands-on experience across teaching, development, marketing, admin, hardware, and client work — with structured mentorship and a certificate of completion at the end of the term.
          </p>
          <div className="hero-btns" style={{ marginTop: "2rem" }}>
            <a className="btn-primary" href="https://wa.me/2349154338312" target="_blank" rel="noopener">
              <i className="ti ti-brand-whatsapp" /> Apply Now
            </a>
            <Link className="btn-ghost" to="/contact">
              <i className="ti ti-message-circle" /> Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMME AT A GLANCE */}
      <section style={{ background: "var(--dark2)", padding: "4rem 5%" }}>
        <div className="s-inner">
          <div className="sec-wrap" style={{ paddingTop: 0 }}>
            <span className="sec-chip">Programme at a Glance</span>
            <h2 className="sec-title">What to expect</h2>
          </div>
          <div className="stats-row" style={{ borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--border)" }}>
            {GLANCE.map((g) => (
              <div className="stat" key={g.dsc}>
                <i className={`ti ${g.icon}`} style={{ fontSize: "1.6rem", color: "var(--green)", display: "block", marginBottom: "0.5rem" }} />
                <span className="num">{g.num}</span>
                <div className="dsc">{g.dsc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVAILABLE ROLES */}
      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <div className="sec-wrap" style={{ paddingTop: 0 }}>
            <span className="sec-chip">Available Roles</span>
            <h2 className="sec-title">Pick where you fit</h2>
            <p className="sec-sub">Six tracks. Real tasks. Direct mentorship from day one.</p>
          </div>
          <div className="courses-grid">
            {ROLES.map((r) => (
              <div className="course-card" key={r.name}>
                <div className="course-header">
                  <div className="course-icon" style={{ background: r.iconBg, color: r.iconColor }}>
                    <i className={`ti ${r.icon}`} />
                  </div>
                  <h3 className="course-name">{r.name}</h3>
                  <p className="course-desc">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section style={{ background: "var(--dark2)", borderTop: "1px solid var(--border)" }}>
        <div className="s-inner">
          <div className="sec-wrap" style={{ paddingTop: 0 }}>
            <span className="sec-chip">How to Apply</span>
            <h2 className="sec-title">Three simple steps</h2>
          </div>
          <div className="steps-list">
            {STEPS.map((s, i) => (
              <div className="step-item" key={i}>
                <div className="step-number">{i + 1}</div>
                <p className="step-text">{s}</p>
              </div>
            ))}
          </div>
          <div className="apply-actions">
            <a className="btn-glow" href="https://wa.me/2349154338312" target="_blank" rel="noopener">
              <i className="ti ti-brand-whatsapp" /> Apply via WhatsApp
            </a>
            <Link className="btn-ghost" to="/contact" style={{ padding: "16px 40px", fontSize: "16px" }}>
              Apply via Contact Form
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
