import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle
} from "react-icons/fa";
import Swal from 'sweetalert2';
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({ password: false, confirmPassword: false });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  // Generate particles for background
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    duration: Math.random() * 10 + 5 + 's',
    delay: Math.random() * 5 + 's',
    left: Math.random() * 100 + '%'
  }));

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "Please fill the First Name";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Name only contains letters";
        break;
      case "lastName":
        if (!value.trim()) return "Please fill the Last Name";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Name only contains letters";
        break;
      case "email":
        if (!value.trim()) return "Please fill the Email";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        break;
      case "phone":
        if (!value.trim()) return "Please fill the Phone";
        break;
      case "password":
        if (!value) return "Please fill the Password";
        if (
          !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
            value
          )
        ) {
          return "Password must contain min 6 chars, at least 1 number & 1 special character";
        }
        break;
      case "confirmPassword":
        if (!value) return "Please fill the Confirm Password";
        if (value !== form.password) return "Passwords don't match";
        break;
      default:
        break;
    }
    return "";
  };

  // Validate all fields on submit
  const validateAll = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    if (!termsAccepted) newErrors.terms = "You must accept the terms and conditions";
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
        setTermsAccepted(checked);
        if (errors.terms) setErrors({ ...errors, terms: "" });
    } else {
        setForm({ ...form, [name]: value });
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    }
    if (globalError) setGlobalError("");
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
    setIsLoading(true);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setGlobalError("Please fill all fields correctly");
      setIsLoading(false);
      return;
    } else {
      setGlobalError("");
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Registered successfully',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      setIsLoading(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="authContainer">
      {/* Luxury Background Elements */}
      <div className="boutiqueBackground">
        <div className="luxuryPattern"></div>
        <div className="crystalShape1"></div>
        <div className="crystalShape2"></div>
        <div className="crystalShape3"></div>
        <div className="goldAccent1"></div>
        <div className="goldAccent2"></div>

        {/* Floating Shapes */}
        <div className="floatingShapes">
          <div className="shape1"></div>
          <div className="shape2"></div>
          <div className="shape3"></div>
          <div className="shape4"></div>
        </div>

        {/* Animated Particles */}
        <div className="particles">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="particle"
              style={{
                '--duration': particle.duration,
                '--delay': particle.delay,
                left: particle.left
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Auth Card */}
      <div className="authCard">
        <div className="cardHeader">
          <h2 className="cardTitle">Create Account</h2>
        </div>

        <div className="card-body p-3">
          {globalError && (
            <div className={`alert alert-danger ${"alert"}`}>
              <div className="alertContent">
                <FaExclamationCircle className="alertIcon" />
                {globalError}
              </div>
              <div className="alertShine"></div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* First Name & Last Name Row */}
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className={`form-label fw-semibold ${"label"}`}>
                    First Name
                  </label>
                  <div className="inputContainer">
                    <div className={`input-group ${"inputGroup"}`}>
                      <span className={`input-group-text ${"inputIcon"}`}>
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${"formControl"}`}
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                      />
                      <div className="inputUnderline"></div>
                    </div>
                    {errors.firstName && (
                      <div className="errorText">{errors.firstName}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className={`form-label fw-semibold ${"label"}`}>
                    Last Name
                  </label>
                  <div className="inputContainer">
                    <div className={`input-group ${"inputGroup"}`}>
                      <span className={`input-group-text ${"inputIcon"}`}>
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${"formControl"}`}
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                      />
                      <div className="inputUnderline"></div>
                    </div>
                    {errors.lastName && (
                      <div className="errorText">{errors.lastName}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className={`form-label fw-semibold ${"label"}`}>
                Email
              </label>
              <div className="inputContainer">
                <div className={`input-group ${"inputGroup"}`}>
                  <span className={`input-group-text ${"inputIcon"}`}>
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    className={`form-control ${"formControl"}`}
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                  />
                  <div className="inputUnderline"></div>
                </div>
                {errors.email && (
                  <div className="errorText">{errors.email}</div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className={`form-label fw-semibold ${"label"}`}>
                Phone
              </label>
              <div className="inputContainer">
                <div className={`input-group ${"inputGroup"}`}>
                  <span className={`input-group-text ${"inputIcon"}`}>
                    <FaPhone />
                  </span>
                  <input
                    type="tel"
                    className={`form-control ${"formControl"}`}
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 1234567890"
                  />
                  <div className="inputUnderline"></div>
                </div>
                {errors.phone && (
                  <div className="errorText">{errors.phone}</div>
                )}
              </div>
            </div>

            {/* Password */}
            <div className={`mb-4 ${"inputContainer"}`}>
              <label className={`form-label fw-semibold ${"floatingLabel"} ${(form.password || isFocused.password) ? "labelFloating" : ''}`}>
                Password
              </label>
              <div className={`input-group ${"inputGroup"}`}>
                <span className={`input-group-text ${"inputIcon"} ${isFocused.password ? "inputIconFocused" : ''}`}>
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${"formControl"}`}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  placeholder=" "
                />
                <button
                  className={`input-group-text ${"inputIcon"} ${isFocused.password ? "inputIconFocused" : ''}`}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="inputUnderline"></div>
              </div>
              {errors.password && <div className={`text-danger ${"errorText"}`}>{errors.password}</div>}
            </div>

            {/* Confirm Password */}
            <div className={`mb-4 ${"inputContainer"}`}>
              <label className={`form-label fw-semibold ${"floatingLabel"} ${(form.confirmPassword || isFocused.confirmPassword) ? "labelFloating" : ''}`}>
                Confirm Password
              </label>
              <div className={`input-group ${"inputGroup"}`}>
                <span className={`input-group-text ${"inputIcon"} ${isFocused.confirmPassword ? "inputIconFocused" : ''}`}>
                  <FaLock />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-control ${"formControl"}`}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus('confirmPassword')}
                  onBlur={() => handleBlur('confirmPassword')}
                  placeholder=" "
                />
                <button
                  className={`input-group-text ${"inputIcon"} ${isFocused.confirmPassword ? "inputIconFocused" : ''}`}
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="inputUnderline"></div>
              </div>
              {errors.confirmPassword && <div className={`text-danger ${"errorText"}`}>{errors.confirmPassword}</div>}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="termsContainer">
              <input
                type="checkbox"
                id="registerTermsCheck"
                name="terms"
                checked={termsAccepted}
                onChange={handleChange}
                className="termsCheckbox"
              />
              <label htmlFor="registerTermsCheck" className="termsLabel">
                I agree to the <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</Link> and <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.
              </label>
            </div>
            {errors.terms && <div className={`text-danger ${"errorText"} mt-1`}>{errors.terms}</div>}


            {/* Submit Button */}
            <div className="d-grid">
              <button
                type="submit"
                className={`btn ${"btn"} ${isLoading ? "btnLoading" : ''}`}
                disabled={isLoading}
              >
                {isLoading && <span className="spinner"></span>}
                <span className={`${"btnText"} text-light`}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </span>
                <div className="btnShine"></div>
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className={`text-center mt-4 ${"signupText"}`}>
            Already have an account?{" "}
            <Link to="/login" className="authLink">
              Sign In
              <span className="linkUnderline"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
