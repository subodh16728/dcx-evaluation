import { useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../Service/userApiService";

const SignUp = () => {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const signUpUserInfo = async () => {
    try {
      let receivedInfo = await signUpUser(user);
      navigate("/signin");
    } catch (err) {
      console.log(err);
      setErrRes(err);
    }
  };

  const [errors, setErrors] = useState({});
  const [errRes, setErrRes] = useState(null);

  const navigate = useNavigate();

  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
      .required(),
    password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Passwords must match" }),
  });

  const validate = () => {
    const errors = {};
    const { error } = schema.validate(user, {
      abortEarly: false,
    });
    console.log("Error", error);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    const validationErrors = validate();

    // Set the errors state after the validation
    setErrors(validationErrors);

    // Check if there are validation errors
    if (validationErrors) return;

    // Proceed with form submission
    await signUpUserInfo();
  };

  return (
    <>
      <div
        style={{
          minHeight: "91vh",
          backgroundImage: 'url("images/register.jpg")',
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
          <div className=" shadow p-3 mb-2 bg-body-tertiary rounded my-auto">
            <p className="h4 text-white bg-secondary p-2 text-center">
              Register
            </p>

            <form
              onSubmit={handleSubmit}
              className=" border border-secondary p-3 "
            >
              <div className="mb-2">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  id="username"
                  type="username"
                  className="form-control"
                />
                {errors && (
                  <small className="text-danger">{errors.username}</small>
                )}
              </div>
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
              <div className="mb-2">
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
                />
                {errors && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Re-Enter your password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                />
                {errors && (
                  <small className="text-danger">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>
              <div className="d-grid gap-2">
                <input type="submit" className="btn btn-secondary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
