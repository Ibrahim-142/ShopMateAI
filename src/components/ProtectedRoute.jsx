import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If loading, optionally show spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect immediately
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated
  return children;
};

export default ProtectedRoute;