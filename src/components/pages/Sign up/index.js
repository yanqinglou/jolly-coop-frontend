import React, { useState } from "react";
import "./style.css";
import API from "../../../utils/API";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import nintendo from "../../../images/nintendo-logo.png";
import pc from "../../../images/pc-logo.png";
import xbox from "../../../images/xbox-logo.png";
import ps from "../../../images/ps-logo.png";

export const Signup = (props) => {
  const [signupUsername, setsignupUsername] = useState("");
  const [signupEmail, setsignupEmail] = useState("");
  const [signupPassword, setsignupPassword] = useState("");
  let navigate = useNavigate();

  const handleFormChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    switch (name) {
      case "signupUsername":
        setsignupUsername(value);
        break;
      case "signupEmail":
        setsignupEmail(value);
        break;
      case "signupPassword":
        setsignupPassword(value);
        break;

      default:
        break;
    }
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      email: signupEmail,
      password: signupPassword,
      username: signupUsername,
    };
    API.signup(userObj).then((data) => {
      console.log(data);
      if (data.token) {
        props.setToken(data.token);
        props.setIsLoggedIn(true);
        props.setUserId(data.user.id);
      }

      localStorage.setItem("token", data.token);
      setsignupUsername("");
      setsignupEmail("");
      setsignupPassword("");

      let path = `/home/${data.user.id}`;
      navigate(path);
    });
  };

  // const routeChange= () =>{
  //     let path = "/";
  //     navigate(path);
  //   }

  return (
    <div className="signupBody">
      <div className="signupBox">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div class="signupTitle">
            <h1 className="jollycoop2 jollyanimation1">J</h1>
            <h1 className="jollycoop2 jollyanimation2">O</h1>
            <h1>L</h1>
            <h1>L</h1>
            <h1>Y</h1>
          </div>
          <h1>
            <strong>-</strong>

          </h1>
          <br></br>
          <div class="signupTitle">
            <h1>C</h1>
            <h1>O</h1>
            <h1 className="jollycoop2 jollyanimation3">O</h1>
            <h1 className="jollycoop2 jollyanimation1">P</h1>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around"}}>
          {/* <img style={{ width: "40px", height: "40px" }} src={nintendo}></img>
          <img style={{ width: "40px", height: "40px" }} src={pc}></img>
          <img style={{ width: "40px", height: "40px" }} src={xbox}></img>
          <img style={{ width: "40px", height: "40px" }} src={ps}></img> */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/771/771210.png"
              style={{ width: "50px", height: "50px", position:"relative",top:"35px"}}
            ></img>
        </div>
      </div>
      <div className="Signup">
          <form onSubmit={handleSignupSubmit}>
            <Form.Group controlId="userName" className="mb-3">
              <Form.Label htmlFor="signupUsername">Username:</Form.Label>
              <Form.Control
                type="text"
                name="signupUsername"
                value={signupUsername}
                onChange={handleFormChange}
              />{" "}
              <Form.Text className="text-muted">
                User name must be between 3 to 10 characters.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="userName" className="mb-3">
              <Form.Label htmlFor="signupEmail">Email:</Form.Label>
              <Form.Control
                type="text"
                name="signupEmail"
                value={signupEmail}
                onChange={handleFormChange}
                placeholder="your email address"
              />{" "}
              <Form.Text className="text-muted">
                This email will be used for future contact.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="userName" className="mb-3">
              <Form.Label htmlFor="signupPassword">Password:</Form.Label>
              <Form.Control
                type="password"
                name="signupPassword"
                value={signupPassword}
                onChange={handleFormChange}
              />
              <Form.Text className="text-muted">
                * Password has to be at least 8 digits
              </Form.Text>
            </Form.Group>
          </form>
          <button className="button-74" onClick={handleSignupSubmit}>
            Signup
          </button>

      </div>
    </div>
  );
};

export default Signup;
