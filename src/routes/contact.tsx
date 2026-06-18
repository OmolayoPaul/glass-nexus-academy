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

type CErrors = Partial<Record<"name" | "phone" | "email" | "subject" | "message", string>>;

const PHONE_RE = /^\+?[\d][\d\s\-()]{8,18}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[A-Za-z][A-Za-z\s\-'.]{1,99}$/;

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<CErrors>({});
  const [touched, setTouched] = useState(false);

  const validate = (): CErrors => {
    const e: CErrors = {};
    const tn = name.trim();
    if (!tn) e.name = "Full name is required.";
    else if (tn.length < 2) e.name = "Name must be at least 2 characters.";
    else if (!NAME_RE.test(tn)) e.name = "Name should contain only letters, spaces, hyphens or apostrophes.";

    if (!phone.trim()) e.phone = "Phone number is required.";
    else if (!PHONE_RE.test(phone.trim())) e.phone = "Enter a valid phone number (10–15 digits).";

    if (!email.trim()) e.email = "Email address is required.";
    else if (!EMAIL_RE.test(email.trim())) e.email = "Enter a valid email address.";

    if (!subject) e.subject = "Please select a course of interest.";

    const tm = message.trim();
    if (!tm) e.message = "Please enter a message.";
    else if (tm.length < 10) e.message = "Message should be at least 10 characters.";
    else if (tm.length > 1000) e.message = "Message must be 1000 characters or fewer.";

    return e;
  };

  const clearErr = (k: keyof CErrors) => {
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const found = validate();
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      const first = Object.keys(found).find((k) => found[k as keyof CErrors]);
      if (first) {
        const map: Record<string, string> = { name: "contactName", phone: "contactPhone", email: "contactEmail", subject: "contactSubject", message: "contactMsg" };
        document.getElementById(map[first])?.focus();
      }
      return;
    }
    setSending(true);

    const body = [
      `New enquiry from Glass Nexus Academy website`,
      ``,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Email: ${email.trim()}`,
      `Course of interest: ${subject}`,
      ``,
      `Message:`,
      message.trim(),
    ].join("\n");

    const url = `https://wa.me/2349154338312?text=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener");

    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 600);
  };

  const resetForm = () => {
    setSubmitted(false);
    setName(""); setPhone(""); setEmail(""); setSubject(""); setMessage("");
    setErrors({}); setTouched(false);
  };

  const hasErrors = Object.values(errors).some(Boolean);

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
                { icon: "ti-map-pin", lbl: "Address", val: <>Ikorodu, Lagos, Nigeria</> },
                { icon: "ti-brand-whatsapp", lbl: "WhatsApp", val: <><a href="https://wa.me/2349154338312" target="_blank" rel="noopener">09154338312</a>{" · "}<a href="https://wa.me/2348102434954" target="_blank" rel="noopener">08102434954</a></> },
                { icon: "ti-mail", lbl: "Email", val: <a href="mailto:glassnexusacademy@gmail.com">glassnexusacademy@gmail.com</a> },
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
                <span className="map-text">Ikorodu, Lagos</span>
              </div>
            </div>

            <div className="c-form">
              {!submitted ? (
                <form onSubmit={onSubmit} noValidate>
                  <h3 style={{ fontFamily: "var(--font-d)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text)" }}>Send Us a Message</h3>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: "2rem" }}>Fill out the fields below and our admissions team will contact you within 2 hours.</p>

                  <div className="f-row">
                    <div className="f-group">
                      <label htmlFor="contactName">Full Name *</label>
                      <input
                        id="contactName" name="contactName" type="text" maxLength={100}
                        value={name}
                        aria-invalid={!!errors.name}
                        className={errors.name ? "em-input-error" : ""}
                        onChange={(e) => { setName(e.target.value); clearErr("name"); }}
                        placeholder="e.g. Adewale Okafor"
                      />
                      {errors.name && <div className="em-error">{errors.name}</div>}
                    </div>
                    <div className="f-group">
                      <label htmlFor="contactPhone">Phone Number *</label>
                      <input
                        id="contactPhone" name="contactPhone" type="tel" inputMode="tel" maxLength={20}
                        value={phone}
                        aria-invalid={!!errors.phone}
                        className={errors.phone ? "em-input-error" : ""}
                        onChange={(e) => { setPhone(e.target.value); clearErr("phone"); }}
                        placeholder="e.g. 0812 345 6789"
                      />
                      {errors.phone && <div className="em-error">{errors.phone}</div>}
                    </div>
                  </div>

                  <div className="f-group" style={{ marginTop: 14 }}>
                    <label htmlFor="contactEmail">Email Address *</label>
                    <input
                      id="contactEmail" name="contactEmail" type="email" maxLength={255}
                      value={email}
                      aria-invalid={!!errors.email}
                      className={errors.email ? "em-input-error" : ""}
                      onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
                      placeholder="you@example.com"
                    />
                    {errors.email && <div className="em-error">{errors.email}</div>}
                  </div>

                  <div className="f-group" style={{ marginTop: 14 }}>
                    <label htmlFor="contactSubject">Course of interest *</label>
                    <select
                      id="contactSubject" name="contactSubject"
                      value={subject}
                      aria-invalid={!!errors.subject}
                      className={errors.subject ? "em-input-error" : ""}
                      onChange={(e) => { setSubject(e.target.value); clearErr("subject"); }}
                    >
                      <option value="" disabled>Select a course...</option>
                      <option value="Python Programming">Python Programming</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Data Analysis">Data Analysis</option>
                      <option value="Hardware & Repairs">Hardware & Repairs</option>
                      <option value="Computer Operations (Microsoft Packages)">Computer Operations (Microsoft Packages)</option>
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="Cybersecurity Basics">Cybersecurity Basics</option>
                      <option value="O-Level / JAMB Online">O-Level / JAMB Online</option>
                    </select>
                    {errors.subject && <div className="em-error">{errors.subject}</div>}
                  </div>

                  <div className="f-group" style={{ marginTop: 14, marginBottom: 20 }}>
                    <label htmlFor="contactMsg">Message *</label>
                    <textarea
                      id="contactMsg" name="contactMsg" maxLength={1000}
                      value={message}
                      aria-invalid={!!errors.message}
                      className={errors.message ? "em-input-error" : ""}
                      onChange={(e) => { setMessage(e.target.value); clearErr("message"); }}
                      placeholder="Tell us what you'd like to know..."
                    />
                    <div className="em-hint" style={{ marginTop: 4, textAlign: "right" }}>{message.length}/1000</div>
                    {errors.message && <div className="em-error">{errors.message}</div>}
                  </div>

                  {touched && hasErrors && (
                    <div className="em-error em-error-banner" role="alert" style={{ marginBottom: 14 }}>
                      Please fix the highlighted fields above before submitting.
                    </div>
                  )}

                  <button className="f-submit" type="submit" disabled={sending}>
                    {sending ? "Opening WhatsApp..." : "Send message →"}
                  </button>
                </form>
              ) : (
                <div className="f-success">
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--green-soft)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green)", fontSize: "2rem", marginBottom: "1.5rem" }}>✓</div>
                  <h3 style={{ fontFamily: "var(--font-d)", fontSize: "1.6rem", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "0.75rem" }}>Message Ready!</h3>
                  <p style={{ fontSize: "0.925rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "1.5rem", textAlign: "center" }}>
                    Your message has been opened in WhatsApp — just press <strong>Send</strong> there and our team will reply within 2 hours.
                  </p>
                  <button onClick={resetForm} className="f-submit" style={{ maxWidth: 180 }}>Send Another</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
