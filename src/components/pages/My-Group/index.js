import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Groupcard from "./Groupcard";
import API from "../../../utils/API";
import { useParams } from "react-router-dom";

const MyGroups = (props) => {
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState(0);

  //get all groups under this user
  const path = window.location.pathname.split('/')[1]
  const findGroup = () => {
    API.isValidToken(localStorage.getItem("token")).then((tokenData) => {
      API.getUserData(tokenData.user.id, localStorage.getItem("token")).then(
        (data) => {
          //save all groups infor under this user
          setGroups(data.Groups);
          setUser(data);
        }
      );
    });
  };

  useEffect(() => {
    findGroup();
  }, []);

  return (
    <div className="classBody">
        <div className="userprofile">
          <img src={user.imgURL} alt="cat-profile-pic" />
          <div className="userinfo">
            <h1 className="name">
              {user.username} 's groups
            </h1>
            <p>-{user.Aboutme}</p>
          </div>
          </div>
      <div className="mygroupscontainer">
        {groups.map((group) => (
          <Groupcard
            name={group.name}
            id={group.id}
            key={group.id}
            token={props.token}
            userId={props.userId}
          />
        ))}
        {/* ?? on how to map within a map for users and for games */}
        {/* how to show the map result */}
      </div>
      <div className="NewGroup">
          <Link to="/findfriend" className="button-74">
            New Group
          </Link>
        </div>
    </div>
  );
};
export default MyGroups;
