import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/http";
import useAuth from "../store/useAuth";
import "./AuthForm.css";

export default function Register() {
  const nav = useNavigate();
  const login = useAuth((s) => s.login);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const { data } = await api.post("/auth/register", form);
      
      // Store token and user data consistently
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Update auth state
      login({ token: data.accessToken, user: data.user });
      
      // Redirect to home
      nav("/", { replace: true });
    } catch (err) {
  console.error("Register Error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
}
 finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={submit} className="auth-form">
        <h1>Register</h1>
        {error && <p className="error-message">{error}</p>}
        
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          minLength={3}
        />
        
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength={6}
        />
        
        <button 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        
        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}