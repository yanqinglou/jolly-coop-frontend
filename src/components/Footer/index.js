import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footercontainer">
        <h3 className="jollycoopfont">J</h3>
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
      <div className="footerul">
        <div>
          <h5>
            <strong>Claire Eberle</strong>
          </h5>
          <ul>
            <li>
              <a href="https://github.com/ClaireEberle" target="_blank">
                Github
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5>
            <strong>Connor McLaughlin</strong>
          </h5>
          <ul>
            <li>
              <a href="https://github.com/ConnorMcLaughlin2022" target="_blank">
                Github
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5>
            <strong>Derek Caldwell</strong>
          </h5>
          <ul>
            <li>
              <a href="https://github.com/CaldwellDerek" target="_blank">
                Github
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5>
            <strong>Yanqing Lou</strong>
          </h5>
          <ul>
            <li>
              <a href="https://github.com/yanqinglou" target="_blank">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
