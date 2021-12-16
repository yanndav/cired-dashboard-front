import React from "react";
import { useRef, useState } from "react";

import PopupSource from "./PopupSource";
import { IoMdInformationCircleOutline } from "react-icons/io";

const LegendItem = ({ idKey, couleurs, mod, modalite, idx }) => {
  const legendRef = useRef(null);
  const [pop, setPop] = useState(false);

  return (
    <div className="legendgroup" key={"legitem-" + idKey + "-" + idx}>
      <div
        className="legend-rect"
        style={{
          backgroundColor: couleurs[mod],
        }}
      >
        {" "}
      </div>
      <div ref={legendRef} className="legend-text">
        {modalite["LIBELLE"]}
        <IoMdInformationCircleOutline
          className="info"
          style={{ color: pop && "#0aaacb" }}
          onClick={() => setPop((prev) => !prev)}
          size={15}
        />
      </div>
      {pop && (
        <PopupSource
          sourceRef={legendRef}
          texte={modalite.DEFINITION}
          lien={null}
          setPop={setPop}
        />
      )}
    </div>
  );
};

export default LegendItem;
