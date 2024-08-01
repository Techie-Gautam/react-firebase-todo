import React, { useState } from "react";
import {
  loginUsingEmailAndPassword,
  registerUsingEmailAndPassword,
} from "../firebase";

function Registration({ formData, setFormData, handleRegister }) {
  return (
    <div className="register">
      <div className="input-wrapper">
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />
      </div>
      <button className="auth-button" onClick={handleRegister}>Register</button>
    </div>
  );
}

function Login({ formData, setFormData, handleLogin }) {
  return (
    <div className="login">
      <div className="input-wrapper">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />
      </div>
      <button className="auth-button" onClick={handleLogin}>Login</button>
    </div>
  );
}

const UnAuth = () => {
  const [isLoginView, setIsLoginView] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  function handleRegister() {
    const { name, email, password } = registerFormData;
    registerUsingEmailAndPassword(name, email, password);
  }

  function handleLogin() {
    const { email, password } = loginFormData;
    loginUsingEmailAndPassword(email, password);
  }

  return (
    <div className="auth-container">
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${!isLoginView && "active"}`}
          onClick={() => setIsLoginView(false)}
        >
          Register
        </button>
        <button
          className={`toggle-button ${isLoginView && "active"}`}
          onClick={() => setIsLoginView(true)}
        >
          Login
        </button>
      </div>
      {isLoginView ? (
        <Login
          formData={loginFormData}
          setFormData={setLoginFormData}
          handleLogin={handleLogin}
        />
      ) : (
        <Registration
          formData={registerFormData}
          setFormData={setRegisterFormData}
          handleRegister={handleRegister}
        />
      )}
    </div>
  );
};

export default UnAuth;
