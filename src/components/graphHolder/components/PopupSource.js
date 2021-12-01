import React from "react";
import { TiDelete } from "react-icons/ti";
import { BiLink } from "react-icons/bi";

const PopupSource = ({ sourceRef, texte, lien, setPop }) => {
  return (
    <div
      class="popup"
      style={{
        top: sourceRef.current.offsetTop + 20,
        left: sourceRef.current.offsetLeft,
      }}
    >
      <div>
        <p className="nom-base">
          {texte + "   "}
          {lien && (
            <a href={lien} target="_blank">
              <BiLink className="link-icon" size={17} />
            </a>
          )}
        </p>
      </div>
      <TiDelete className="croix" onClick={() => setPop((prev) => !prev)} />
    </div>
  );
};

export default PopupSource;
