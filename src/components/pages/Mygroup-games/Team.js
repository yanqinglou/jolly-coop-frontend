import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import Sendemail from "./Email";
import Addfriend from "./Addfriend";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./style.css";

const Teamcard = (props) => {
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState();
  const [show, setShow] = useState(false);
  const [isOwner, setisOwner] = useState(false);
  const [change, setChange] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click + button below to invite more friends in the group
    </Tooltip>
  );

  const fetchGroupMembers = () => {
    API.getOneGroup(props.groupId, localStorage.getItem("token")).then(
      (data) => {
        setUsers(data.Users);
        setGroup(data);
        if (data.OwnerId === props.userId) {
          setisOwner(true);
        }
      }
    );
  };
  useEffect(() => {
    fetchGroupMembers();
  }, [change]);

  return (
    <section className="team">
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          {isOwner ? (
            <Form.Text className="text-muted">Your Team Members</Form.Text>
          ) : (
            <Form.Text className="text-muted">Team Members</Form.Text>
          )}
        </OverlayTrigger>
        <div className="section-container">
          {users.map((user) => (
            <div className="profile example_e">
              <img src={user.imgURL} alt="cat-profile-pic" />
              <div className="userinfo">
                <p className="name">
                  Username:
                  {user.username}
                </p>
                <p className="Aboutme">
                  About me:
                  {user.Aboutme}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="offcanvas2">
        <Sendemail users={users} group={group} username={props.username} />
        <Addfriend
          users={users}
          groupId={props.groupId}
          token={props.token}
          change={change}
          setChange={setChange}
          userId={props.userId}
          username={props.username}
        />
      </div>
    </section>
  );
};

export default Teamcard;
