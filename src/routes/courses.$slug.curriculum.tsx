import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { EnrollModal } from "@/components/EnrollModal";
import { getCourse, type CourseDetail } from "@/lib/courseData";
import { CourseTutor } from "@/components/CourseTutor";

export const Route = createFileRoute("/courses/$slug/curriculum")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Curriculum not found — Glass Nexus Academy" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const c = loaderData.course;
    const title = `${c.name} — Curriculum, Projects & Certification | Glass Nexus Academy`;
    const desc = `Weekly curriculum, projects, career salaries, certification and FAQ for the ${c.name} course at Glass Nexus Academy.`;
    const url = `https://glass-nexus-academy.lovable.app/courses/${c.slug}/curriculum`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: CurriculumNotFound,
  component: CurriculumPage,
});

function CurriculumNotFound() {
  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="hero-bg" />
        <div className="s-inner" style={{ paddingTop: "5rem", textAlign: "center" }}>
          <span className="eyebrow">404</span>
          <h1 className="s-title">Curriculum not found</h1>
          <p className="s-sub">This course doesn't exist. Browse all courses below.</p>
          <div style={{ marginTop: "2rem" }}>
            <Link to="/courses" className="btn-glow">View all courses</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function CurriculumPage() {
  const { course } = Route.useLoaderData() as { course: CourseDetail };
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="page-hero">
        <div className="hero-bg" />
        <div className="s-inner" style={{ paddingTop: "5rem" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <div
              className="course-icon"
              style={{
                background: course.iconBg,
                color: course.iconColor,
                width: 56,
                height: 56,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
              }}
            >
              <i className={`ti ${course.icon}`} />
            </div>
            <span className="eyebrow" style={{ margin: 0 }}>Full curriculum</span>
          </div>
          <h1 className="s-title">{course.name} — Curriculum</h1>
          <p className="s-sub">
            Everything you'll learn, build, earn and certify with the {course.name} track.
          </p>
          <div className="cd-meta">
            <div className="cd-meta-item"><span className="cd-meta-label">Duration</span><span className="cd-meta-value">{course.duration}</span></div>
            <div className="cd-meta-item"><span className="cd-meta-label">Format</span><span className="cd-meta-value">{course.format}</span></div>
            <div className="cd-meta-item"><span className="cd-meta-label">Level</span><span className="cd-meta-value">{course.level}</span></div>
            <div className="cd-meta-item"><span className="cd-meta-label">Fee</span><span className="cd-meta-value">{course.price}</span></div>
          </div>
          <div style={{ marginTop: "1.75rem", display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" className="btn-glow" style={{ border: "none", cursor: "pointer" }} onClick={() => setModalOpen(true)}>
              Enrol now
            </button>
            <Link to="/courses/$slug" params={{ slug: course.slug }} className="p-btn out" style={{ display: "inline-block" }}>
              ← Back to course
            </Link>
          </div>
          <p className="cd-installment">💳 {course.installment}</p>
        </div>
      </section>

      {/* WEEKLY CURRICULUM */}
      <section style={{ background: "var(--dark2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="s-inner">
          <div className="sec-wrap">
            <span className="sec-chip">Weekly curriculum</span>
            <h2 className="sec-title">What you'll cover, week by week</h2>
          </div>
          <div className="cd-curriculum">
            {course.curriculum.map((w) => (
              <div className="cd-week" key={w.week}>
                <div className="cd-week-tag">{w.week}</div>
                <div>
                  <div className="cd-week-title">{w.topic}</div>
                  <p className="cd-week-details">{w.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <div className="sec-wrap">
            <span className="sec-chip">Projects</span>
            <h2 className="sec-title">Projects you'll build</h2>
          </div>
          <div className="cd-block">
            <ul className="cd-check-list">
              {course.projects.map((p) => (
                <li key={p}><span className="course-feat-check">▸</span> {p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section style={{ background: "var(--dark2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="s-inner">
          <div className="sec-wrap">
            <span className="sec-chip">Careers</span>
            <h2 className="sec-title">Roles & expected salary ranges</h2>
          </div>
          <div className="cd-careers">
            {course.careers.map((c) => (
              <div className="cd-career" key={c.role}>
                <div className="cd-career-role">{c.role}</div>
                <div className="cd-career-salary">{c.salary}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <div className="cd-cert">
            <div className="cd-cert-icon"><i className="ti ti-certificate" /></div>
            <div>
              <h2 className="cd-h2" style={{ marginBottom: 8 }}>Certification</h2>
              <p className="cd-p" style={{ margin: 0 }}>{course.certification}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--dark2)", borderTop: "1px solid var(--border)" }}>
        <div className="s-inner">
          <div className="sec-wrap">
            <span className="sec-chip">FAQ</span>
            <h2 className="sec-title">Frequently asked questions</h2>
          </div>
          <div className="faq-grid">
            {course.faqs.map((f, i) => (
              <div className={`faq-item${openFaq === i ? " open" : ""}`} key={f.q}>
                <button className="faq-header" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="faq-question">{f.q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <p className="faq-answer">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI TUTOR */}
      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <div className="sec-wrap">
            <span className="sec-chip">AI Tutor</span>
            <h2 className="sec-title">Ask Nexa anything about {course.name}</h2>
            <p className="s-sub" style={{ maxWidth: 640 }}>
              Your personal AI tutor knows this course's full curriculum, projects, careers and certification. Ask a question below.
            </p>
          </div>
          <CourseTutor slug={course.slug} courseName={course.name} />
        </div>
      </section>



      <div className="cta-banner">
        <h2>Ready to start <span style={{ color: "var(--green)" }}>{course.name}?</span></h2>
        <p>Join the next intake at Glass Nexus Academy — physical in Ikorodu or live online.</p>
        <button type="button" className="btn-glow" style={{ border: "none", cursor: "pointer" }} onClick={() => setModalOpen(true)}>
          Enrol now
        </button>
      </div>

      <EnrollModal open={modalOpen} onClose={() => setModalOpen(false)} mode="course" courseName={course.name} />
    </SiteLayout>
  );
}
