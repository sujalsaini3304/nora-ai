import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.connection.js";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const Signin = () => {
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  // Redirect if user is already logged in
  useEffect(() => {
    // Only redirect if user exists AND we're not in the middle of a signup flow
    if (user && !location.state?.fromSignup) {
      navigate("/email/auth");
    }
  }, [user, navigate, location]);


  const showSuccessAlert = (message) => {
    setSuccess(message);
    setIsNavigating(true);

    // Show success message for 2 seconds, then navigate
    setTimeout(() => {
      navigate("/email/auth");
    }, 2000);
  };

  const clearError = () => {
    setError("");
  };

  const loginWithGoogle = async () => {
    try {
      setError("");
      await signInWithPopup(auth, googleProvider);
      showSuccessAlert("Signed in with Google successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const loginWithEmail = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      showSuccessAlert("Signed in successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 relative">
      {/* Success Alert */}
      {success && (
        <Box
          sx={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            maxWidth: "90vw",
            zIndex: 9999,
            animation: "slideInDown 0.3s ease-out",
          }}
        >
          <Alert severity="success">
            {success} Redirecting...
          </Alert>
        </Box>
      )}

      {/* Error Alert */}
      {error && (
        <Box
          sx={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            maxWidth: "90vw",
            zIndex: 9999,
            animation: "slideInDown 0.3s ease-out",
          }}
        >
          <Alert severity="error" onClose={clearError}>
            {error}
          </Alert>
        </Box>
      )}

      <div className="bg-white w-[400px] max-w-[90vw] shadow-xl rounded-3xl p-8 sm:p-10 border border-gray-100 z-10">
        <div>
          <img src="nora-ai-logo.png" style={{ height: 60, width: 60, justifySelf: "center", marginBottom: 10 }} />
        </div>
        <h2 style={{ color: "#02cd9f" }} className="text-2xl sm:text-3xl font-bold text-center  tracking-wide">
          Nora AI
        </h2>
        <p className="text-center text-gray-500 mt-2 text-sm">
          Enter your credentials to continue
        </p>

        <form onSubmit={loginWithEmail} className="mt-8 flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isNavigating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold tracking-wide transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed"
          >
            {isNavigating ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          onClick={loginWithGoogle}
          disabled={isNavigating}
          className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 font-semibold text-gray-700 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          {isNavigating ? "Signing in..." : "Continue with Google"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?
          <Link to="/signup">
            <span className="text-blue-500 font-semibold cursor-pointer ml-1 hover:underline">
              Sign up
            </span>
          </Link>
        </p>
      </div>

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes slideInDown {
          from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Signin;