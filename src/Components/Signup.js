import React, { useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setButtonDisabled(true);

    if (password !== confirmPassword) {
      setError("Podano dwa różne hasła");
      setButtonDisabled(false);
      formRef.current.reset();
      return;
    }

    try {
      await signup(email, password);
    } catch (e) {
      setError(e.message);
      formRef.current.reset();
      return;
    } finally {
      setButtonDisabled(false);
    }

    navigate("/account");
  };

  return (
    <div>
      <form
        // style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   flexDirection: "column",
        //   minHeight: "100vh",
        // }}
        className="signup-section"
        ref={formRef}
      >
        <h1>Register</h1>
        {error}
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type={"email"}
          className="form-input"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          name="email"
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type={"password"}
          className="form-input"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
          name="password"
        />
        <label htmlFor="confirmPassword" className="form-label">
          Confirm password
        </label>
        <input
          type={"password"}
          className="form-input"
          onChange={(e) => {
            setConfirmPassword(e.currentTarget.value);
          }}
          name="confirmPassword"
        />
        <button disabled={buttonDisabled} type="submit" onClick={handleSubmit}>
          Sign up
        </button>
        <h6>
          Already have an account? <NavLink to="/login"> Click here</NavLink>
        </h6>
      </form>
    </div>
  );
};

export default Signup;
