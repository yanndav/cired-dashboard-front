import React from "react";
import { TiDelete } from "react-icons/ti";
import { BiLink } from "react-icons/bi";
import Markdown from "marked-react";

import "../../zoneModules/ZoneModules.css";

const PopupSource = ({ texte, lien, setPop }) => {
  return (
    <div class="backModal">
      <div className="popup">
        <div className="flx-column mrg-20">
          <div className="nom-base">
            <Markdown className="description " value={texte} />
            {/* {lien && (
              <a href={lien} target="_blank" rel="noreferrer">
                <BiLink className="link-icon" size={17} />
              </a>
            )} */}
          </div>
        </div>
        <TiDelete className="croix" onClick={() => setPop((prev) => !prev)} />
      </div>
    </div>
  );
};

export default PopupSource;
