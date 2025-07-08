import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmModal from "../components/ConfirmModal"; // ✅ Import modal
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false); // ✅ New
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    getUser();
    window.addEventListener("storage", getUser);
    return () => window.removeEventListener("storage", getUser);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location.pathname]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    setShowLogoutModal(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className="main-header">
        <div className="header-container">
          <div className="logo">
            <Link to="/" className="logo-link">
              <span className="logo-icon">📝</span>
              BlogBrew
            </Link>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

            <div className="search-container">
              <button className="search-toggle" onClick={() => setShowSearch(!showSearch)}>🔍</button>
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
            </div>

            {user ? (
              <>
                <Link to="/create" onClick={() => setMenuOpen(false)}>Write</Link>
                <span className="nav-username">👋 {user.username}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {showLogoutModal && (
        <ConfirmModal
          message="Are you sure you want to log out?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </>
  );
}

export default Header;
