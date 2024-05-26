import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { signup } from "../../auth/auth";
import "../login/login.css";

function Register() {
  const navigate = useNavigate();

  const handleSubmission = async (values) => {
    try {
      const res = await signup(values);

      if (res && res.status === 200) {
        console.log("res", res);
        navigate("/login");
      }
    } catch (error) {
      if (error.message === "User already exists. Please login.") {
        navigate("/login", { state: { message: error.message } });
      } else {
        console.error(error);
      }
    }
  };
  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(5, "Min 5 character long")
      .max(15, "should not exceed 15 characters")
      .required("Required"),
    lastName: Yup.string()
      .min(5, "Min 5 character long")
      .max(15, "should not exceed 15 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("Required"),
    confirmPassword: Yup.string()
      .label("confirm password")
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <div>
      <div>
        <main className="sign-up">
          <div className="sign-up__container">
            <div className="sign-up__image">
              <img
                src={require("../../assests/login-1.jpg")}
                alt="login"
                className="login-image"
              />
            </div>
            <div className="sign-up__content">
              <header className="sign-up__header">
                <h1 className="sign-up__title">Sign up</h1>
                <p className="sign-up__descr">Welcome, Sign up your account.</p>
              </header>
              <div className="sign-up__form form">
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  validationSchema={SignUpSchema}
                  onSubmit={(values) => {
                    handleSubmission(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form method="post">
                      <div className="form__row form__row--two">
                        <div className="input form__inline-input">
                          <div className="input__container">
                            <Field
                              name="firstName"
                              className="input__field"
                              id="first-name"
                              placeholder="First Name"
                            />
                            <label
                              className="input__label"
                              htmlFor="first-name"
                            >
                              First Name
                            </label>
                            {errors.firstName && touched.firstName ? (
                              <span className="error-sign">
                                {errors.firstName}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="input form__inline-input">
                          <div className="input__container">
                            <Field
                              name="lastName"
                              className="input__field"
                              id="last-name"
                              placeholder="Last Name"
                            />
                            <label className="input__label" htmlFor="last-name">
                              Last Name
                            </label>
                            {errors.lastName && touched.lastName ? (
                              <span className="error-sign">
                                {errors.lastName}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="input">
                          <div className="input__container">
                            <Field
                              name="email"
                              className="input__field"
                              id="email"
                              placeholder="Email"
                              type="email"
                            />
                            <label className="input__label" htmlFor="email">
                              Email
                            </label>
                            {errors.email && touched.email ? (
                              <span className="error-sign">{errors.email}</span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="input">
                          <div className="input__container">
                            <Field
                              name="password"
                              className="input__field"
                              id="password"
                              placeholder="Password"
                              type="password"
                            />
                            <label className="input__label" htmlFor="password">
                              Password
                            </label>
                            {errors.password && touched.password ? (
                              <span className="error-sign">
                                {errors.password}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="input">
                          <div className="input__container">
                            <Field
                              name="confirmPassword"
                              className="input__field"
                              id="confirm-password"
                              placeholder="Confirm Password"
                            />
                            <label
                              className="input__label"
                              htmlFor="confirm-password"
                            >
                              Confirm password
                            </label>
                            {errors.confirmPassword &&
                            touched.confirmPassword ? (
                              <span className="error-sign">
                                {errors.confirmPassword}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="form__row">
                        <div className="component component--primary form__button">
                          <button
                            className="btn btn--regular"
                            disabled=""
                            id="sign-up-button"
                            tabindex="0"
                            type="submit"
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                      <div className="form__row sign-up__sign">
                        Already have an account? &nbsp;
                        <Link to="/login" className="link">
                          Login.
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;
