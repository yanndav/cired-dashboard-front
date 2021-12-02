// Styling
import "./Header.css";

// Modules
import { NavLink, useLocation } from "react-router-dom";
import ConnectIcon from "../../userBoard/components/connectIcon/ConnectIcon";

import { useState } from "react";

const Header = () => {
  const [hover, setHover] = useState(false);
  const location = useLocation().pathname;

  return (
    <div className="header-container">
      <div className="titre">
        <NavLink to="/" className="linkCustom">
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img
              className={`logo-nom ${hover ? "hovered" : ""}`}
              src="logo-site-HD.png"
              alt="Transitions"
              width={hover ? "40em" : "35em"}
              style={{
                marginRight: hover && "5px",
                marginTop: hover && "-5px",
                top: hover && "-50",
              }}
            />
            <h1 className={`nom-site  ${hover ? "hovered" : ""}`}>
              Transitions Viewer
            </h1>
          </div>
        </NavLink>
      </div>
      <ul className="navig-container">
        <div
          className={`navig-pages hoverCustom ${
            location.includes("/user-board") ? "link-current" : ""
          }`}
        >
          <ConnectIcon />
        </div>
      </ul>
    </div>
  );
};

export default Header;
