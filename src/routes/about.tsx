import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Results — Glass Nexus Academy" },
      { name: "description", content: "Discover our history, educational credentials, core training values, and success stories from graduates across Nigeria." },
    ],
  }),
  component: About,
});

const TESTIS = [
  { initials: "AO", name: "Adewale Okafor", role: "Python Graduate · Ogun State", text: "Glass Nexus Academy changed my life. I came in knowing nothing about coding and left with real Python skills. The trainers are patient and very knowledgeable." },
  { initials: "FA", name: "Funke Adeyemi", role: "Web Dev Graduate · Lagos State", text: "I enrolled for the Web Development track and now I freelance for clients. The practical approach made everything click. Highly recommend!" },
  { initials: "EB", name: "Emmanuel Bello", role: "Hardware Graduate · Ijebu-Ode", text: "The hardware repair course was worth every kobo. I now run my own phone repair business after just 8 weeks of training at Glass Nexus." },
  { initials: "NN", name: "Ngozi Nwosu", role: "Office Graduate · Abeokuta", text: "Microsoft Office training here is very thorough. My employer was impressed with my Excel and PowerPoint skills." },
];

function About() {
  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="hero-bg" />
        <div className="s-inner" style={{ paddingTop: "5rem" }}>
          <span className="eyebrow">Our Story & Outcomes</span>
          <h1 className="s-title">Building Practical Skills That Matter</h1>
          <p className="s-sub">We combine certified tutoring guidelines with rigorous, hands-on technical labs to ensure our students graduate with job-ready tech skills.</p>
        </div>
      </section>

      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner">
          <div className="about-intro-grid">
            <div className="about-intro-text">
              <span className="eyebrow">Who We Are</span>
              <h2 className="s-title" style={{ fontSize: "2.2rem", marginBottom: "1.25rem" }}>Practical Training First</h2>
              <p>Glass Nexus Academy was founded on a simple principle: tech education should be practical, affordable, and results-oriented. From our training center in Ijebu-Ode, Ogun State, we provide certification courses that equip students with skills they can use to build careers and scale brands.</p>
              <p>Whether programming in Python, designing responsive websites, executing data models, or diagnosing hardware systems, our students learn by doing. Every course features real-world project builds and direct mentor feedback.</p>
            </div>
            <div className="about-features-panel">
              <h3 style={{ marginBottom: "1.5rem", fontFamily: "var(--font-d)", color: "var(--green)" }}>The Glass Nexus Standard</h3>
              {[
                { icon: "ti-certificate", title: "100% Practical Training", desc: "Every class focuses on actual lab workouts and project builds rather than dry theoretical lectures." },
                { icon: "ti-users", title: "1-on-1 Direct Mentorship", desc: "Get guided directly by vetted technical instructors with industry experience." },
                { icon: "ti-award", title: "Certificate Awarded", desc: "Receive a professional, industry-recognized training certificate upon successful graduation." },
              ].map((f) => (
                <div className="about-feat-box" key={f.title}>
                  <div className="about-feat-icon"><i className={`ti ${f.icon}`} /></div>
                  <div>
                    <h4 className="about-feat-title">{f.title}</h4>
                    <p className="about-feat-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="testi-section" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="s-inner">
          <div className="sec-wrap">
            <span className="sec-chip">Real Outcomes</span>
            <h2 className="sec-title">What Our Graduates Say</h2>
            <p className="sec-sub">Read verified feedback from students who transformed their skills at our training center</p>
          </div>
          <div className="testi-grid">
            {TESTIS.map((t) => (
              <div className="t-card" key={t.name}>
                <div className="t-stars">★★★★★</div>
                <p className="t-text">"{t.text}"</p>
                <div className="t-author">
                  <div className="t-avatar">{t.initials}</div>
                  <div>
                    <h4 className="t-name">{t.name}</h4>
                    <p className="t-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--dark)" }}>
        <div className="s-inner" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <h2 className="s-title" style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>Ready to Join Them?</h2>
          <p className="s-sub" style={{ margin: "0 auto 2.5rem", color: "var(--text-muted)" }}>
            Start your tech career today. Pick your course track, study in modern practical lab setups, and get certified.
          </p>
          <Link to="/contact" className="btn-primary">Start Your Tech Journey →</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
