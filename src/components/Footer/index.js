import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="titlecontainer">
      <h1 className="jollycoopfont jollycoopfontcolor1">J </h1>
      <h1 className="jollycoopfont jollycoopfontcolor1">0</h1>
      <h1 className="jollycoopfont">L</h1>
      <h1 className="jollycoopfont">L</h1>
      <h1 className="jollycoopfont">Y</h1>
      <h1 className="jollycoopfont">-</h1>
      <h1 className="jollycoopfont">C</h1>
      <h1 className="jollycoopfont">0</h1>
      <h1 className="jollycoopfont jollycoopfontcolor1">0</h1>
      <h1 className="jollycoopfont jollycoopfontcolor1">P</h1>
      </div>
      <div className="footerul">
        <div>
          <h5>
            <strong>Claire Eberle
</strong>
          </h5>
          <ul>
            <li><a href="https://github.com/ClaireEberle" target="_blank">Github</a></li>
          </ul>
        </div>
        <div>
          <h5>
            <strong>Connor McLaughlin
 </strong>
          </h5>
          <ul>
            <li><a href="https://github.com/ConnorMcLaughlin2022" target="_blank">Github</a></li>
          </ul>
        </div>
        <div>
          <h5>
            <strong>Derek Caldwell</strong>
          </h5>
          <ul>
            <li><a href="https://github.com/CaldwellDerek" target="_blank">Github</a></li>
          </ul>
        </div>
        <div>
          <h5>
            <strong>Yanqing Lou</strong>
          </h5>
          <ul>
            <li><a href="https://github.com/yanqinglou" target="_blank">Github</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
