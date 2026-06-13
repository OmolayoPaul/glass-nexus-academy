import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Glass Nexus Academy" },
      { name: "description", content: "Explore technical course tracks in Python, Web Development, Data Analysis, Hardware Repair, Microsoft Office, AI Automation, and Cybersecurity." },
    ],
  }),
  component: Courses,
});

type Course = {
  name: string; desc: string; icon: string; iconBg: string; iconColor: string;
  features: string[]; price?: string;
};

const PROG: Course[] = [
  { name: "Python Programming", desc: "From basic syntax to OOP. Build backend scripts, automate tasks, and lay foundations for data engineering.", icon: "ti-brand-python", iconBg: "rgba(24,95,165,0.15)", iconColor: "#5BA4F5", features: ["12-week intensive track", "Beginner-friendly modules", "Certificate of completion"] },
  { name: "Web Development", desc: "Learn HTML5, CSS3, and JavaScript to build modern responsive websites. Create client portfolios and master hosting pipelines.", icon: "ti-world", iconBg: "var(--green-soft)", iconColor: "var(--green)", features: ["Real-world responsive designs", "Interactive JS assignments", "Web hosting & domains setup"] },
  { name: "Data Analysis", desc: "Learn to clean, analyze, and visualize data using Advanced Excel and Basic SQL. Highly valued by businesses.", icon: "ti-chart-bar", iconBg: "rgba(83,74,183,0.15)", iconColor: "#9B8FFF", features: ["Excel tables & advanced formulas", "SQL database query basics", "Data storytelling reports"] },
];

const TECH: Course[] = [
  { name: "Hardware & Repairs", desc: "Practical diagnostics, maintenance, and repair training for desktop computers, laptops, and mobile smartphones.", icon: "ti-cpu", iconBg: "rgba(186,117,23,0.15)", iconColor: "#F5C542", features: ["100% practical lab workouts", "Learn tool safety & testing", "Troubleshooting & part swaps"] },
  { name: "Microsoft Office", desc: "Office operations mastery. Learn Word document styling, Excel worksheets, PowerPoint templates, and Outlook emails.", icon: "ti-file-text", iconBg: "rgba(153,53,86,0.15)", iconColor: "#FF7FA6", features: ["Formatting & writing templates", "Calculations & spreadsheet tables", "Professional presentation slides"] },
  { name: "AI & Automation", desc: "Learn to automate repetitive office tasks using ChatGPT prompts, build custom templates, and write simple automation scripts.", icon: "ti-brain", iconBg: "rgba(14,165,233,0.08)", iconColor: "var(--green)", features: ["Prompt engineering secrets", "AI tools integration audits", "Task auto-routines scripting"] },
];

const SEC: Course[] = [
  { name: "Cybersecurity Basics", desc: "Learn network security, online threat prevention, malware protection, encryption keys, and safety habits for modern workplaces.", icon: "ti-shield-lock", iconBg: "rgba(163,45,45,0.15)", iconColor: "#FF7070", features: ["Passwords & identity safety", "Network threat audits", "Systems protection basics"] },
];

function CourseCard({ c }: { c: Course }) {
  return (
    <div className="course-card">
      <div className="course-header">
        <div className="course-icon" style={{ background: c.iconBg, color: c.iconColor }}>
          <i className={`ti ${c.icon}`} />
        </div>
        <h3 className="course-name">{c.name}</h3>
        <p className="course-desc">{c.desc}</p>
        <ul className="course-features">
          {c.features.map((f) => (
            <li className="course-feat-item" key={f}>
              <span className="course-feat-check">✓</span> {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="course-footer">
        <span className="course-price">₦25,000 / course</span>
        <Link to="/contact" className="course-action">Enrol now →</Link>
      </div>
    </div>
  );
}

function Courses() {
  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="hero-bg" />
        <div className="s-inner" style={{ paddingTop: "5rem" }}>
          <span className="eyebrow">Expand your skillset</span>
          <h1 className="s-title">Explore Our Course Tracks</h1>
          <p className="s-sub">We offer highly practical, project-based classes designed to teach you skills that are in high demand in Nigeria and globally.</p>
        </div>
      </section>

      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <h2 className="courses-category-title">Programming & Analytics Pathways</h2>
          <div className="courses-grid">{PROG.map((c) => <CourseCard c={c} key={c.name} />)}</div>

          <h2 className="courses-category-title" style={{ marginTop: "3rem" }}>Technical Skills & Digital Literacy</h2>
          <div className="courses-grid">{TECH.map((c) => <CourseCard c={c} key={c.name} />)}</div>

          <h2 className="courses-category-title" style={{ marginTop: "3rem" }}>Security & Specialized Tracks</h2>
          <div className="courses-grid">{SEC.map((c) => <CourseCard c={c} key={c.name} />)}</div>
        </div>
      </section>

      <div className="cta-banner">
        <h2>Confused about the right track?</h2>
        <p>Talk to our advisors. We'll help match your career goals to the ideal track.</p>
        <Link className="btn-glow" to="/contact">Talk to an Advisor</Link>
      </div>
    </SiteLayout>
  );
}
