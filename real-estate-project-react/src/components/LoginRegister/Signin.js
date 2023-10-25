import React, { useState } from "react";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import showPasswordIconOpen from "../../assets/icons8-eye-24.png";
import showPasswordIconClosed from "../../assets/close-eye.png";

const Signin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordInputType = () => {
    return showPassword ? "text" : "password";
  };

  const getPasswordIcon = () => {
    return showPassword ? showPasswordIconOpen : showPasswordIconClosed;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      setErr("All Fields are necessary");
      return;
    }
    console.log(data);
    setErr("");
    fetch("https://realestatecatalog.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status === "Error") {
          setErr(result.message);
        } else if (result.status === "Failed") {
          setErr(result.message);
        } else {
          setErr("");
          const token = result.message.token;
          console.log(result.message.userdetails);
          console.log(result.message.token);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(result.message.userdetails));
          navigate("/properties");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="sign-in-parent">
      <div className="sign-in-form-container">
        <img
          className="index-logo"
          alt="logo"
          style={{ maxHeight: "100px", maxWidth: "100px", margin: "0 auto" }}
          src={logo}
        />
        <p className="index-p">
          Enter Your Credentials to access your account
        </p>
        <br />
        <form onSubmit={submitHandler}>
          <input
            className="focus"
            type="email"
            placeholder="User Email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            required
          />
          <br />
          <div className="password-input-container">
            <input
              id="login-password"
              className="focus"
              type={getPasswordInputType()}
              placeholder="Password"
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              required
            />
            <img
              src={getPasswordIcon()}
              alt="Show/Hide Password"
              className="password-icon toggle-password-button"
              onClick={togglePasswordVisibility}
            />
          </div>
          <br />
          <button type="submit" className="submit-button">
            Sign In
          </button>
          <br />
          <p style={{ color: "red" }}>{err} </p>
          <Link to="/register" className="signup">
            Sign Up
          </Link>
        </form>
      </div>
      <div>
        <p className="para">
          Don't have an account ?<Link to="/register">SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
