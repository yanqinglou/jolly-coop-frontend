import React, { useState } from "react";
import "./style.css";
import API from "../../../utils/API";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

export const Login = (props) => {
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(true);
  let navigate = useNavigate();

  const handleFormChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    switch (name) {
      case "loginEmail":
        setloginEmail(value);
        break;
      case "loginPassword":
        setloginPassword(value);
        break;

      default:
        break;
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      email: loginEmail,
      password: loginPassword,
    };
    API.login(userObj).then((data) => {
      console.log(data);
      if (data.token) {
        props.setToken(data.token);
        props.setIsLoggedIn(true);
        props.setUserId(data.user.id);
        props.setUserName(data.user.username);
        localStorage.setItem("token", data.token);

        setloginEmail("");
        setloginPassword("");
        let path = `/home/${data.user.id}`;
        navigate(path);
      } else {
        setErrorMsg(false);
      }
    });
  };

  return (
    <div className="loginBody">
      <div className="signupBox">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="signupTitle">
            <h1>J</h1>
            <h1>O</h1>
            <h1>L</h1>
            <h1>L</h1>
            <h1>Y</h1>
          </div>
          <h1>
            <strong>-</strong>
          </h1>
          <br></br>
          <div className="signupTitle">
            <h1 className="jollycoop2 jollyanimation1">C</h1>
            <h1 className="jollycoop2 jollyanimation2">O</h1>
            <h1 className="jollycoop2 jollyanimation3">O</h1>
            <h1 className="jollycoop2 jollyanimation1">P</h1>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/771/771210.png"
              style={{
                width: "50px",
                height: "50px",
                position: "relative",
                top: "35px",
              }}
            ></img>
          </div>
        </div>
      </div>
      <div className="loginForm">
        <h3>Login </h3>
        {!errorMsg ? (
          <p className="error" id="errorMsg">
            Your username or password is wrong!
          </p>
        ) : null}
        <div className="Login">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="loginEmail">Email:</label>
            <Form.Control
              type="text"
              name="loginEmail"
              value={loginEmail}
              onChange={handleFormChange}
            />{" "}
            <label htmlFor="loginPassword">Password:</label>
            <Form.Control
              type="password"
              name="loginPassword"
              value={loginPassword}
              onChange={handleFormChange}
            />
            <br></br>
            <p>
              Don't have an account? <a href="/signup">Signup</a> here
            </p>
            <button className="button-74" onClick={handleFormSubmit}>
              Login
            </button>
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
};
