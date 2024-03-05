import React, { useState } from 'react';
import { toast } from 'react-toastify'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const [data, setData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmpassword: ""
  })
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

    if (data.password !== data.confirmpassword) {
      toast.error("Password and confirm password must be same !");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataResponse = await response.json();
      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        setData({
          name: "",
          email: "",
          gender: "",
          password: "",
          confirmPassword: ""
        });
        navigate('/login');
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
      toast.error("An error occurred while processing your request");
    }

  };



  return (
    <div className="signup-container shadow">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={data.email}
            name="email" id="email"
            placeholder='example@gmail.com'
            onChange={handleOnChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              value={data.password}
              onChange={handleOnChange}
              className="form-control"
              placeholder="Enter your password"
            />
            <i
              className={`password-toggle ${showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          <label>Confirm Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name='confirmpassword'
              id='confirmpassword'
              value={data.confirmpassword}
              onChange={handleOnChange}
              className="form-control"
              placeholder="Confirm your password"
            />

          </div>
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={data.name.charAt(0).toUpperCase() + data.name.slice(1)}
            name="name" id="name"
            placeholder='Enter your name'
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={data.gender}
            onChange={handleOnChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button className="btn-sign" >Sign-up</button>
        <p>Already have an account? <NavLink to="/login" className="link"> Login here</NavLink></p>
      </form>
    </div>
  );
};

export default Signup;
