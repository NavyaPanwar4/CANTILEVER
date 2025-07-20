import { useState, useEffect } from "react";
import api from "../api/http";
import { showToast } from "./Toast";
import useAuth from "../store/useAuth";
import "../pages/AuthForm.css";

export default function AuthModal({ isLogin, setIsLogin, closeModal }) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const setAuth = useAuth((s) => s.login); 

  useEffect(() => {
    setCredentials({ name: "", email: "", password: "" });
    setError("");
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = isLogin
      ? { email: credentials.email, password: credentials.password }
      : credentials;

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await api.post(endpoint, payload);

      const { accessToken, user } = res.data;

      if (!accessToken) {
        showToast("Token not received from server", "error");
        return;
      }

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      setAuth({ token: accessToken, user });

      showToast(
        `${isLogin ? "Login" : "Registration"} successful`,
        "success"
      );
      closeModal();
    } catch (err) {
      console.error("AUTH ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-tabs">
        <button
          className={isLogin ? "active" : ""}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            placeholder="Name"
            value={credentials.name}
            onChange={(e) =>
              setCredentials({ ...credentials, name: e.target.value })
            }
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}
