
import React from "react";

import {
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  CircleCheck,
  Check,
  CircleUserRound
} from "lucide-react";

import useLoginViewModel from "./useLoginViewModel";
import "./Login.css";

const Login = () => {

  const {
    username,
    password,
    showPassword,
    isLoading,
    message,
    errors,
    handleUsernameChange,
    handlePasswordChange,
    togglePassword,
    handleLogin,
    handleForgotPassword,
    handleGuestLogin
  } = useLoginViewModel();

  return (
    <div className="access360-page">

      <div className="access360-card">

        {/* LEFT PANEL */}

        <section className="access360-left">

          {/* BRAND */}

          <div className="access360-brand">

            <h1 className="access360-logo">
              Access<span>360</span>
            </h1>

            <p className="access360-tagline">
              Secure Access. Anytime. Anywhere.
            </p>

          </div>

          {/* SECURITY LOGO */}

          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>

          {/* FEATURE LIST */}

          <div className="access360-feature-list">

            {/* SECURE */}

            <div className="access360-feature">

              <div className="access360-feature-icon">
                <LockKeyhole
                  size={19}
                  strokeWidth={2.5}
                />
              </div>

              <div className="access360-feature-content">

                <h3>Secure</h3>

                <p>
                  Your data is protected
                  <br />
                  with advanced security.
                </p>

              </div>

            </div>

            {/* RELIABLE */}

            <div className="access360-feature">

              <div className="access360-feature-icon">
                <CircleCheck
                  size={19}
                  strokeWidth={2.8}
                />
              </div>

              <div className="access360-feature-content">

                <h3>Reliable</h3>

                <p>
                  Access your systems
                  <br />
                  anytime, anywhere.
                </p>

              </div>

            </div>

            {/* SIMPLE */}

            <div className="access360-feature access360-feature-last">

              <div className="access360-feature-icon">
                <Check
                  size={22}
                  strokeWidth={3.5}
                />
              </div>

              <div className="access360-feature-content">

                <h3>Simple</h3>

                <p>
                  Seamless login
                  <br />
                  experience.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* RIGHT PANEL */}

        <section className="access360-right">

          {/* DOT PATTERN */}

          <div className="access360-dot-pattern"></div>

          <div className="access360-form-container">

            {/* HEADING */}

            <div className="access360-heading">

              <h2>Welcome Back</h2>

              <p>Sign in to your account</p>

            </div>


            {/* LOGIN FORM */}

            <form
              className="access360-form"
              onSubmit={handleLogin}
              noValidate
            >

              {/* USERNAME */}

              <div className="access360-form-group">

                <label htmlFor="access360-username">
                  Username
                </label>

                <div
                  className={`access360-input-box ${
                    errors.username
                      ? "access360-input-error"
                      : ""
                  }`}
                >

                  <UserRound
                    className="access360-input-icon"
                    size={20}
                  />

                  <input
                    id="access360-username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) =>
                      handleUsernameChange(e.target.value)
                    }
                    placeholder="Enter your username"
                    autoComplete="username"
                  />

                </div>

                {errors.username && (
                  <span className="access360-validation-error">
                    {errors.username}
                  </span>
                )}

              </div>


              {/* PASSWORD */}

              <div className="access360-form-group">

                <label htmlFor="access360-password">
                  Password
                </label>

                <div
                  className={`access360-input-box ${
                    errors.password
                      ? "access360-input-error"
                      : ""
                  }`}
                >

                  <LockKeyhole
                    className="access360-input-icon"
                    size={19}
                  />

                  <input
                    id="access360-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) =>
                      handlePasswordChange(e.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="access360-password-button"
                    onClick={togglePassword}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

                {errors.password && (
                  <span className="access360-validation-error">
                    {errors.password}
                  </span>
                )}

              </div>


              {/* FORGOT PASSWORD */}

              <div className="access360-forgot-wrapper">

                <button
                  type="button"
                  className="access360-forgot-button"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>

              </div>


              {/* MESSAGE */}

              {message && (
                <div
                  className="access360-message"
                  role="alert"
                >
                  {message}
                </div>
              )}


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="access360-login-button"
                disabled={isLoading}
              >

                {isLoading ? "Logging In..." : "Log In"}

              </button>


              {/* DIVIDER */}

              <div className="access360-divider">

                <div></div>

                <span>or</span>

                <div></div>

              </div>


              {/* GUEST LOGIN */}

              <button
                type="button"
                className="access360-guest-button"
                onClick={handleGuestLogin}
              >

                <CircleUserRound
                  size={20}
                  strokeWidth={2.5}
                />

                <span>Login as a Guest</span>

              </button>

            </form>

          </div>

        </section>

      </div>

    </div>
  );
};

export default Login;
