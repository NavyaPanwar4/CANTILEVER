import { Link } from "react-router-dom";
import "./Prob.css";

function Prob() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default Prob;
