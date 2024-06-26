import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../auth/auth";

import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await signin(email, password);
      if (res.valid === true && res.status === 200) {
        setIncorrect(false);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log("User already exists. Please login.");
      } else {
        console.error("An error occurred during login:", error);
        setIncorrect(true);
      }
    }
  };
  return (
    <div>
      <main class="sign-up">
        <div class="sign-up__container">
          <div class="sign-up__image">
            <img
              src={require("../../assests/login-1.jpg")}
              alt="login"
              className="login-image"
            />
          </div>
          <div class="sign-up__content">
            <header class="sign-up__header">
              <h1 class="sign-up__title">Login</h1>
              <p class="sign-up__descr">Welcome, Please login your account.</p>
            </header>
            <div class="sign-up__form form">
              <div class="form__row">
                <div class="input">
                  <div class="input__container">
                    <input
                      class="input__field"
                      id="email"
                      placeholder="Email"
                      required
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label class="input__label" for="email">
                      Email
                    </label>
                  </div>
                </div>
              </div>
              <div class="form__row">
                <div class="input">
                  <div class="input__container">
                    <input
                      class="input__field"
                      id="password"
                      placeholder="Password"
                      required
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label class="input__label" for="password">
                      Password
                    </label>
                  </div>
                </div>
                {incorrect ? (
                  <span className="err">Invalid Username or password</span>
                ) : (
                  ""
                )}
              </div>

              <div class="form__row">
                <div class="component component--primary form__button">
                  <button
                    class="btn btn--regular"
                    disabled=""
                    id="sign-up-button"
                    tabindex="0"
                    onClick={() => handleSubmit()}
                  >
                    Login
                  </button>
                </div>
              </div>
              <div class="form__row sign-up__sign">
                Don't have an account? &nbsp;
                <Link to="/register" className="link">
                  Sign up.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
