import React, { useEffect, useState } from "react";
import "./style.css";
import API from "../../../utils/API";
import { useParams } from "react-router-dom";
import Groupcard from "./Groupcard.js";
// import  ImgCarousel  from "./ImgCarousel.js"

function Home(props) {
  const params = useParams();
  console.log(params);
  const [user, setUser] = useState({});
  const [year, setYear] = useState();

  const fetchUser = () => {
    API.getUserData(params.id, props.token).then((data) => {
      setUser(data);
      const memDuration = data.updatedAt.split("-")[0]
      setYear(memDuration)
    });
  };
  useEffect(() => {
    fetchUser();
  }, [params]);

  const [groups, setGroups] = useState([]);
  const fetchGroups = () => {
    API.getAllGroups().then((data) => {
      setGroups(data);
    });
  };
  useEffect(() => {
    fetchGroups();
    fetchGames();
  }, []);

  const [games, setGames] = useState([]);
  const fetchGames = () => {
    API.getAllGames().then((data) => {
      setGames(data);
    });
  };

  console.log(user);

  return (
    <div style={{ minHeight: "50vh" }}>
      <div className="page-container">
        <div className="userprofile">
          <img src={user.imgURL} alt="cat-profile-pic" />
          <div className="userinfo">
            <p className="name">
              Username:
              <strong>{ user.username}</strong>
            </p>
            <p className="Aboutme">
              About me:
              <strong>{user.Aboutme}</strong>
            </p>
            <p className="Year">
              Member since:
              <strong>{year}</strong>
            </p>
          </div>
        </div>
        <div className="home-group-container">
            {user.Groups ? user.Groups.map((group)=>(
                        <Groupcard
                        name={group.name}
                        id={group.id}
                        key={group.id}
                        token={props.token}
                        userId={props.userId}
                      />))
            : 
              <h4>Login to see your groups</h4>
            }
        </div>
      </div>
    </div>
  );
}

export default Home;
