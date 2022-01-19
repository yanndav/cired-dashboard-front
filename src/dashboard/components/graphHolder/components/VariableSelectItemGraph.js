import React from "react";
import { keyGen } from "./mapFunctions";

import { useState } from "react";
import PopupSource from "./PopupSource";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { listSubheaderClasses } from "@mui/material";

import VariableItemGraph from "./VariableItemGraph";
import FilterItem from "./FilterItem";

const VariableSelectItem = ({
  infos,
  setData,
  activatedFilters,
  setActivatedFilters,
}) => {
  const nbLayers = infos.length;
  return (
    <>
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
    </>
  );
};

export default VariableSelectItem;
