import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useMemo, useState, type FormEvent } from "react";

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

const TARGET_EMAIL = "omolayopaul2003@gmail.com";
const WHATSAPP = "https://wa.me/2349154338312";

const GLANCE = [
  { icon: "ti-calendar-time", num: "12 weeks", dsc: "Duration (renewable)" },
  { icon: "ti-certificate", num: "Unpaid", dsc: "Certificate + Mentorship" },
  { icon: "ti-clock", num: "3 days/week", dsc: "Minimum commitment" },
  { icon: "ti-users", num: "6", dsc: "Roles available" },
];

const ROLES = [
  { name: "Teaching / Facilitator Assistant", desc: "Supports class delivery and helps struggling students keep pace.", icon: "ti-chalkboard", iconBg: "rgba(24,95,165,0.15)", iconColor: "#5BA4F5" },
  { name: "Web / App Development Intern", desc: "Helps build and maintain our marketing site and student LMS.", icon: "ti-code", iconBg: "var(--green-soft)", iconColor: "var(--green)" },
  { name: "Content & Social Media Intern", desc: "Owns our social calendar, captions, and flyers.", icon: "ti-share", iconBg: "rgba(255,140,66,0.15)", iconColor: "#FF8C42" },
  { name: "Data / Admin Intern", desc: "Manages student records, enrolment tracking, and certificates.", icon: "ti-database", iconBg: "rgba(83,74,183,0.15)", iconColor: "#9B8FFF" },
  { name: "Hardware & Repairs Intern", desc: "Handles walk-in repairs and lab equipment maintenance.", icon: "ti-cpu", iconBg: "rgba(186,117,23,0.15)", iconColor: "#F5C542" },
  { name: "Client Support / Freelance Assistant Intern", desc: "Supports client web projects under mentorship.", icon: "ti-headset", iconBg: "rgba(14,165,233,0.15)", iconColor: "#0EA5E9" },
];

const STEPS = [
  "Send us a note stating your preferred role and why it fits you.",
  "Include any coursework, portfolio, or past work — graduates should mention their track.",
  "Shortlisted applicants are invited for a short conversation before placement.",
];

const CHECKLIST = [
  "Full name, phone number, and email address",
  "Preferred role (pick one from the six tracks above)",
  "2–4 sentences on why the role fits you",
  "Portfolio, GitHub, Behance, or coursework link (optional but recommended)",
  "Graduates: mention your Glass Nexus track and completion date",
  "Weekly availability (which 3+ days you can commit)",
];

const PHONE_RE = /^\+?[\d][\d\s\-()]{8,18}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[A-Za-z][A-Za-z\s\-'.]{1,99}$/;

type IErrors = Partial<Record<"name" | "phone" | "email" | "role" | "availability" | "why", string>>;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Internship() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [availability, setAvailability] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState("");
  const [track, setTrack] = useState("");
  const [why, setWhy] = useState("");
  const [errors, setErrors] = useState<IErrors>({});
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const toggleDay = (d: string) => {
    setAvailability((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
    if (errors.availability) setErrors((e) => ({ ...e, availability: undefined }));
  };

  const clearErr = (k: keyof IErrors) => {
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (): IErrors => {
    const e: IErrors = {};
    const tn = name.trim();
    if (!tn) e.name = "Full name is required.";
    else if (!NAME_RE.test(tn)) e.name = "Name should contain only letters, spaces, hyphens or apostrophes.";
    if (!phone.trim()) e.phone = "Phone number is required.";
    else if (!PHONE_RE.test(phone.trim())) e.phone = "Enter a valid phone number (10–15 digits).";
    if (!email.trim()) e.email = "Email address is required.";
    else if (!EMAIL_RE.test(email.trim())) e.email = "Enter a valid email address.";
    if (!role) e.role = "Please pick a preferred role.";
    if (availability.length < 3) e.availability = "Select at least 3 days you can commit.";
    const tw = why.trim();
    if (!tw) e.why = "Tell us briefly why this role fits you.";
    else if (tw.length < 30) e.why = "Please give a bit more detail (at least 30 characters).";
    else if (tw.length > 800) e.why = "Keep it under 800 characters.";
    return e;
  };

  const buildBody = () => [
    "New internship application — Glass Nexus Academy",
    "",
    `Name: ${name.trim()}`,
    `Phone: ${phone.trim()}`,
    `Email: ${email.trim()}`,
    `Preferred role: ${role}`,
    `Availability: ${availability.join(", ")}`,
    `Portfolio / links: ${portfolio.trim() || "—"}`,
    `Graduate track: ${track.trim() || "—"}`,
    "",
    "Why this role fits me:",
    why.trim(),
  ].join("\n");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const found = validate();
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      const map: Record<string, string> = { name: "iName", phone: "iPhone", email: "iEmail", role: "iRole", availability: "iAvail", why: "iWhy" };
      const first = Object.keys(found).find((k) => found[k as keyof IErrors]);
      if (first) document.getElementById(map[first])?.focus();
      return;
    }
    setSending(true);
    const body = buildBody();
    const url = `${WHATSAPP}?text=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener");
    setTimeout(() => { setSending(false); setSubmitted(true); }, 600);
  };

  const sendByEmail = () => {
    const found = validate();
    setErrors(found);
    setTouched(true);
    if (Object.values(found).some(Boolean)) return;
    const subject = `Internship application — ${role} — ${name.trim()}`;
    const url = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody())}`;
    window.location.href = url;
  };

  const reset = () => {
    setName(""); setPhone(""); setEmail(""); setRole(""); setAvailability([]);
    setPortfolio(""); setTrack(""); setWhy(""); setErrors({}); setTouched(false); setSubmitted(false);
  };

  const hasErrors = useMemo(() => Object.values(errors).some(Boolean), [errors]);

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
            <a className="btn-primary" href="#apply">
              <i className="ti ti-file-text" /> Apply below
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
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" style={{ background: "var(--dark)", borderTop: "1px solid var(--border)" }}>
        <div className="s-inner">
          <div className="sec-wrap" style={{ paddingTop: 0 }}>
            <span className="sec-chip">Apply</span>
            <h2 className="sec-title">Applicant form</h2>
            <p className="sec-sub">Fill this out and we'll format your note, track choice, and portfolio the way our team reviews them.</p>
          </div>

          <div className="intern-apply-wrap">
            <aside className="intern-checklist">
              <h3><i className="ti ti-list-check" /> Before you submit</h3>
              <ul>
                {CHECKLIST.map((c) => (
                  <li key={c}><i className="ti ti-check" /><span>{c}</span></li>
                ))}
              </ul>
              <div className="intern-tip">
                <i className="ti ti-bulb" />
                <p>Applications with a portfolio link or completed coursework are shortlisted first. Don't have one? Describe a project you've built or class you've helped with.</p>
              </div>
            </aside>

            <div className="c-form">
              {!submitted ? (
                <form onSubmit={onSubmit} noValidate>
                  <h3 style={{ fontFamily: "var(--font-d)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text)" }}>Submit your application</h3>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: "2rem" }}>Send via WhatsApp for the fastest reply, or email if you prefer.</p>

                  <div className="f-row">
                    <div className="f-group">
                      <label htmlFor="iName">Full Name *</label>
                      <input id="iName" type="text" maxLength={100} value={name}
                        aria-invalid={!!errors.name} className={errors.name ? "em-input-error" : ""}
                        onChange={(e) => { setName(e.target.value); clearErr("name"); }}
                        placeholder="e.g. Adewale Okafor" />
                      {errors.name && <div className="em-error">{errors.name}</div>}
                    </div>
                    <div className="f-group">
                      <label htmlFor="iPhone">Phone Number *</label>
                      <input id="iPhone" type="tel" inputMode="tel" maxLength={20} value={phone}
                        aria-invalid={!!errors.phone} className={errors.phone ? "em-input-error" : ""}
                        onChange={(e) => { setPhone(e.target.value); clearErr("phone"); }}
                        placeholder="e.g. 0812 345 6789" />
                      {errors.phone && <div className="em-error">{errors.phone}</div>}
                    </div>
                  </div>

                  <div className="f-group" style={{ marginTop: 14 }}>
                    <label htmlFor="iEmail">Email Address *</label>
                    <input id="iEmail" type="email" maxLength={255} value={email}
                      aria-invalid={!!errors.email} className={errors.email ? "em-input-error" : ""}
                      onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
                      placeholder="you@example.com" />
                    {errors.email && <div className="em-error">{errors.email}</div>}
                  </div>

                  <div className="f-group" style={{ marginTop: 14 }}>
                    <label htmlFor="iRole">Preferred role *</label>
                    <select id="iRole" value={role}
                      aria-invalid={!!errors.role} className={errors.role ? "em-input-error" : ""}
                      onChange={(e) => { setRole(e.target.value); clearErr("role"); }}>
                      <option value="" disabled>Pick a role...</option>
                      {ROLES.map((r) => <option key={r.name} value={r.name}>{r.name}</option>)}
                    </select>
                    {errors.role && <div className="em-error">{errors.role}</div>}
                  </div>

                  <div className="f-group" style={{ marginTop: 14 }}>
                    <label>Weekly availability * <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(pick at least 3)</span></label>
                    <div id="iAvail" className="em-exam-list" tabIndex={-1}>
                      {DAYS.map((d) => {
                        const on = availability.includes(d);
                        return (
                          <button type="button" key={d}
                            className={`em-chip ${on ? "em-chip-on" : ""}`}
                            aria-pressed={on}
                            onClick={() => toggleDay(d)}>
                            {d}
                          </button>
                        );
                      })}
                    </div>
                    {errors.availability && <div className="em-error">{errors.availability}</div>}
                  </div>

                  <div className="f-row" style={{ marginTop: 14 }}>
                    <div className="f-group">
                      <label htmlFor="iPort">Portfolio / links <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></label>
                      <input id="iPort" type="url" maxLength={300} value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="https://github.com/you or drive link" />
                    </div>
                    <div className="f-group">
                      <label htmlFor="iTrack">Graduate track <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(if any)</span></label>
                      <input id="iTrack" type="text" maxLength={120} value={track}
                        onChange={(e) => setTrack(e.target.value)}
                        placeholder="e.g. Web Dev — Jun 2025" />
                    </div>
                  </div>

                  <div className="f-group" style={{ marginTop: 14, marginBottom: 20 }}>
                    <label htmlFor="iWhy">Why this role fits you *</label>
                    <textarea id="iWhy" maxLength={800} value={why}
                      aria-invalid={!!errors.why} className={errors.why ? "em-input-error" : ""}
                      onChange={(e) => { setWhy(e.target.value); clearErr("why"); }}
                      placeholder="2–4 sentences: skills, past projects, what you want to learn..." />
                    <div className="em-hint" style={{ marginTop: 4, textAlign: "right" }}>{why.length}/800</div>
                    {errors.why && <div className="em-error">{errors.why}</div>}
                  </div>

                  {touched && hasErrors && (
                    <div className="em-error em-error-banner" role="alert" style={{ marginBottom: 14 }}>
                      Please fix the highlighted fields above before submitting.
                    </div>
                  )}

                  <div className="apply-actions" style={{ justifyContent: "flex-start" }}>
                    <button className="f-submit" type="submit" disabled={sending} style={{ maxWidth: 260 }}>
                      <i className="ti ti-brand-whatsapp" /> {sending ? "Opening WhatsApp..." : "Send via WhatsApp"}
                    </button>
                    <button type="button" className="btn-ghost" onClick={sendByEmail}>
                      <i className="ti ti-mail" /> Send via Email
                    </button>
                  </div>
                </form>
              ) : (
                <div className="f-success">
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--green-soft)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green)", fontSize: "2rem", marginBottom: "1.5rem" }}>✓</div>
                  <h3 style={{ fontFamily: "var(--font-d)", fontSize: "1.6rem", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "0.75rem" }}>Application Ready!</h3>
                  <p style={{ fontSize: "0.925rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "1.5rem", textAlign: "center" }}>
                    Your application is queued in WhatsApp — press <strong>Send</strong> there. We'll reach out to shortlisted applicants within a few days.
                  </p>
                  <button onClick={reset} className="f-submit" style={{ maxWidth: 220 }}>Submit another</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
