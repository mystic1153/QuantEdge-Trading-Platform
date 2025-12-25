import React, { useState } from "react";
import axios from "axios";

const DASHBOARD_URL =
  process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";


const BACKEND_URL =
   process.env.REACT_APP_BACKEND_URL || "http://localhost:3002";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (mode) => {
    try {
      setIsSubmitting(true);
      setError("");

      const url =
        mode === "signup"
          ? `${BACKEND_URL}/auth/signup`
          : `${BACKEND_URL}/auth/login`;

      const res = await axios.post(url, { email, password });

      // Store simple auth info in localStorage so dashboard/frontend can check it
      if (res.data && res.data.token) {
        localStorage.setItem("qe_auth_token", res.data.token);
        localStorage.setItem("qe_auth_email", res.data.email);

        // After successful login, redirect to dashboard-new app
        window.location.href = DASHBOARD_URL;
        return;
      }

      alert(res.data.message || "Success!");
    } catch (err) {
      console.error("Auth error", err);
      const message =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuth("login");
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h3 className="mb-3 text-center">Sign in to QuantEdge</h3>
            <p className="text-muted small text-center mb-4">
              Use your email and password to access your trading dashboard.
            </p>

            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => handleAuth("signup")}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create new account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;