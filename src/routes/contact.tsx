import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Glass Nexus Academy" },
      { name: "description", content: "Get in touch with our learning advisers. Submit inquiries, find our office, or chat via WhatsApp." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="hero-bg" />
        <div className="s-inner" style={{ paddingTop: "5rem" }}>
          <span className="eyebrow">Connect with our team</span>
          <h1 className="s-title">Get in Touch</h1>
          <p className="s-sub">Have questions about admissions, schedules, or corporate bundles? Speak to us today.</p>
        </div>
      </section>

      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <div className="contact-wrap">
            <div className="c-info">
              <h3>Reach us directly</h3>
              <p>We're available to answer your questions about enrolment, schedules, and course content.</p>

              {[
                { icon: "ti-map-pin", lbl: "Address", val: <>Ijebu-Ode, Ogun State, Nigeria</> },
                { icon: "ti-brand-whatsapp", lbl: "WhatsApp", val: <a href="https://wa.me/2349154338312" target="_blank" rel="noopener">09154338312</a> },
                { icon: "ti-mail", lbl: "Email", val: <a href="mailto:info@glassnexusacademy.com">info@glassnexusacademy.com</a> },
                { icon: "ti-clock", lbl: "Office hours", val: <>Mon – Sat, 8am – 5pm</> },
              ].map((item) => (
                <div className="c-item" key={item.lbl}>
                  <div className="c-item-icon"><i className={`ti ${item.icon}`} /></div>
                  <div>
                    <div className="c-lbl">{item.lbl}</div>
                    <div className="c-val">{item.val}</div>
                  </div>
                </div>
              ))}

              <div className="contact-map-mock">
                <div className="map-glow" />
                <div className="map-pin">📍</div>
                <span className="map-text">Ijebu-Ode, Ogun State</span>
              </div>
            </div>

            <div className="c-form">
              {!submitted ? (
                <form onSubmit={onSubmit}>
                  <h3 style={{ fontFamily: "var(--font-d)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text)" }}>Send Us a Message</h3>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: "2rem" }}>Fill out the fields below and our admissions team will contact you within 2 hours.</p>

                  <div className="f-row">
                    <div className="f-group">
                      <label htmlFor="contactName">Full Name *</label>
                      <input id="contactName" type="text" required placeholder="e.g. Adewale Okafor" />
                    </div>
                    <div className="f-group">
                      <label htmlFor="contactPhone">Phone Number *</label>
                      <input id="contactPhone" type="tel" required placeholder="e.g. 0812 345 6789" />
                    </div>
                  </div>

                  <div className="f-group" style={{ marginTop: 14 }}>
                    <label htmlFor="contactEmail">Email Address *</label>
                    <input id="contactEmail" type="email" required placeholder="you@example.com" />
                  </div>

                  <div className="f-group" style={{ marginTop: 14 }}>
                    <label htmlFor="contactSubject">Course of interest *</label>
                    <select id="contactSubject" required defaultValue="">
                      <option value="" disabled>Select a course...</option>
                      <option value="python">Python Programming</option>
                      <option value="webdev">Web Development</option>
                      <option value="data">Data Analysis</option>
                      <option value="hardware">Hardware & Repairs</option>
                      <option value="office">Microsoft Office</option>
                      <option value="ai">AI & Automation</option>
                      <option value="cyber">Cybersecurity Basics</option>
                    </select>
                  </div>

                  <div className="f-group" style={{ marginTop: 14, marginBottom: 20 }}>
                    <label htmlFor="contactMsg">Message *</label>
                    <textarea id="contactMsg" required placeholder="Tell us what you'd like to know..." />
                  </div>

                  <button className="f-submit" type="submit" disabled={sending}>
                    {sending ? "Sending message..." : "Send message →"}
                  </button>
                </form>
              ) : (
                <div className="f-success">
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--green-soft)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green)", fontSize: "2rem", marginBottom: "1.5rem" }}>✓</div>
                  <h3 style={{ fontFamily: "var(--font-d)", fontSize: "1.6rem", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "0.75rem" }}>Message Received!</h3>
                  <p style={{ fontSize: "0.925rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "1.5rem", textAlign: "center" }}>
                    Thank you for contacting Glass Nexus Academy. Our support team will reach out via WhatsApp or Email within 2 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="f-submit" style={{ maxWidth: 180 }}>Send Another</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
