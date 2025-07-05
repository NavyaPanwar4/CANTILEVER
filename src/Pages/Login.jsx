import './Auth.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    toast.success("Login successful! 🎉");
  };
  
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
}

export default Login;
