// ---------------------------
//  IMPORTATIONS
// ---------------------------
// Map functions
import VariableSelectItem from "./VariableSelectItem";
// react components
import { useEffect, useState } from "react";

const VariablesSelect = ({
  data,
  showVariable,
  setShowVariable,
  // options,
  // showFilter,
  // setShowFilter,
}) => {
  // ---------------------------------------
  // COMPOSANT QUI RETOURNE LES VARIABLES DE l'ELEMENT DE MODULE
  // ---------------------------------------

  return (
    <div className="flx-row flx-gap-small">
      {/* <span className="btn-small">Variable{data.length > 1 && "s"}:</span> */}
      {data.map((layer) => (
        <VariableSelectItem
          show={showVariable}
          layer={layer}
          setShowVariable={setShowVariable}
          // options={options[layer.VARIABLE.CODE]}
          // variable={layer.VARIABLE.CODE}
          // showFilter={showFilter}
          // setShowFilter={setShowFilter}
        />
      ))}
    </div>
  );
};

export default VariablesSelect;
