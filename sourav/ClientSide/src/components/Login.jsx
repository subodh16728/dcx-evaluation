import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()


  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  console.log("data", data)


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/user/login', {
        method: 'post',
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify(data)
      });

      const dataResponse = await response.json();
      console.log(dataResponse);

      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
      if (!dataResponse.success) {
        toast.error(dataResponse.message);
      }

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        console.log(dataResponse.token);
        localStorage.setItem('token', dataResponse.token);
        navigate('/');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while processing your request.');
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container shadow">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter your Email"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={data.password}
              placeholder="Enter your password"
              onChange={handleOnChange}

            />
            <i
              className={`password-toggle ${showPassword ? 'fas fa-eye' : 'fas fa-eye-slash' }`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </div>
        <button type="submit" className="btn-sign">Login</button>
        <p>Don't have an account?<a href="#"> <NavLink to="/signup" className="link"> Sign up here</NavLink></a></p>
      </form>
    </div>
  );
};

export default Login;
