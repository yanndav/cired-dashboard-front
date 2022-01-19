import React from "react";
import { keyGen } from "./mapFunctions";

import { useState } from "react";
import PopupSource from "./PopupSource";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { listSubheaderClasses } from "@mui/material";

import VariableItem from "./VariableItem";
import FilterItem from "./FilterItem";

const VariableSelectItem = ({
  show,
  layer,
  setShowVariable,
  // options,
  // variable,
  // showFilter,
  // setShowFilter,
}) => {
  // const hasFilter = typeof show != "undefined" && show[variable] !== false;

  return (
    <>
      <span className="btn-tv-color btn-small " key={"var-" + keyGen(layer)}>
        <VariableItem
          show={show}
          layer={layer}
          setShowVariable={setShowVariable}
        />
        {/* {hasFilter && (
          <FilterItem
            layer={layer}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            options={options}
          />
        )} */}
      </span>
    </>
  );
};

export default VariableSelectItem;
