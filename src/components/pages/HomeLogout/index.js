import React, { useEffect, useState } from "react";
import "./style.css";
import API from "../../../utils/API";
import ImgCarousel from "../Home/ImgCarousel.js";

const styleCard = {
  width: "70%",
  margin: "auto",
  borderWidth: "5px",
  borderStyle: "double",
  borderColor: "#26c6da",
};

function HomeLogout() {
  const [games, setGames] = useState([]);
  const fetchGames = () => {
    API.getAllGames().then((data) => {
      setGames(data);
    });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="loggoutContainer">
      <h2>
        <a href="/login"> Login</a> or <a href="/signup"> Signup </a>to join 
      </h2>
      <div className="jollycontainer">
        <h3 className="jollycoopfont"> J</h3>
        <h3 className="jollycoopfont">O</h3>
        <h3 className="jollycoopfont">L</h3>
        <h3 className="jollycoopfont">L</h3>
        <h3 className="jollycoopfont">Y</h3>
        <h3>
          <strong>-</strong>
        </h3>
        <h3 className="jollycoopfont jollyanimation1">C</h3>
        <h3 className="jollycoopfont jollyanimation2">O</h3>
        <h3 className="jollycoopfont jollyanimation3">O</h3>
        <h3 className="jollycoopfont jollyanimation1">P</h3>
      </div>
    </div>
  );
}

export default HomeLogout;
