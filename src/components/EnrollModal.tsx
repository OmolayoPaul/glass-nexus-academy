import { useEffect, useState, type FormEvent } from "react";

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

export function EnrollModal({ open, onClose, mode, courseName }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [level, setLevel] = useState("");
  const [exams, setExams] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setName(""); setPhone(""); setEmail("");
      setStartDate(""); setLevel(""); setExams([]); setNotes("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const toggleExam = (ex: string) => {
    setExams((prev) => prev.includes(ex) ? prev.filter((x) => x !== ex) : [...prev, ex]);
  };

  const buildBody = () => {
    if (mode === "course") {
      return [
        `New course enrolment request — Glass Nexus Academy`,
        ``,
        `Course: ${courseName ?? "(unspecified)"}`,
        `Full name: ${name}`,
        `Phone / WhatsApp: ${phone}`,
        `Email: ${email || "(not provided)"}`,
        `Preferred start date: ${startDate || "(not specified)"}`,
        `Additional notes: ${notes || "(none)"}`,
      ].join("\n");
    }
    return [
      `New O-Level / JAMB enrolment request — Glass Nexus Academy`,
      ``,
      `Full name: ${name}`,
      `Phone / WhatsApp: ${phone}`,
      `Email: ${email || "(not provided)"}`,
      `Class level: ${level || "(not specified)"}`,
      `Exams preparing for: ${exams.length ? exams.join(", ") : "(none selected)"}`,
      `Preferred start date: ${startDate || "(not specified)"}`,
      `Additional notes: ${notes || "(none)"}`,
    ].join("\n");
  };

  const subject = mode === "course"
    ? `Enrolment Request: ${courseName ?? "Course"}`
    : `O-Level / JAMB Online Enrolment Request`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = buildBody();
    const mailto = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  const waFallback = () => {
    const body = buildBody();
    window.open(`${WHATSAPP}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
  };

  return (
    <div className="em-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="em-panel" onClick={(e) => e.stopPropagation()}>
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

            <form onSubmit={onSubmit} className="em-form">
              {mode === "course" && (
                <div className="em-field">
                  <label>Selected course</label>
                  <input type="text" value={courseName ?? ""} readOnly className="em-readonly" />
                </div>
              )}

              <div className="em-row">
                <div className="em-field">
                  <label htmlFor="em-name">Full name *</label>
                  <input id="em-name" type="text" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Adewale Okafor" />
                </div>
                <div className="em-field">
                  <label htmlFor="em-phone">Phone / WhatsApp *</label>
                  <input id="em-phone" type="tel" required maxLength={20} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 0812 345 6789" />
                </div>
              </div>

              <div className="em-field">
                <label htmlFor="em-email">Email address (optional)</label>
                <input id="em-email" type="email" maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>

              {mode === "olevel" && (
                <>
                  <div className="em-field">
                    <label htmlFor="em-level">Current class level *</label>
                    <select id="em-level" required value={level} onChange={(e) => setLevel(e.target.value)}>
                      <option value="" disabled>Select your class…</option>
                      <option value="SS1">SS1</option>
                      <option value="SS2">SS2</option>
                      <option value="SS3">SS3</option>
                      <option value="Graduate / Re-sit">Graduate / Re-sit candidate</option>
                    </select>
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
                    {exams.length === 0 && <div className="em-hint" style={{ marginTop: 6 }}>Pick at least one exam.</div>}
                  </div>
                </>
              )}

              <div className="em-field">
                <label htmlFor="em-start">When would you like to begin? *</label>
                <input
                  id="em-start"
                  type="date"
                  required
                  value={startDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="em-field">
                <label htmlFor="em-notes">Anything else we should know? (optional)</label>
                <textarea id="em-notes" maxLength={500} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Goals, schedule preference, etc." />
              </div>

              <div className="em-actions">
                <button
                  type="submit"
                  className="em-submit"
                  disabled={mode === "olevel" && exams.length === 0}
                >
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
