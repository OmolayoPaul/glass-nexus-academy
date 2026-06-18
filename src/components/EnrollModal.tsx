import { useEffect, useMemo, useState, type FormEvent } from "react";

const TARGET_EMAIL = "omolayopaul2003@gmail.com";
const WHATSAPP = "https://wa.me/2349154338312";

export type EnrollMode = "course" | "olevel";

type Props = {
  open: boolean;
  onClose: () => void;
  mode: EnrollMode;
  courseName?: string;
};

const EXAMS = ["WAEC", "NECO", "GCE", "JAMB (UTME)", "Post-UTME"];

type Errors = Partial<Record<
  "name" | "phone" | "email" | "level" | "exams" | "startDate" | "notes",
  string
>>;

// Accepts: 10-15 digits with optional leading + and spaces/dashes/parentheses
const PHONE_RE = /^\+?[\d][\d\s\-()]{8,18}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[A-Za-z][A-Za-z\s\-'.]{1,99}$/;

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0];
}

export function EnrollModal({ open, onClose, mode, courseName }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [level, setLevel] = useState("");
  const [exams, setExams] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);

  const minDate = useMemo(todayISO, []);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setName(""); setPhone(""); setEmail("");
      setStartDate(""); setLevel(""); setExams([]); setNotes("");
      setErrors({}); setTouched(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const validate = (): Errors => {
    const e: Errors = {};
    const trimmedName = name.trim();
    if (!trimmedName) e.name = "Full name is required.";
    else if (trimmedName.length < 2) e.name = "Name must be at least 2 characters.";
    else if (!NAME_RE.test(trimmedName)) e.name = "Name should contain only letters, spaces, hyphens or apostrophes.";

    const cleanedPhone = phone.replace(/[\s\-()]/g, "");
    if (!phone.trim()) e.phone = "Phone number is required.";
    else if (!PHONE_RE.test(phone.trim())) e.phone = "Enter a valid phone number (10–15 digits).";
    else if (cleanedPhone.replace(/^\+/, "").length < 10) e.phone = "Phone number is too short.";

    if (email.trim() && !EMAIL_RE.test(email.trim())) e.email = "Enter a valid email address.";

    if (!startDate) e.startDate = "Please pick a start date.";
    else if (startDate < minDate) e.startDate = "Start date can't be in the past.";

    if (notes.length > 500) e.notes = "Notes must be 500 characters or fewer.";

    if (mode === "olevel") {
      if (!level) e.level = "Please select your current class level.";
      if (exams.length === 0) e.exams = "Pick at least one exam you're preparing for.";
    }

    return e;
  };

  const toggleExam = (ex: string) => {
    setExams((prev) => {
      const next = prev.includes(ex) ? prev.filter((x) => x !== ex) : [...prev, ex];
      if (touched) setErrors((er) => ({ ...er, exams: next.length === 0 ? "Pick at least one exam you're preparing for." : undefined }));
      return next;
    });
  };

  const clearErr = (k: keyof Errors) => {
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const buildBody = () => {
    if (mode === "course") {
      return [
        `New course enrolment request — Glass Nexus Academy`,
        ``,
        `Course: ${courseName ?? "(unspecified)"}`,
        `Full name: ${name.trim()}`,
        `Phone / WhatsApp: ${phone.trim()}`,
        `Email: ${email.trim() || "(not provided)"}`,
        `Preferred start date: ${startDate || "(not specified)"}`,
        `Additional notes: ${notes.trim() || "(none)"}`,
      ].join("\n");
    }
    return [
      `New O-Level / JAMB enrolment request — Glass Nexus Academy`,
      ``,
      `Full name: ${name.trim()}`,
      `Phone / WhatsApp: ${phone.trim()}`,
      `Email: ${email.trim() || "(not provided)"}`,
      `Class level: ${level || "(not specified)"}`,
      `Exams preparing for: ${exams.length ? exams.join(", ") : "(none selected)"}`,
      `Preferred start date: ${startDate || "(not specified)"}`,
      `Additional notes: ${notes.trim() || "(none)"}`,
    ].join("\n");
  };

  const subject = mode === "course"
    ? `Enrolment Request: ${courseName ?? "Course"}`
    : `O-Level / JAMB Online Enrolment Request`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const found = validate();
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      // focus first invalid field
      const first = Object.keys(found).find((k) => found[k as keyof Errors]);
      if (first) {
        const el = document.getElementById(`em-${first === "startDate" ? "start" : first}`);
        el?.focus();
      }
      return;
    }
    const body = buildBody();
    const mailto = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  const waFallback = () => {
    const body = buildBody();
    window.open(`${WHATSAPP}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div className="em-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="em-panel" onClick={(ev) => ev.stopPropagation()}>
        <button className="em-close" aria-label="Close" onClick={onClose}>✕</button>

        {!submitted ? (
          <>
            <div className="em-header">
              <span className="em-chip">{mode === "course" ? "Course Enrolment" : "O-Level / JAMB Enrolment"}</span>
              <h3 className="em-title">
                {mode === "course"
                  ? `Enrol in ${courseName ?? "this course"}`
                  : "Enrol in O-Level / JAMB Online Classes"}
              </h3>
              <p className="em-sub">
                Share a few details and our admissions team will reach out within 2 hours to finalise your enrolment.
              </p>
            </div>

            <form onSubmit={onSubmit} className="em-form" noValidate>
              {mode === "course" && (
                <div className="em-field">
                  <label>Selected course</label>
                  <input type="text" value={courseName ?? ""} readOnly className="em-readonly" />
                </div>
              )}

              <div className="em-row">
                <div className="em-field">
                  <label htmlFor="em-name">Full name *</label>
                  <input
                    id="em-name"
                    type="text"
                    maxLength={100}
                    value={name}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "em-name-err" : undefined}
                    className={errors.name ? "em-input-error" : ""}
                    onChange={(ev) => { setName(ev.target.value); clearErr("name"); }}
                    placeholder="e.g. Adewale Okafor"
                  />
                  {errors.name && <div id="em-name-err" className="em-error">{errors.name}</div>}
                </div>
                <div className="em-field">
                  <label htmlFor="em-phone">Phone / WhatsApp *</label>
                  <input
                    id="em-phone"
                    type="tel"
                    inputMode="tel"
                    maxLength={20}
                    value={phone}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "em-phone-err" : undefined}
                    className={errors.phone ? "em-input-error" : ""}
                    onChange={(ev) => { setPhone(ev.target.value); clearErr("phone"); }}
                    placeholder="e.g. 0812 345 6789"
                  />
                  {errors.phone && <div id="em-phone-err" className="em-error">{errors.phone}</div>}
                </div>
              </div>

              <div className="em-field">
                <label htmlFor="em-email">Email address (optional)</label>
                <input
                  id="em-email"
                  type="email"
                  maxLength={255}
                  value={email}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "em-email-err" : undefined}
                  className={errors.email ? "em-input-error" : ""}
                  onChange={(ev) => { setEmail(ev.target.value); clearErr("email"); }}
                  placeholder="you@example.com"
                />
                {errors.email && <div id="em-email-err" className="em-error">{errors.email}</div>}
              </div>

              {mode === "olevel" && (
                <>
                  <div className="em-field">
                    <label htmlFor="em-level">Current class level *</label>
                    <select
                      id="em-level"
                      value={level}
                      aria-invalid={!!errors.level}
                      aria-describedby={errors.level ? "em-level-err" : undefined}
                      className={errors.level ? "em-input-error" : ""}
                      onChange={(ev) => { setLevel(ev.target.value); clearErr("level"); }}
                    >
                      <option value="" disabled>Select your class…</option>
                      <option value="SS1">SS1</option>
                      <option value="SS2">SS2</option>
                      <option value="SS3">SS3</option>
                      <option value="Graduate / Re-sit">Graduate / Re-sit candidate</option>
                    </select>
                    {errors.level && <div id="em-level-err" className="em-error">{errors.level}</div>}
                  </div>

                  <div className="em-field">
                    <label>Which exam(s) are you preparing for? * <span className="em-hint">(select all that apply)</span></label>
                    <div className="em-chip-group">
                      {EXAMS.map((ex) => {
                        const active = exams.includes(ex);
                        return (
                          <button
                            type="button"
                            key={ex}
                            className={`em-chip-btn${active ? " active" : ""}`}
                            onClick={() => toggleExam(ex)}
                            aria-pressed={active}
                          >
                            {active ? "✓ " : ""}{ex}
                          </button>
                        );
                      })}
                    </div>
                    {errors.exams
                      ? <div className="em-error" style={{ marginTop: 6 }}>{errors.exams}</div>
                      : <div className="em-hint" style={{ marginTop: 6 }}>Tap one or more exams.</div>}
                  </div>
                </>
              )}

              <div className="em-field">
                <label htmlFor="em-start">When would you like to begin? *</label>
                <input
                  id="em-start"
                  type="date"
                  value={startDate}
                  min={minDate}
                  aria-invalid={!!errors.startDate}
                  aria-describedby={errors.startDate ? "em-start-err" : undefined}
                  className={errors.startDate ? "em-input-error" : ""}
                  onChange={(ev) => { setStartDate(ev.target.value); clearErr("startDate"); }}
                />
                {errors.startDate && <div id="em-start-err" className="em-error">{errors.startDate}</div>}
              </div>

              <div className="em-field">
                <label htmlFor="em-notes">Anything else we should know? (optional)</label>
                <textarea
                  id="em-notes"
                  maxLength={500}
                  rows={3}
                  value={notes}
                  aria-invalid={!!errors.notes}
                  className={errors.notes ? "em-input-error" : ""}
                  onChange={(ev) => { setNotes(ev.target.value); clearErr("notes"); }}
                  placeholder="Goals, schedule preference, etc."
                />
                <div className="em-hint" style={{ marginTop: 4, textAlign: "right" }}>{notes.length}/500</div>
                {errors.notes && <div className="em-error">{errors.notes}</div>}
              </div>

              {touched && hasErrors && (
                <div className="em-error em-error-banner" role="alert">
                  Please fix the highlighted fields above before submitting.
                </div>
              )}

              <div className="em-actions">
                <button type="submit" className="em-submit">
                  Submit enrolment →
                </button>
                <button type="button" className="em-alt" onClick={waFallback}>
                  <i className="ti ti-brand-whatsapp" /> Send via WhatsApp instead
                </button>
              </div>

              <p className="em-foot">Your details go straight to our admissions inbox. We typically respond within 2 hours.</p>
            </form>
          </>
        ) : (
          <div className="em-success">
            <div className="em-check">✓</div>
            <h3 className="em-title">Request prepared!</h3>
            <p className="em-sub">
              Your email client should have opened with your enrolment details addressed to our admissions team.
              If nothing opened, you can send the same details to us on WhatsApp instead.
            </p>
            <div className="em-actions" style={{ marginTop: "1.5rem" }}>
              <button type="button" className="em-submit" onClick={waFallback}>
                <i className="ti ti-brand-whatsapp" /> Send on WhatsApp
              </button>
              <button type="button" className="em-alt" onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
