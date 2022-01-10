import React from "react";
import { useState, useRef } from "react";
import "../../zoneModules/ZoneModules.css";
import PopupSource from "./PopupSource";

const SourceEtiquette = ({ source }) => {
  const sourceRef = useRef(null);
  const [pop, setPop] = useState(false);

  return (
    <>
      <span
        ref={sourceRef}
        onClick={() => setPop((prev) => !prev)}
        className="auteur"
        style={{ color: pop && "#0aaacb" }}
      >
        {source.AUTEUR}
      </span>
      {pop && (
        <PopupSource
          sourceRef={sourceRef}
          texte={source.NOM}
          lien={source.LIEN}
          setPop={setPop}
        />
      )}
    </>
  );
};

export default SourceEtiquette;
