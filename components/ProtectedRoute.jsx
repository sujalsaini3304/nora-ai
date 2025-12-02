import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.connection.js";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <h3 className="mx-2" >Loading...</h3>;
  if (!user) return <Navigate to="/signin" />;

  return children;
};

export default ProtectedRoute;
