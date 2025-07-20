import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/http";
import useAuth from "../store/useAuth";
import "./AuthForm.css";

export default function Login() {
  const nav = useNavigate();
  const login = useAuth((s) => s.login);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await api.post("/auth/login", form);
    login({ token: data.accessToken, user: data.user });
    localStorage.setItem("token", data.accessToken);
    nav("/", { replace: true });
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="auth-form-container">
      <form onSubmit={submit} className="auth-form">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Log in</button>
        <p className="form-footer">
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
