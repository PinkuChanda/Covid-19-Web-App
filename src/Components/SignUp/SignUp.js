import React, { useRef } from "react";
import "./SignUp.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Auth from "../Auth/useAuth";

const SignUp = () => {
  const { register, errors, watch } = useForm({});
  const auth = Auth();
  const password = useRef({});
  password.current = watch("password", "");
  //   const onSubmit = async (data, e) => {
  //     console.log(data);
  //     auth.handleSubmit();
  //     e.target.reset();
  //   };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <h2 className="card-title text-center">
              Sign Up <i className="fas fa-user-plus px-2"></i>
            </h2>
            <div className="card-body py-md-4">
              <form onSubmit={auth.handleSignUp}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    name="name"
                    ref={register({
                      required: "This Field is required!",
                    })}
                  />
                  {errors.name && <p>{errors.email.message}</p>}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    ref={register({
                      required: "This Field is required!",
                    })}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                    ref={register({
                      required: "You must specify a password",
                      minLength: {
                        value: 6,
                        message: "Password must have at least 8 characters",
                      },
                    })}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                    placeholder="confirm-password"
                    name="password_repeat"
                    ref={register({
                      validate: (value) =>
                        value === password.current ||
                        "The passwords do not match",
                    })}
                  />
                  {errors.password_repeat && (
                    <p>{errors.password_repeat.message}</p>
                  )}
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <Link to="/signin" className="btn btnclr px-3">
                    Login{" "}
                    <span>
                      <i className="fas fa-sign-in-alt"></i>
                    </span>
                  </Link>

                  <input className="btn signBtn px-3" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
