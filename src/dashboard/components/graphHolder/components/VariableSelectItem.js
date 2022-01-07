import React from "react";
import { keyGen } from "./mapFunctions";

import { useRef, useState } from "react";
import PopupSource from "./PopupSource";
import { IoMdInformationCircleOutline } from "react-icons/io";

const VariableSelectItem = ({ show, layer, setShowLayers }) => {
  const legendRef = useRef(null);
  const [pop, setPop] = useState(false);
  return (
    <>
      <span
        className="btn-tv-color btn-small ft-0-8 italic"
        key={"var-" + keyGen(layer)}
        ref={legendRef}
      >
        <input
          type="checkbox"
          defaultChecked={show["l" + layer.LAYER.toString()]}
          onChange={() =>
            setShowLayers({
              ...show,
              ["l" + layer.LAYER.toString()]:
                !show["l" + layer.LAYER.toString()],
            })
          }
        ></input>
        {layer.VARIABLE.LIBELLE}
        <IoMdInformationCircleOutline
          className="info"
          style={{ color: pop && "#0aaacb" }}
          onClick={() => setPop((prev) => !prev)}
          size={15}
        />
      </span>
      {pop && (
        <PopupSource
          sourceRef={legendRef}
          texte={layer.VARIABLE.DEFINITION}
          lien={layer.VARIABLE.LIEN}
          setPop={setPop}
        />
      )}
    </>
  );
};

export default VariableSelectItem;
