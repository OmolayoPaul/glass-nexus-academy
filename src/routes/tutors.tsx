import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/tutors")({
  head: () => ({
    meta: [
      { title: "Meet Our Tutors — Glass Nexus Academy" },
      { name: "description", content: "Meet the instructors at Glass Nexus Academy — founder Omolayo Paul Adeyemi, content specialist Amos, UI/UX developer Babatunde Segun, digital marketer Loveeth and more." },
      { property: "og:title", content: "Meet Our Tutors — Glass Nexus Academy" },
      { property: "og:description", content: "The professional instructors behind Glass Nexus Academy — tech educators, full-stack developers, designers and digital marketers." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://glass-nexus-academy.lovable.app/tutors" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Meet Our Tutors — Glass Nexus Academy" },
      { name: "twitter:description", content: "Professional educators, developers, designers and digital marketers at Glass Nexus Academy." },
    ],
    links: [{ rel: "canonical", href: "https://glass-nexus-academy.lovable.app/tutors" }],
  }),
  component: Tutors,
});

type Tutor = {
  initials: string;
  name: string;
  title: string;
  bio: string;
  specs: string[];
  tags: string[];
  accent: string;
  handle?: string;
};

const TUTORS: Tutor[] = [
  {
    initials: "OP",
    name: "Omolayo Paul Adeyemi",
    title: "Founder & Lead Instructor · Full-Stack Developer & AI Integration Specialist",
    bio: "Omolayo Paul Adeyemi is the visionary founder of Glass Nexus Academy, bringing a rare combination of academic expertise and practical industry experience to every class. A Computer Science graduate of Tai Solarin University of Education (TASUED), he has spent years shaping young minds as a professional tutor in Mathematics, Further Mathematics and ICT at Junior and Senior Secondary School levels. Beyond the classroom, Paul is an accomplished web and app developer, database specialist and data analyst with hands-on experience in modern tools including Snowflake. As a Vibe Programmer, he champions the efficient and ethical use of AI in software development — helping students not just write code, but think smarter. His goal: bridge the gap between Nigerian youth and the global tech economy.",
    specs: [
      "Web & App Development (Frontend + Backend)",
      "Database Design & Management (Snowflake)",
      "Data Analytics",
      "Python Programming",
      "Professional Tutoring — Maths, Further Maths, ICT",
      "AI-Powered Development (Vibe Programming)",
    ],
    tags: ["React", "PHP", "Python", "SQL", "Snowflake", "Data Analytics", "AI Tools", "Pedagogy"],
    accent: "#0EA5E9",
  },
  {
    initials: "AE",
    name: "Amos",
    handle: "Amos Edits",
    title: "Professional Content Creator & Digital Editor",
    bio: "Amos is Glass Nexus Academy's resident creative force, specialising in professional content creation and digital editing. With a sharp eye for visual storytelling and a deep understanding of what makes content perform across platforms, Amos brings a practical, portfolio-driven approach to every session. Whether you're looking to build a career in content creation, grow a brand online, or master the tools of the trade, Amos delivers training that goes far beyond theory.",
    specs: [
      "Professional Video Editing",
      "Content Creation for Social Media & YouTube",
      "Brand Storytelling",
      "Photo Editing & Visual Design",
      "Digital Media Strategy",
    ],
    tags: ["Video Editing", "Adobe Premiere", "CapCut", "Content Strategy", "Social Media", "Photography"],
    accent: "#FF8C42",
  },
  {
    initials: "BS",
    name: "Babatunde Segun",
    handle: "babsiedits",
    title: "Professional UI/UX Developer & Vibe Programmer",
    bio: "Babatunde Segun combines design intuition with development skill to create digital experiences that are both beautiful and functional. A professional UI/UX developer and Vibe Programmer, Segun helps students understand that great software starts with great design thinking. His sessions cover the full design-to-development pipeline — from wireframes and prototypes to live, interactive interfaces. With a strong grasp of AI-assisted development workflows, he is one of the academy's most forward-thinking instructors.",
    specs: [
      "UI/UX Design (Wireframing, Prototyping, Design Systems)",
      "Frontend Development",
      "AI-Assisted Development (Vibe Programming)",
      "User Research & Accessibility",
      "Figma & Design Tools",
    ],
    tags: ["Figma", "Tailwind CSS", "React", "UI Design", "UX Research", "Vibe Coding", "AI Tools"],
    accent: "#9B8FFF",
  },
  {
    initials: "LV",
    name: "Loveeth",
    title: "Professional Digital Marketer & Content Strategy Specialist",
    bio: "Loveeth is Glass Nexus Academy's digital marketing authority, equipping students with the skills to build and grow brands in the digital space. Combining strategic thinking with creative execution, she delivers practical training in SEO, paid advertising, social media management, email marketing and content strategy. Her sessions are results-oriented — built for students who want to attract audiences, convert customers and build sustainable online businesses.",
    specs: [
      "Digital Marketing Strategy",
      "Social Media Management & Growth",
      "Content Creation & Copywriting",
      "SEO & Paid Advertising (Meta Ads, Google Ads)",
      "Email Marketing & Campaign Management",
      "Brand Identity & Online Presence",
    ],
    tags: ["SEO", "Meta Ads", "Google Ads", "Content Strategy", "Copywriting", "Email Marketing", "Analytics"],
    accent: "#34D399",
  },
];

function Tutors() {
  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="hero-bg" />
        <div className="s-inner" style={{ paddingTop: "5rem" }}>
          <span className="eyebrow">The Team</span>
          <h1 className="s-title">Meet Our Tutors</h1>
          <p className="s-sub">A small team of professional educators, developers, designers and digital marketers — each one focused on getting you real, employable skills.</p>
        </div>
      </section>

      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <div className="tutors-grid">
            {TUTORS.map((t) => (
              <article className="tutor-card" key={t.name}>
                <div className="tutor-top">
                  <div className="tutor-avatar" style={{ background: `linear-gradient(135deg, ${t.accent}, #1E293B)` }}>
                    {t.initials}
                  </div>
                  <div className="tutor-id">
                    <h2 className="tutor-name">{t.name}</h2>
                    {t.handle && <span className="tutor-handle">@{t.handle}</span>}
                    <p className="tutor-title">{t.title}</p>
                  </div>
                </div>
                <p className="tutor-bio">{t.bio}</p>
                <div className="tutor-section-label">Specialisations</div>
                <ul className="tutor-specs">
                  {t.specs.map((s) => (
                    <li key={s}><span className="tutor-dot" style={{ background: t.accent }} /> {s}</li>
                  ))}
                </ul>
                <div className="tutor-section-label">Skills</div>
                <div className="tutor-tags">
                  {t.tags.map((tag) => <span className="tutor-tag" key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}

            {/* Open slot card */}
            <article className="tutor-card tutor-card-placeholder">
              <div className="tutor-placeholder-icon"><i className="ti ti-user-plus" /></div>
              <h2 className="tutor-name" style={{ marginTop: 12 }}>More Tutors Coming Soon</h2>
              <p className="tutor-bio" style={{ marginTop: 8 }}>
                We're growing our team. Talented instructors in engineering, design, content and exam prep are joining us soon.
              </p>
              <a
                href={`https://wa.me/2349154338312?text=${encodeURIComponent("Hi, I'd like to apply to join Glass Nexus Academy as a tutor.")}`}
                target="_blank" rel="noopener" className="tutor-join"
              >
                Join as a Tutor →
              </a>
            </article>
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <h2>Learn directly from <span style={{ color: "var(--green)" }}>our experts</span></h2>
        <p>Pick a course track and start training with the team this month.</p>
        <Link className="btn-glow" to="/courses">Browse courses</Link>
      </div>
    </SiteLayout>
  );
}
