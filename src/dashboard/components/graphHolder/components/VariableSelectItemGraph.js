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
  infos,
  setData,
  activatedFilters,
  setActivatedFilters,
  variable,
  territoiresVar,
  setTerritoiresVar,
}) => {
  const nbLayers = infos.length;
  return (
    <div className="flx-row flx-gap-small">
      {infos.map((layer) => (
        <span className="btn-tv-color btn-small " key={"var-" + keyGen(layer)}>
          <VariableItemGraph
            layer={layer}
            setData={setData}
            nbLayers={nbLayers}
          />
          {layer.hasOwnProperty("FILTRES") && (
            <FilterItem
              layer={layer}
              activatedFilters={activatedFilters[layer.VARIABLE.CODE]}
              setActivatedFilters={setActivatedFilters}
            />
          )}
        </span>
      ))}
      {territoiresVar[variable].length > 1 && (
        <SelectTerritoires
          variable={variable}
          territoiresVar={territoiresVar}
          setTerritoiresVar={setTerritoiresVar}
        />
      )}
    </div>
  );
};

export default VariableSelectItem;
