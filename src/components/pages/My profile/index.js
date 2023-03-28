import React, { useEffect, useState } from "react";
import "./style.css";
import API from "../../../utils/API";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const MyProfile = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setUser] = useState({});
  const [username, setusername] = useState({});
  const [imgURL, setimgURL] = useState({});
  const [Aboutme, setAboutme] = useState({});
  let navigate = useNavigate();

  const params = useParams();

  const resetImg = () => {
    const imgLink = document.getElementById("basic-url");
    imgLink.value = "";
  };

  const getUser = () => {
    API.getUserData(params.id, props.token).then((data) => {
      // console.log(data)
      setUser(data);
      setusername(user.username);
      setimgURL(user.imgURL);
      setAboutme(user.Aboutme);
    });
  };

  function updatePreview(event) {
    let path = event.target.value;
    const img = document.getElementById("image-preview");
    // can also use "this.result"
    img.src = path;
    handleFormChange(event);
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "imgURL":
        setimgURL(value);
        break;
      case "username":
        setusername(value);
        break;
      case "Aboutme":
        setAboutme(value);
        break;

      default:
        break;
    }
  };

  const handleFormSubmit = (e) => {
    setShow(true);
    e.preventDefault();
    const userObj = {
      username: username,
      imgURL: imgURL,
      Aboutme: Aboutme,
    };
    API.updateUser(params.id, userObj, localStorage.getItem("token")).then(
      (data) => {
      }
    );
  };

  const returnHome = () => {
    let path = `/home/${user.id}`;
    navigate(path);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="myprofile">
      {user.username && <h1>{user.username}'s profile</h1>}
      <br></br>
      <div className="imgUploadDiv">
        {imgURL?
          <img
            id="image-preview"
            src={imgURL}
            style={{ width: "200px", height: "200px" }}
            className="rounded rounded-circle"
            // alt="placeholder"
          />
         : 
          <img
            id="image-preview"
            src="https://cdn-icons-png.flaticon.com/512/668/668709.png"
            style={{ width: "200px", height: "200px" }}
            class="rounded rounded-circle"
            // alt="placeholder"
          />
        }
        <Button
          variant="outline-secondary"
          onClick={() => {
            resetImg();
          }}
        >
          Reset Img
        </Button>
      </div>
      <form onSubmit={handleFormSubmit}>
        <Form.Control
          name="imgURL"
          id="basic-url"
          aria-describedby="basic-addon3"
          style={{ minWidth: "40vw", marginTop: "8px", marginBottom: "8px" }}
          controlId="userName"
          placeholder={user.imgURL}
          onChange={(event) => {
            updatePreview(event);
          }}
        />
        <Form.Group controlId="userName" className="mb-3">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            placeholder={user.username}
            name="username"
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder={user.email} disabled />
          <Form.Text className="text-muted">
            This the email used in signing up. Hence, you cannot update it.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="userDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="Aboutme"
            as="textarea"
            rows={6}
            style={{ width: "40vw", height: "200px" }}
            placeholder="I love to play for honor!!!"
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Text className="text-muted">
          Tell us about yourself within 250 words.
        </Form.Text>
        <br></br>
        <br></br>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Profile update</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your profile has been updated!</Modal.Body>
          <Modal.Footer>
            <button
              className="button-74"
              onClick={handleClose}
              style={{ backgroundColor: "#5465FF" }}
            >
              Close
            </button>
            <button className="button-74" onClick={returnHome}>
              My home
            </button>
          </Modal.Footer>
        </Modal>
     
      </form>
      <button className="button-74" type="submit" onClick={handleFormSubmit}>
          Submit
        </button>
    </div>
  );
};
export default MyProfile;
