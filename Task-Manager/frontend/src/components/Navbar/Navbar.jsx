import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import useAuth from "../../store/useAuth";
import AuthModal from "../AuthModal";
import Modal from "../Modal";
import "./Navbar.css";

export default function Navbar({ darkMode, toggleTheme }) {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const [authOpen, setAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // ✅ When user clicks 'Logout', open confirmation modal
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  // ✅ Confirm logout and proceed
  const confirmLogout = () => {
    logout();
    navigate("/");
    setShowLogoutConfirm(false);
  };

  // ✅ Cancel logout
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <header className="navbar shadow-2">
      <div className="navbar-content">
        <button className="menu-button">
          <span className="material-icons">menu</span>
        </button>
        <Link to="/tasks/inbox" className="app-title">
        Task Manager
        </Link>


        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? "☀️" : "🌙"}
          </button>

          {isAuth ? (
            <>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="auth-buttons">
              <button
                className="nav-link"
                onClick={() => {
                  setAuthOpen(true);
                  setIsLogin(true);
                }}
              >
                Login
              </button>
              <button
                className="nav-link"
                onClick={() => {
                  setAuthOpen(true);
                  setIsLogin(false);
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🔐 Auth Modal */}
      <Modal isOpen={authOpen} onClose={() => setAuthOpen(false)}>
        <AuthModal
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          closeModal={() => setAuthOpen(false)}
        />
      </Modal>

      <Modal isOpen={showLogoutConfirm} onClose={cancelLogout}>
        <div className="logout-confirm-content">
          <h3>Log out?</h3>
          <p>Are you sure you want to log out of Task Manager?</p>
          <div className="logout-confirm-actions">
            <button onClick={cancelLogout} className="btn btn-text">Cancel</button>
            <button onClick={confirmLogout} className="btn btn-contained btn-danger">
              Log out
            </button>
          </div>
        </div>
      </Modal>
    </header>
  );
}
