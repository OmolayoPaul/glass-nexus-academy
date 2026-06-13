import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Glass Nexus Academy" },
      { name: "description", content: "Affordable course enrollment fees and technical bundle plans. FAQs on virtual and physical classes." },
    ],
  }),
  component: Pricing,
});

const FAQS = [
  { q: "How do virtual interactive classes work?", a: "Our virtual sessions are hosted live on Zoom or Google Meet. Students can ask questions in real-time. If you miss a class, recorded backups are uploaded to the student portal within 2 hours." },
  { q: "Can I split payments into convenient installments?", a: "Yes. We offer payment splitting structures (such as 50% initial and 50% midway) via direct bank transfer or Paystack." },
  { q: "Do you offer physical classes or consulting in Ogun State?", a: "Yes. We run physical practical classes at our training center in Ijebu-Ode, Ogun State, equipped with modern computer systems and technical repair benches." },
  { q: "What kind of computer hardware services do you provide?", a: "We refurbish and sell professional laptops and desktops, and provide certified hardware repair (diagnostics, screen swaps, RAM expansions, battery replacements)." },
];

function Pricing() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="hero-bg" />
        <div className="s-inner" style={{ paddingTop: "5rem" }}>
          <span className="eyebrow">Affordable plans</span>
          <h1 className="s-title">Simple & Transparent Pricing</h1>
          <p className="s-sub">Competitive pricing for all our technical course tracks. Pick the plan that matches your training goal.</p>
        </div>
      </section>

      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <div className="pricing-grid">
            <div className="p-card">
              <div className="p-name">Basic</div>
              <div className="p-price">₦20,000 <span>/ course</span></div>
              <p className="p-desc">Perfect for learning one skill at your own pace.</p>
              <div className="p-divider" />
              <div className="p-feats">
                {["1 course track", "Study materials included", "Certificate of completion", "Weekend classes available"].map((f) => (
                  <div className="p-feat" key={f}><i className="ti ti-check" /> {f}</div>
                ))}
              </div>
              <Link to="/contact" className="p-btn out">Enrol now</Link>
            </div>

            <div className="p-card featured">
              <span className="p-badge">Most popular</span>
              <div className="p-name">Standard</div>
              <div className="p-price">₦35,000 <span>/ course</span></div>
              <p className="p-desc">Structured learning with mentorship and project work.</p>
              <div className="p-divider" />
              <div className="p-feats">
                {["1 course track", "Study materials included", "Certificate of completion", "1-on-1 mentorship sessions", "Project-based assessment"].map((f) => (
                  <div className="p-feat" key={f}><i className="ti ti-check" /> {f}</div>
                ))}
              </div>
              <Link to="/contact" className="p-btn">Enrol now</Link>
            </div>

            <div className="p-card">
              <div className="p-name">Premium</div>
              <div className="p-price">₦85,000 <span>/ bundle</span></div>
              <p className="p-desc">Access multiple course tracks and the full academy experience.</p>
              <div className="p-divider" />
              <div className="p-feats">
                {["Up to 3 course tracks", "All materials included", "Certificate of completion", "Priority mentorship", "Job placement support"].map((f) => (
                  <div className="p-feat" key={f}><i className="ti ti-check" /> {f}</div>
                ))}
              </div>
              <Link to="/contact" className="p-btn out">Enrol now</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--dark2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="s-inner">
          <div className="sec-wrap">
            <span className="sec-chip">Got Questions?</span>
            <h2 className="sec-title">Frequently Asked Questions</h2>
            <p className="sec-sub">Find quick answers about our sessions, classes, and computer services</p>
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
