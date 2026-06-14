import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer>
      <div className="f-logo">
        <img src="/logo.png" alt="Glass Nexus Academy" className="logo-img-footer" />
        Glass <span>Nexus</span> Academy
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <p>© {new Date().getFullYear()} Glass Nexus Academy · Ijebu-Ode, Ogun State, Nigeria</p>
        <p style={{ fontSize: 12, color: "var(--text-dim)" }}>All rights reserved</p>
      </div>
      <ul className="f-links">
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/tutors">Tutors</Link></li>
        <li><Link to="/about">Results</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </footer>
  );
}
