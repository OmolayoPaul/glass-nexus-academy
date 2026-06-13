import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About & Results" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`site-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <img src="/logo.png" alt="Glass Nexus Academy" className="logo-img" />
            Glass Nexus Academy
          </Link>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} activeProps={{ className: "active" }} activeOptions={{ exact: l.to === "/" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="nav-cta">Enrol now</Link>
          <button className="hamburger" aria-label="Open menu" onClick={() => setOpen(true)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        <button className="mobile-close" aria-label="Close menu" onClick={() => setOpen(false)}>✕</button>
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            activeProps={{ className: "active" }}
            activeOptions={{ exact: l.to === "/" }}
          >
            {l.label}
          </Link>
        ))}
        <Link to="/contact" className="nav-cta" onClick={() => setOpen(false)}>Enrol now</Link>
      </div>
    </>
  );
}
