import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import API from "../../utils/API"

const Navbar = (props) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // API.getUserData(props.userId, props.token).then((data) => {
  //   setUser(data)
  // });

  return (
    <div className="Navbar">
      <div className="titlecontainer">
        <h1 className="jollycoopfont">J </h1>
        <h1 className="jollycoopfont">0</h1>
        <h1 className="jollycoopfont">L</h1>
        <h1 className="jollycoopfont">L</h1>
        <h1 className="jollycoopfont">Y</h1>
        <h1 className="jollycoopfont">-</h1>
        <h1 className="jollycoopfont jollyanimation1">C</h1>
        <h1 className="jollycoopfont jollyanimation2">0</h1>
        <h1 className="jollycoopfont jollyanimation3">0</h1>
        <h1 className="jollycoopfont jollyanimation1">P</h1>
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/771/771210.png"
        onClick={handleShow}
        style={{
          width: "60px",
          height: "60px",
          position: "relative",
          top: "6px",
        }}
      />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Body className="offcanvasprofile">
            {props.user.imgURL?<img
              id="image-preview"
              src={props.user.imgURL}
              style={{ width: "150px", height: "150px" }}
              className="rounded rounded-circle"
              alt="placeholder"
            />:<img
            id="image-preview"
            src={"https://cdn-icons-png.flaticon.com/512/668/668709.png"}
            style={{ width: "150px", height: "150px" }}
            className="rounded rounded-circle"
            alt="placeholder"
          />}
            <br></br>
            <label>
              <h3>{props.userName}</h3>
            </label>
          </Offcanvas.Body>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvasBody">
          <Link to="/findgames" className="offcanvasBodyLink1  example_e">
            Find Game
          </Link>
          {props.isLoggedIn ? (
            <>
              <Link to={`/home/${props.userId}`} className="offcanvasBodyLink3 example_e">
                Home
              </Link>
              <Link to="/mylist" className="offcanvasBodyLink2 example_e">
                My List{" "}
              </Link>
              <Link to="/mygroup" className="offcanvasBodyLink4 example_e">
                My Group{" "}
              </Link>
              <Link
                to={`/myprofile/${props.userId}`}
                className="offcanvasBodyLink1 example_e"
              >
                My Profile
              </Link>
              <Link onClick={props.logout} className="offcanvasBodyLink2 example_e">
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login" className="offcanvasBodyLink3 example_e">
              Login
            </Link>
          )}

        </Offcanvas.Body>
        <Offcanvas.Title className="jollycoopfont">
          <div className="offcanvasFooter">
            <h4>J</h4>
            <h4>O</h4>
            <h4>L</h4>
            <h4>L</h4>
            <h4>Y</h4>
            <h4>
              <strong>-</strong>
            </h4>
            <h4 className="jollycoopfont jollyanimation1">C</h4>
            <h4 className="jollycoopfont jollyanimation2">O</h4>
            <h4 className="jollycoopfont jollyanimation3">O</h4>
            <h4 className="jollycoopfont jollyanimation1">P</h4>
          </div>
        </Offcanvas.Title>
      </Offcanvas>
    </div>
  );
};

export default Navbar;
