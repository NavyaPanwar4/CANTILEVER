import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="logo-icon">
              {/* SVG ICON */}
              <svg
                width="26"
                height="26"
                viewBox="0 0 511.6 511.6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <polygon
                  fill="#FFCE54"
                  points="315.753,74.602 0,74.602 0,394.344 234.488,394.344 319.75,436.998 319.735,394.344 383.699,394.344 383.699,138.552"
                />
                <polygon
                  fill="#E6E9ED"
                  points="483.122,335.734 454.801,335.734 426.322,424.555 468.977,452.986 511.6,424.555"
                />
                <path
                  fill="#656D78"
                  d="M468.977,58.614c-23.56,0-42.654,19.086-42.654,42.638v277.104H511.6V101.253C511.6,77.701,492.522,58.614,468.977,58.614z"
                />
                <path
                  fill="#656D78"
                  d="M319.75,310.378H63.95c-5.887,0-10.656-4.777-10.656-10.647c0-5.902,4.77-10.664,10.656-10.664h255.8c5.886,0,10.647,4.762,10.647,10.664C330.398,305.601,325.636,310.378,319.75,310.378z"
                />
                <path
                  fill="#656D78"
                  d="M319.75,246.436H63.95c-5.887,0-10.656-4.778-10.656-10.664s4.77-10.656,10.656-10.656h255.8c5.886,0,10.647,4.77,10.647,10.656S325.636,246.436,319.75,246.436z"
                />
                <path
                  fill="#656D78"
                  d="M202.506,182.487H63.95c-5.887,0-10.656-4.778-10.656-10.664s4.77-10.655,10.656-10.655h138.556c5.886,0,10.663,4.77,10.663,10.655C213.169,177.709,208.392,182.487,202.506,182.487z"
                />
                <polygon
                  fill="#F6BB42"
                  points="315.753,74.602 315.753,138.552 383.699,138.552"
                />
              </svg>
            </span>
            Blog.it
          </Link>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/create" onClick={() => setMenuOpen(false)}>Write</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
