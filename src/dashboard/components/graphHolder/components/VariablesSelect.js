// ---------------------------
//  IMPORTATIONS
// ---------------------------
// Map functions
import VariableSelectItem from "./VariableSelectItem";
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

  return (
    <div className="flx-row flx-gap-small">
      {/* <span className="btn-small">Variable{data.length > 1 && "s"}:</span> */}
      {data.map((layer) => (
        <VariableSelectItem
          show={show}
          layer={layer}
          setShowLayers={setShowLayers}
        />
      ))}
    </div>
  );
};

export default VariablesSelect;
