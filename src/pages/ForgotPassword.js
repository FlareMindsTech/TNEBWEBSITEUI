import { useState } from "react";
import { FaEnvelope, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./ForgotPass.css";
import { Link } from "react-router-dom";
import { BASE_URL, MAIL_URL } from "../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Please fill the Email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ ...errors, email: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${MAIL_URL}/api/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await res.json();
      setMessage(data.message);
      setIsSubmitted(true);
    } catch (err) {
      setErrors({
        email: err.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="forgot-password-container">
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{ '--delay': `${i * 0.3}s`, '--duration': `${12 + i * 1.5}s`, left: `${Math.random() * 100}%` }}></div>
        ))}
      </div>
      <div className="forgot-password-card">
        {!isSubmitted ? (
          <>
            <h1 className="title">Forgot Password</h1>
            <p className="subtitle">
              Enter your registered email to reset your password
            </p>

            <form onSubmit={handleSubmit} className="form-container">
              <div className="input-group">
                <div className="input-icon">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              {errors.email && <div className="text-danger">{errors.email}</div>}

              <button
                type="submit"
                className={`submit-btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <h2>Check your email</h2>
            <p>{message}</p>
            <button onClick={resetForm} className="submit-btn">
              Try again
            </button>
          </div>
        )}

        <div className="footer-links">
          <div className="footer-link">
            <FaUserPlus className="link-icon" />
            <Link to="/register">Create Account</Link>
          </div>
          <div className="footer-link">
            <FaSignInAlt className="link-icon" />
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
