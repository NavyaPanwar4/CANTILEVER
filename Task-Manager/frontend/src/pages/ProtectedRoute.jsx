import { Navigate } from "react-router-dom";
import useAuth from "../store/useAuth";
export default function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
}