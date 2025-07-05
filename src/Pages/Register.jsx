import './Auth.css';

function Register() {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Register</h2>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Create Account</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}

export default Register;
