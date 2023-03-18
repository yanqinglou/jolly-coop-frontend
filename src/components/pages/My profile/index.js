import React, { useEffect, useState } from "react";
import "./style.css";
import API from "../../../utils/API";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const MyProfile = (props) => {
  const imgURL = document.getElementById("basic-url");
  const [user, setUser] = useState({});
  const params = useParams();

  const resetImg = () => {
    imgURL.value = ""
  };

  const getUser = () => {
    API.getUserData(params.id, props.token).then((data) => {
      // console.log(data)
      setUser(data);
    });
  };

  function updatePreview(event) {
    let path = event.target.value;
    console.log(path);
    const img = document.getElementById("image-preview");
    // can also use "this.result"
    img.src = path;
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="myprofile">
      {user.username && <h1>{user.username}'s profile</h1>}
      <br></br>
      <div className="imgUploadDiv">
        <img
          id="image-preview"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          style={{ width: "200px", height: "200px" }}
          class="rounded rounded-circle"
          alt="placeholder"
        />
        <Button variant="outline-secondary" onClick={()=>{resetImg()}}>Reset Img</Button>
        <Form.Control
          id="basic-url"
          aria-describedby="basic-addon3"
          style={{ minWidth: "40vw", marginTop: "8px" }}
          controlId="userName" 
          onChange={(event) => {
            updatePreview(event);
          }}
        />
      </div>
      <div>
        <Form.Group controlId="userName" className="mb-3">
          <Form.Label>User name</Form.Label>
          <Form.Control type="text" placeholder={user.username} />
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
            as="textarea"
            rows={6}
            style={{ width: "40vw", height: "200px" }}
            placeholder="I love to play for honor!!!"
          />
        </Form.Group>
        <Form.Text className="text-muted">
          Tell us about yourself within 250 words.
        </Form.Text>
        <br></br>
        <br></br>
      </div>
      <button className="button-74" type="submit">
        Submit
      </button>
    </div>
  );
};
export default MyProfile;
