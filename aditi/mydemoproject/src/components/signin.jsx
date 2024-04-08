import { Link } from "react-router-dom";
import React, { useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../Service/userApiService";
import {toast} from "react-toastify";

function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const signInUserInfo = async () => {
    try {
      let receivedInfo = await signInUser(user);
      if (receivedInfo.success) {
        if(localStorage.getItem("token")){
          toast.success(localStorage.getItem('name')+ " already logged in");
          navigate('/');
        }else{
          toast.success(receivedInfo.message);
          localStorage.setItem('token', receivedInfo.token);
          localStorage.setItem('userId', receivedInfo.id);
          localStorage.setItem('name', receivedInfo.name);
          navigate('/');
        }
       
      }
    } catch (err) {
      console.log(err);
      setErrRes(err);
    }
  };

  const [errors, setErrors] = useState({});
  const [errRes, setErrRes] = useState(null);

  const navigate = useNavigate();

  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
      .required(),
    password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  });

  const validate = () => {
    const errors = {};
    const { error } = schema.validate(user, {
      abortEarly: false,
    });

    if (error) {
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (event) => {
    let tempUser = { ...user };
    tempUser[event.target.name] = event.target.value;
    setUser(tempUser);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (validationErrors) return;

    signInUserInfo();
    
  };

  return (
    <>
      <div
        style={{
          minHeight: "91vh",
          backgroundImage: 'url("/images/login.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="w-25 mx-auto mt-3">
          {errRes && (
            <div className="alert alert-danger" role="alert">
              {errRes.response.data.message}
            </div>
          )}
          <div className=" shadow p-3 mb-5 bg-body-tertiary rounded my-auto">
            <p className="h4 text-white bg-secondary p-2 text-center">Login</p>
            <form
              className=" border border-secondary p-3  "
              onSubmit={handleSubmit}
            >
              <div className="mb-2">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  id="email"
                  type="email"
                  className="form-control"
                />
                {errors && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  id="password"
                  type="password"
                  className="form-control"
                  autoComplete="current-password"
                />
                {errors && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>
              <div className="d-grid gap-2">
                <input type="submit" className="btn btn-secondary" />
              </div>
              <div className="m-2">
                <p>
                  <small> Don't have an account? </small>
                  <Link to="/signup" className="link">
                    <b>Signup</b>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
