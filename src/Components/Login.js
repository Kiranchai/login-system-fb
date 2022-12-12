import React, { useRef, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef();
  const { signin } = useAuth();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(email, password);
    } catch {
      formRef.current.reset();
      return;
    }
    navigate("/account");
  };

  return (
    <>
      {currentUser.isSignedIn ? (
        <Navigate to="/account" />
      ) : (
        <main className="main-container">
          <section className="form-section">
            <div className="form-wrapper">
              <NavLink to="/">Home</NavLink>
              <h1 className="form-header">Welcome back</h1>
              <span className="form-span">Please enter your credentials.</span>

              <form className="login-form" ref={formRef}>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  placeholder="Enter your email"
                  type="email"
                  className="form-input"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                  }}
                />
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  placeholder="•••••••••"
                  type="password"
                  className="form-input"
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                />

                <button
                  type="submit"
                  className="submit-btn"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span className="form-span">
                    Need an account?{" "}
                    <NavLink to="/register"> Click here</NavLink>
                  </span>
                </div>
              </form>
            </div>
          </section>
          <section className="image-section">
            <div className="circle"></div>
            <div className="blur-panel"></div>
          </section>
        </main>
      )}
    </>
  );
};

export default Login;
