import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glass Nexus Academy | Tech Training Centre" },
      { name: "description", content: "Professional tech training in Python, Web Development, Data Analysis, Hardware Repair, AI & Cybersecurity. Ijebu-Ode, Ogun State." },
    ],
  }),
  component: Index,
});

const STRIP = [
  { img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80", lbl: "Python Programming", sub: "Beginner to Advanced" },
  { img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80", lbl: "Web Development", sub: "HTML · CSS · JavaScript" },
  { img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80", lbl: "Data Analysis", sub: "Excel · SQL · Basics" },
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", lbl: "Hardware & Repairs", sub: "PC · Laptops · Phones" },
  { img: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&q=80", lbl: "Microsoft Office", sub: "Word · Excel · PowerPoint" },
  { img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80", lbl: "AI & Automation", sub: "Tools for the future" },
  { img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&q=80", lbl: "Cybersecurity", sub: "Stay safe online" },
];

const SLIDES = [
  { img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80", tag: "Python Programming", title: "From zero to developer in 12 weeks", desc: "Our Python track takes you from basics to building real projects — even if you've never written a line of code." },
  { img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80", tag: "Web Development", title: "Build websites clients actually pay for", desc: "Learn HTML, CSS, and JavaScript with hands-on projects. Graduates leave with a portfolio." },
  { img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80", tag: "Data Analysis", title: "Turn numbers into insights", desc: "Master Excel, basic SQL, and data storytelling. In high demand across banks, NGOs, and businesses." },
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80", tag: "Hardware & Repairs", title: "Start your own repair business", desc: "Learn to diagnose and fix laptops, PCs, and phones. Many graduates now run thriving repair shops." },
  { img: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=900&q=80", tag: "Microsoft Office", title: "The skills every employer wants", desc: "Word, Excel, and PowerPoint — taught properly with real-world tasks." },
];

function Index() {
  const [cur, setCur] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCur((c) => (c + 1) % SLIDES.length), 4500);
  };

  useEffect(() => {
    reset();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />
        <div className="s-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse" />
              Now enrolling — Ijebu-Ode, Ogun State
            </div>
            <h1>
              Build Real<br />
              <span className="accent">Tech Skills</span><br />
              <span className="outline">That Pay.</span>
            </h1>
            <p>Professional training in Python, Web Development, Data Analysis, Hardware Repair, and Microsoft Office. Start your tech career today.</p>
            <div className="hero-btns">
              <Link className="btn-primary" to="/courses"><i className="ti ti-rocket" /> Explore courses</Link>
              <Link className="btn-ghost" to="/contact"><i className="ti ti-message-circle" /> Talk to us</Link>
            </div>
          </div>
        </div>
        <div className="hero-float">
          <div className="hero-float-card">
            <div className="hfc-glow" style={{ background: "#185FA5" }} />
            <div className="hfc-icon" style={{ background: "rgba(24,95,165,0.2)", color: "#5BA4F5" }}><i className="ti ti-brand-python" /></div>
            <div className="hfc-title">Python</div>
            <div className="hfc-sub">12-week track</div>
          </div>
          <div className="hero-float-card">
            <div className="hfc-glow" style={{ background: "#0EA5E9" }} />
            <div className="hfc-icon" style={{ background: "var(--green-soft)", color: "var(--green)" }}><i className="ti ti-world" /></div>
            <div className="hfc-title">Web Dev</div>
            <div className="hfc-sub">HTML · CSS · JS</div>
          </div>
          <div className="hero-float-card">
            <div className="hfc-glow" style={{ background: "#BA7517" }} />
            <div className="hfc-icon" style={{ background: "rgba(186,117,23,0.2)", color: "#F5C542" }}><i className="ti ti-cpu" /></div>
            <div className="hfc-title">Hardware</div>
            <div className="hfc-sub">Repairs & builds</div>
          </div>
          <div className="hero-float-card">
            <div className="hfc-glow" style={{ background: "#534AB7" }} />
            <div className="hfc-icon" style={{ background: "rgba(83,74,183,0.2)", color: "#9B8FFF" }}><i className="ti ti-chart-bar" /></div>
            <div className="hfc-title">Data</div>
            <div className="hfc-sub">Excel · SQL</div>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <div className="strip-wrap">
        <div className="strip-track">
          {[...STRIP, ...STRIP].map((s, i) => (
            <div className="s-card" key={i}>
              <img src={s.img} alt={s.lbl} />
              <div className="s-ov">
                <div className="s-lbl">{s.lbl}</div>
                <div className="s-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="stats-row">
        <div className="stat"><span className="num">7+</span><div className="dsc">Course tracks</div></div>
        <div className="stat"><span className="num">100%</span><div className="dsc">Practical training</div></div>
        <div className="stat"><span className="num">₦</span><div className="dsc">Affordable fees</div></div>
        <div className="stat"><span className="num">📜</span><div className="dsc">Certificate awarded</div></div>
      </div>

      {/* ZOOM GRID */}
      <div className="sec-wrap">
        <span className="sec-chip">What we offer</span>
        <h2 className="sec-title">Courses built for the real world</h2>
        <p className="sec-sub">Every track is taught with hands-on projects so you leave with skills you can actually use.</p>
      </div>
      <div className="zoom-grid">
        {STRIP.slice(0, 6).map((s, i) => (
          <Link to="/courses" className="z-card" key={i}>
            <img src={s.img.replace("w=400", "w=500")} alt={s.lbl} />
            <div className="z-ov">
              <div className="z-title">{s.lbl}</div>
              <span className="z-tag">{s.sub}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="sec-divider" />

      {/* CAROUSEL */}
      <div className="sec-wrap">
        <span className="sec-chip">Student success</span>
        <h2 className="sec-title">See what's possible</h2>
        <p className="sec-sub">A glimpse into life and learning tracks at Glass Nexus Academy.</p>
      </div>
      <div className="carousel-section">
        <div className="carousel-wrap">
          <div className="carousel-viewport">
            <div className="carousel-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
              {SLIDES.map((s, i) => (
                <div className="c-slide" key={i}>
                  <img src={s.img} alt={s.tag} />
                  <div className="c-ov">
                    <span className="c-tag">{s.tag}</span>
                    <div className="c-title">{s.title}</div>
                    <div className="c-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="car-btn prev" aria-label="Previous" onClick={() => { setCur((c) => (c - 1 + SLIDES.length) % SLIDES.length); reset(); }}>
            <i className="ti ti-chevron-left" />
          </button>
          <button className="car-btn next" aria-label="Next" onClick={() => { setCur((c) => (c + 1) % SLIDES.length); reset(); }}>
            <i className="ti ti-chevron-right" />
          </button>
          <div className="car-dots">
            {SLIDES.map((_, i) => (
              <button key={i} className={`car-dot${i === cur ? " active" : ""}`} aria-label={`Slide ${i + 1}`} onClick={() => { setCur(i); reset(); }} />
            ))}
          </div>
        </div>
      </div>

      {/* MEET THE TEAM */}
      <section className="meet-team-section">
        <div className="s-inner meet-team-inner">
          <div>
            <span className="eyebrow">Our Tutors</span>
            <h2 className="meet-team-title">Meet the team teaching tomorrow's tech skills</h2>
            <p className="meet-team-sub">Founders, developers, designers and digital marketers — get to know the experts behind every class.</p>
          </div>
          <Link to="/tutors" className="btn-primary">Meet the Team →</Link>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner">
        <h2>Ready to start your<br /><span style={{ color: "var(--green)" }}>tech journey?</span></h2>
        <p>Enrol today and get certified in your chosen track.</p>
        <Link className="btn-glow" to="/contact">Get started today</Link>
      </div>
    </SiteLayout>
  );
}
