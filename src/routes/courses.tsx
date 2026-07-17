import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { EnrollModal, type EnrollMode } from "@/components/EnrollModal";
import { COURSES as COURSE_DETAILS } from "@/lib/courseData";
import { useState } from "react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses & Services — Glass Nexus Academy" },
      { name: "description", content: "Tech course tracks (Python, Web Design, Cyber Security, UI/UX, Video Editing, Computer Operations), O-Level & JAMB online classes, and freelance services in Ikorodu, Lagos." },
      { property: "og:title", content: "Courses & Services — Glass Nexus Academy" },
      { property: "og:description", content: "Tech courses, O-Level & JAMB online classes, and freelance dev services. Hands-on training in Ikorodu, Lagos, Nigeria." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://glass-nexus-academy.lovable.app/courses" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Courses & Services — Glass Nexus Academy" },
      { name: "twitter:description", content: "Tech courses, O-Level & JAMB online classes, and freelance dev services." },
    ],
    links: [{ rel: "canonical", href: "https://glass-nexus-academy.lovable.app/courses" }],
  }),
  component: Courses,
});

type Course = {
  name: string; desc: string; icon: string; iconBg: string; iconColor: string;
  features: string[]; price: string; sub: string; whatsappMsg: string;
};

const wa = (msg: string) => `https://wa.me/2349154338312?text=${encodeURIComponent(msg)}`;

const TECH: Course[] = [
  {
    name: "Python Programming (Basic)",
    desc: "Build a strong foundation in Python — variables, logic, functions, OOP and small automation scripts.",
    icon: "ti-brand-python", iconBg: "rgba(24,95,165,0.15)", iconColor: "#5BA4F5",
    features: ["2 classes/week (teaching + practical)", "Beginner-friendly", "Hands-on mini projects"],
    price: "₦25,000 / month", sub: "2 classes/week (teaching + practical)",
    whatsappMsg: "Hi, I'm interested in the Python Programming course at Glass Nexus Academy.",
  },
  {
    name: "Computer Operations (Microsoft Packages)",
    desc: "Master computer fundamentals and Microsoft Office — Word, Excel, PowerPoint — with real practical tasks.",
    icon: "ti-device-desktop", iconBg: "rgba(14,165,233,0.15)", iconColor: "#0EA5E9",
    features: ["2 classes/week (teaching + practical)", "Word · Excel · PowerPoint", "Beginner-friendly"],
    price: "₦25,000 / month", sub: "2 classes/week (teaching + practical)",
    whatsappMsg: "Hi, I'm interested in the Computer Operations (Microsoft Packages) course at Glass Nexus Academy.",
  },
  {
    name: "Web Design — Frontend",
    desc: "HTML, CSS and React. Build responsive, modern websites and a real portfolio of projects.",
    icon: "ti-world", iconBg: "var(--green-soft)", iconColor: "var(--green)",
    features: ["2 classes/week (teaching + practical)", "Responsive design", "Portfolio projects"],
    price: "₦25,000 / month", sub: "2 classes/week (teaching + practical)",
    whatsappMsg: "Hi, I'm interested in the Frontend Web Design course at Glass Nexus Academy.",
  },
  {
    name: "Web Design — Backend (PHP)",
    desc: "Server-side PHP development, working with databases, building dynamic websites and admin panels.",
    icon: "ti-server", iconBg: "rgba(83,74,183,0.15)", iconColor: "#9B8FFF",
    features: ["2 classes/week (teaching + practical)", "MySQL databases", "Dynamic web apps"],
    price: "₦25,000 / month", sub: "2 classes/week (teaching + practical)",
    whatsappMsg: "Hi, I'm interested in the Backend Web Design (PHP) course at Glass Nexus Academy.",
  },
  {
    name: "Cyber Security",
    desc: "Practical cyber security — network safety, threat detection, encryption, password hygiene and best practices.",
    icon: "ti-shield-lock", iconBg: "rgba(163,45,45,0.15)", iconColor: "#FF7070",
    features: ["2 classes/week (teaching + practical)", "Threat detection basics", "Hands-on labs"],
    price: "₦30,000 / month", sub: "2 classes/week (teaching + practical)",
    whatsappMsg: "Hi, I'm interested in the Cyber Security course at Glass Nexus Academy.",
  },
  {
    name: "UI/UX Design & Video Editing",
    desc: "Design beautiful interfaces in Figma and create polished video content with professional editing tools.",
    icon: "ti-palette", iconBg: "rgba(255,140,66,0.15)", iconColor: "#FF8C42",
    features: ["2 classes/week (teaching + practical)", "Premiere / CapCut", "Real client projects"],
    price: "₦25,000 / month", sub: "2 classes/week (teaching + practical)",
    whatsappMsg: "Hi, I'm interested in the UI/UX & Video Editing course at Glass Nexus Academy.",
  },
  {
    name: "Data Analysis",
    desc: "Clean, analyse and visualise data using Advanced Excel and basic SQL. In high demand across industries.",
    icon: "ti-chart-bar", iconBg: "rgba(83,74,183,0.15)", iconColor: "#9B8FFF",
    features: ["2 classes/week (teaching + practical)", "SQL basics", "Data storytelling"],
    price: "₦25,000 / month", sub: "2 classes/week (teaching + practical)",
    whatsappMsg: "Hi, I'm interested in the Data Analysis course at Glass Nexus Academy.",
  },
  {
    name: "Hardware & Repairs",
    desc: "Diagnose and repair PCs, laptops and smartphones. 100% practical lab training.",
    icon: "ti-cpu", iconBg: "rgba(186,117,23,0.15)", iconColor: "#F5C542",
    features: ["2 classes/week (teaching + practical)", "Component swaps", "Repair business setup"],
    price: "Contact for fee", sub: "2 classes/week (teaching + practical)",
    whatsappMsg: "Hi, I'm interested in the Hardware & Repairs course at Glass Nexus Academy.",
  },
];

type Service = { name: string; desc: string; price: string; icon: string; iconBg: string; iconColor: string; whatsappMsg: string };
const SERVICES: Service[] = [
  {
    name: "Website Development",
    desc: "Responsive websites built to convert — with basic content management and hosting set up.",
    price: "Frontend ₦40,000 · Full stack ₦70,000",
    icon: "ti-world-code", iconBg: "var(--green-soft)", iconColor: "var(--green)",
    whatsappMsg: "Hi, I'd like a quote for Website Development from Glass Nexus Academy.",
  },
  {
    name: "App Development",
    desc: "Custom mobile and web applications tailored to your business or idea.",
    price: "Starting from ₦50,000",
    icon: "ti-device-mobile", iconBg: "rgba(24,95,165,0.15)", iconColor: "#5BA4F5",
    whatsappMsg: "Hi, I'd like a quote for App Development from Glass Nexus Academy.",
  },
  {
    name: "Dashboard Development",
    desc: "Custom admin dashboards and data panels to run your business with clarity.",
    price: "Quote-based",
    icon: "ti-layout-dashboard", iconBg: "rgba(83,74,183,0.15)", iconColor: "#9B8FFF",
    whatsappMsg: "Hi, I'd like a quote for a custom Dashboard from Glass Nexus Academy.",
  },
  {
    name: "Database Design & Management",
    desc: "Database setup, optimisation and ongoing management — including Snowflake and SQL.",
    price: "Quote-based",
    icon: "ti-database", iconBg: "rgba(14,165,233,0.10)", iconColor: "#0EA5E9",
    whatsappMsg: "Hi, I'd like a quote for Database Design & Management from Glass Nexus Academy.",
  },
  {
    name: "Video Editing & Content",
    desc: "Professional video editing for YouTube, social media and brand content creation.",
    price: "Quote-based",
    icon: "ti-video", iconBg: "rgba(255,140,66,0.15)", iconColor: "#FF8C42",
    whatsappMsg: "Hi, I'd like a quote for Video Editing & Content Creation from Glass Nexus Academy.",
  },
];

function CourseCard({ c, onEnrol }: { c: Course; onEnrol: (name: string) => void }) {
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
      <div className="course-footer course-footer-stack">
        <div>
          <div className="course-price">{c.price}</div>
          <div className="course-sub">{c.sub}</div>
        </div>
        <button type="button" onClick={() => onEnrol(c.name)} className="course-action-btn" style={{ border: "none", cursor: "pointer" }}>Enrol now →</button>
      </div>
    </div>
  );
}

function Courses() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<EnrollMode>("course");
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();

  const openCourse = (name: string) => {
    setSelectedCourse(name);
    setModalMode("course");
    setModalOpen(true);
  };
  const openOlevel = () => {
    setSelectedCourse(undefined);
    setModalMode("olevel");
    setModalOpen(true);
  };

  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="hero-bg" />
        <div className="s-inner" style={{ paddingTop: "5rem" }}>
          <span className="eyebrow">Courses & Services</span>
          <h1 className="s-title">Tech Courses, Exam Prep & Freelance Services</h1>
          <p className="s-sub">Practical monthly course tracks, online O-Level &amp; JAMB classes for SS students, and professional tech services for businesses.</p>
        </div>
      </section>

      {/* TECH COURSES */}
      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <h2 className="courses-category-title">Tech Course Tracks</h2>
          <div className="courses-grid">{TECH.map((c) => <CourseCard c={c} key={c.name} onEnrol={openCourse} />)}</div>
        </div>
      </section>

      {/* O-LEVEL BANNER */}
      <section className="olevel-section">
        <div className="s-inner">
          <div className="olevel-card">
            <div className="olevel-left">
              <span className="olevel-chip">Online · SS1 · SS2 · SS3</span>
              <h2 className="olevel-title">Ace Your Exams — O-Level &amp; JAMB Online Classes from ₦12,000/month</h2>
              <p className="olevel-sub">Live online prep classes for WAEC, NECO, GCE and JAMB (UTME). Subjects covered: Mathematics, English, Further Mathematics, ICT and more.</p>
              <div className="olevel-grid">
                {[
                  { ex: "WAEC", d: "Preparation" },
                  { ex: "NECO", d: "Preparation" },
                  { ex: "GCE", d: "Preparation" },
                  { ex: "JAMB", d: "UTME Prep" },
                ].map((x) => (
                  <div className="olevel-pill" key={x.ex}>
                    <div className="olevel-pill-top">{x.ex}</div>
                    <div className="olevel-pill-sub">{x.d}</div>
                    <div className="olevel-pill-price">₦12,000/mo</div>
                  </div>
                ))}
              </div>
              <p className="olevel-note">Available for SS1, SS2 &amp; SS3 students. Classes held online via video call. We also help with educational advice and school subject registrations.</p>
              <button type="button" onClick={openOlevel} className="btn-glow olevel-cta" style={{ border: "none", cursor: "pointer" }}>Enrol now and get started</button>
            </div>
          </div>
        </div>
      </section>

      {/* FREELANCE SERVICES */}
      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <div className="sec-wrap" style={{ paddingTop: 0 }}>
            <span className="sec-chip">Freelance & Tech Services</span>
            <h2 className="sec-title">Beyond Training — We Build For You</h2>
            <p className="sec-sub">From websites to dashboards and content creation, our team delivers production-grade work for individuals and businesses.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div className="service-card" key={s.name}>
                <div className="service-icon" style={{ background: s.iconBg, color: s.iconColor }}>
                  <i className={`ti ${s.icon}`} />
                </div>
                <h3 className="service-name">{s.name}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-price">{s.price}</div>
                <a href={wa(s.whatsappMsg)} target="_blank" rel="noopener" className="service-cta">Request a Quote →</a>
              </div>
            ))}
          </div>
          <p className="services-pay-note">💳 Payments accepted online via Flutterwave / Paystack</p>
        </div>
      </section>

      <div className="cta-banner">
        <h2>Confused about the right track?</h2>
        <p>Talk to our advisors. We'll help match your career goals to the ideal course or service.</p>
        <Link className="btn-glow" to="/contact">Talk to an Advisor</Link>
      </div>
      <EnrollModal open={modalOpen} onClose={() => setModalOpen(false)} mode={modalMode} courseName={selectedCourse} />
    </SiteLayout>
  );
}
