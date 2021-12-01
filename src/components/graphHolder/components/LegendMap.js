import React from "react";
import { useState, useRef } from "react";

import PopupSource from "./PopupSource";

const getModalites = (data, clef) => {
  let code = data.MODALITES.filter((c) => c.CODE === clef);
  console.log(clef);
  if (code) {
    return code[0];
  }
};

const LegendMap = ({ colors, clef, idx, data }) => {
  const legendRef = useRef(null);
  const [pop, setPop] = useState(false);

  const modalites = getModalites(data, clef);

  return (
    <div key={idx} className="legendgroup">
      <div
        className="legend-rect"
        style={{
          backgroundColor: colors[clef],
        }}
      >
        {" "}
      </div>
      <div
        ref={legendRef}
        onClick={() => setPop((prev) => !prev)}
        className="legend-text"
        style={{ color: pop && "#0aaacb" }}
      >
        {modalites["LIBELLE"]}
      </div>
      {pop && (
        <PopupSource
          sourceRef={legendRef}
          texte={modalites.DEFINITION}
          lien={null}
          setPop={setPop}
        />
      )}
    </div>
  );
};

export default LegendMap;
