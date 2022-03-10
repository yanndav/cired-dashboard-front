import React from "react";
import { keyGen } from "./mapFunctions";

import { useState } from "react";
import PopupSource from "./PopupSource";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { listSubheaderClasses } from "@mui/material";

import VariableItemGraph from "./VariableItemGraph";
import FilterItem from "./FilterItem";
import SelectTerritoires from "./SelectTerritoires";

const VariableSelectItem = ({
  data,
  // setData,
  // activatedFilters,
  // setActivatedFilters,
  // variable,
  // territoiresVar,
  // setTerritoiresVar,
}) => {
  return (
    <div className="flx-row flx-gap-small">
      {data.map((layer) => (
        <span className="btn-tv-color btn-small " key={"var-" + keyGen(layer)}>
          <VariableItemGraph layer={layer} />
        </span>
      ))}
    </div>
  );
};

export default VariableSelectItem;
