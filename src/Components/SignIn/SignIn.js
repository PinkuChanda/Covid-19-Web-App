import React from "react";
import "./SignIn.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Auth from "../Auth/useAuth";

const SignIn = () => {
  const { register, errors } = useForm({});
  const auth = Auth();
  //   const onSubmit = async (data, e) => {
  //     console.log(data);
  //     e.target.reset();
  //   };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <h2 className="card-title text-center">
              Sign In <i className="fas fa-sign-in-alt"></i>
            </h2>
            <div className="card-body py-md-4">
              <form onSubmit={auth.onSubmit}>
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

                <div className="d-flex flex-row align-items-center justify-content-between">
                  <Link to="/signup" className="btn btnclr px-3">
                    Sign Up{" "}
                    <span>
                      <i className="fas fa-user-plus"></i>
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

export default SignIn;
