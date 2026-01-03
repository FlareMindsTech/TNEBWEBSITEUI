import React, { useState } from "react";
import "./Login.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Please fill the Email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email address";
    if (!form.password) newErrors.password = "Please enter the Password";
    // if (!termsAccepted) newErrors.terms = "You must accept the terms and conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  // Update form state on input change
  const handleChange = (e) => {
    const { type, checked } = e.target;
    if (type === 'checkbox') {
        setTermsAccepted(checked);
        if (errors.terms) setErrors(prev => ({ ...prev, terms: "" }));
    } else {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
    if (errors.credentials) setErrors(prev => ({ ...prev, credentials: "" }));
  };

  // Handle input focus for floating label
  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  // Handle input blur for floating label
  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // For demo purposes, assume login is successful
      setIsLoading(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="authContainer">
      {/* Auth Card */}
      <div className="authCard">
        <div className="cardHeader">
          <h3 className="cardTitle">Login</h3>
        </div>

        <div className="card-body p-4 p-md-5 p-lg-5">
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="inputContainer mb-4">
              <label className="form-label fw-semibold floatingLabel" style={{ color: isFocused.email || form.email ? '#61dafb' : '#6c757d' }}>
                Email address
              </label>
              <div className="inputGroup" style={{display:'flex'}}>
                <span className={`input-group-text inputIcon ${isFocused.email ? 'inputIconFocused' : ''}`}>
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  className="form-control formControl"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  placeholder=" "
                />
                <div className="inputUnderline"></div>
              </div>
              {errors.email && <div className="text-danger errorText">{errors.email}</div>}
            </div>

            {/* Password Field */}
            <div className="inputContainer mb-4">
              <label className="form-label fw-semibold floatingLabel" style={{ color: isFocused.password || form.password ? '#61dafb' : '#6c757d' }}>
                Password
              </label>
              <div className="inputGroup" style={{display:'flex'}}>
                <span className={`input-group-text inputIcon ${isFocused.password ? 'inputIconFocused' : ''}`}>
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control formControl"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  placeholder=" "
                />
                <button
                  className={`input-group-text inputIcon ${isFocused.password ? 'inputIconFocused' : ''}`}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="inputUnderline"></div>
              </div>
              {errors.password && <div className="text-danger errorText">{errors.password}</div>}
            </div>

        

            {errors.terms && <div className="text-danger errorText mt-1">{errors.terms}</div>}

            {/* Error Alert */}
            {errors.credentials && (
              <div className="alert alert-danger" role="alert">
                <div className="alertContent">
                  <span className="alertIcon">⚠️</span>
                  {errors.credentials}
                </div>
                <div className="alertShine"></div>
              </div>
            )}

            {/* Submit Button */}
            <div className="d-grid mb-4">
              <button 
                type="submit" 
                className={`btn ${isLoading ? 'btnLoading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    <span className="btnText">Signing in...</span>
                  </>
                ) : (
                  <>
                    <span className="btnText">Sign In</span>
                    <div className="btnShine"></div>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="text-center mb-3">
            <Link to="/forget" className="authLink forgotLink">
              <span>Forgot your password?</span>
              <div className="linkUnderline"></div>
            </Link>
          </div>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <span className="signupText">Don't have an account? </span>
            <Link to="/signup" className="authLink">
              <span>Create account</span>
              <div className="linkUnderline"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
