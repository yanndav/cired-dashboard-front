// ---------------------------
//  IMPORTATIONS
// ---------------------------
// Map functions
import { keyGen } from "./mapFunctions";

// react components
import { useEffect, useState } from "react";

const VariablesSelect = ({ data, showLayers, setShowLayers }) => {
  // ---------------------------------------
  // COMPOSANT QUI RETOURNE LES VARIABLES DE l'ELEMENT DE MODULE
  // ---------------------------------------

  const [show, setShow] = useState(showLayers);

  useEffect(() => {
    setShow(showLayers);
  }, [showLayers]);

  // const updateLayers = (show, layer) => {
  //   const layert = show;
  //   layert[layer.VARIABLE.CODE] = !show[layer.VARIABLE.CODE];
  //   console.log(layert);
  //   return layert;
  // };

  return (
    <div className="flx-row flx-gap-small">
      {/* <span className="btn-small">Variable{data.length > 1 && "s"}:</span> */}
      {data.map((layer) => (
        <span
          className="btn-tv-color btn-small ft-0-8 italic"
          key={"var-" + keyGen(layer.VARIABLE.CODE)}
        >
          <input
            type="checkbox"
            defaultChecked={show[layer.VARIABLE.CODE]}
            onChange={() =>
              setShowLayers({
                ...show,
                [layer.VARIABLE.CODE]: !show[layer.VARIABLE.CODE],
              })
            }
          ></input>
          {layer.VARIABLE.LIBELLE}
        </span>
      ))}
    </div>
  );
};

export default VariablesSelect;
