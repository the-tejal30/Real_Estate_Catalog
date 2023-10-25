import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import showPasswordIconOpen from "../../assets/icons8-eye-24.png"; // Open eye icon
import showPasswordIconClosed from "../../assets/close-eye.png"; // Closed eye icon

const Signup = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getPasswordInputType = (field) => {
    return field === "password" ? (showPassword ? "text" : "password") : (showConfirmPassword ? "text" : "password");
  };

  const getPasswordIcon = (field) => {
    return field === "password" ? (showPassword ? showPasswordIconOpen : showPasswordIconClosed) : (showConfirmPassword ? showPasswordIconOpen : showPasswordIconClosed);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "" || confirmPassword === "") {
      setErr("All Fields are necessary");
      return;
    } else if (confirmPassword === data.password) {
      setErr("");
      if (data.password.length < 7) {
        setErr("Password length should be a minimum of 6 characters");
        return;
      }
      fetch("https://realestatecatalog.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((SucessMessage) => {
          console.log("Signup successful:", SucessMessage);
          setData({
            email: "",
            password: "",
          });
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status === 409)
            setErr("User already exists with the given email. Try log in");
          else setErr('Something"s wrong, Try again');
          console.log(err);
        });
    } else {
      setErr("Password should match");
    }
  };

  return (
    <div className="sign-up-parent">
      <div className="sign-up-form-container">
        <center>
          <img className="index-logo" alt="logo" style={{ maxHeight: "100px", maxWidth: "100px" }} src={logo} />
          <p>Create a New Account</p>
          <br />
          <form onSubmit={submitHandler}>
            <input
              className="focus"
              type="email"
              name="email"
              placeholder="Email id"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
            <br />
            <div className="password-input-container">
              <input
                className="focus"
                type={getPasswordInputType("password")}
                name="password"
                id="register-password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                  setErr("");
                }}
                minLength={6}
              />
              <img
                src={getPasswordIcon("password")}
                alt="Show/Hide Password"
                className="password-icon toggle-password-button"
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className="password-input-container" style={{marginBottom:"60px"}}>
              <input
                className="focus password-icon"
                type={getPasswordInputType("confirmPassword")}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErr("");
                }}
              />
              <img
                src={getPasswordIcon("confirmPassword")}
                alt="Show/Hide Password"
                className="password-icon toggle-password-button"
                onClick={togglePasswordVisibility}
              />
            </div>
            <br />
            <button type="submit" className="submit-button">
              Sign Up
            </button>
            <p style={{ color: "red" }}>{err}</p>
          </form>
        </center>
      </div>
      <p className="para">
        <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default Signup;
