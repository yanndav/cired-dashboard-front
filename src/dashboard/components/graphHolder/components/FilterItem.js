import React from "react";
import { keyGen } from "./mapFunctions";

import { useState, useEffect, useRef } from "react";
import PopupSource from "./PopupSource";
import PopupFilter from "./PopupFilter";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { CgSelect } from "react-icons/cg";

import { FaFilter } from "react-icons/fa";

const getFilterActivated = (layer) => {
  let temp = Object.assign({}, layer);
  if (layer.hasOwnProperty("FILTRES")) {
    let filter = {};
    const categ = Array.from(
      new Set(temp.DATA.map((dt) => Object.keys(dt.FILTRES)).flat())
    );
    for (let cat of categ) {
      console.log(cat);
      filter[cat] = Array.from(
        new Set(temp.DATA.map((dt) => dt.FILTRES[cat]).flat())
      );
    }
    return filter;
  } else {
    return false;
  }
};

const Separateur = () => (
  <span
    style={{
      // fontSize: "20px",
      marginLeft: "10px",
      marginRight: "10px",
    }}
  >
    /
  </span>
);

const FilterItem = ({ layer, activatedFilters, setActivatedFilters }) => {
  // const [pop, setPop] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const filters = layer.FILTRES;
  const vari = layer.VARIABLE.CODE;

  return (
    <>
      {Object.keys(filters).map((keyFlt) => (
        <>
          <span className="ft-0-8 italic " key={"var-" + keyGen(layer)}>
            <Separateur />
            {filters[keyFlt].LIBELLE}
            <FaFilter
              className="info"
              size={12}
              onClick={() => setOpenFilter((prev) => !prev)}
              style={{
                marginLeft: "14px",
                marginBottom: "0px",
              }}
            />
          </span>
          {openFilter && (
            <PopupFilter
              vari={vari}
              code={keyFlt}
              options={filters[keyFlt]}
              activatedFilters={activatedFilters}
              setActivatedFilters={setActivatedFilters}
              setOpenFilter={setOpenFilter}
            />
          )}
        </>
      ))}
    </>
  );
};

export default FilterItem;

{
  /* {show
        .filter((dt) => dt.CODE == layer.VARIABLE.CODE)[0]
        .FILTRES.map((flt) => (
          <>
            <span className="ft-0-8 italic " key={"var-" + keyGen(layer)}>
              <span
                style={{
                  // fontSize: "20px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                /
              </span>
              {
                filters[flt].OPTIONS.filter(
                  (d) => d.CODE === showFilter[layer.VARIABLE.CODE][flt]
                )[0].LIBELLE
              }
              <IoMdInformationCircleOutline
                className="info"
                style={{ color: pop && "#0aaacb" }}
                onClick={() => setPop((prev) => !prev)}
                size={15}
              />
              <FaFilter
                className="info"
                size={12}
                onClick={() => setOpenFilter((prev) => !prev)}
                style={{
                  marginLeft: "14px",
                  marginBottom: "0px",
                }}
              />
              {openFilter && (
                <PopupFilter
                  options={options}
                  setOpenFilter={setOpenFilter}
                  setShowFilter={setShowFilter}
                  showFilter={showFilter}
                  info={filters}
                />
              )}
            </span>
            {pop && (
              <PopupSource
                texte={genererLegende(
                  filters[flt].OPTIONS.filter(
                    (d) => d.CODE === showFilter[layer.VARIABLE.CODE][flt]
                  )[0]
                )}
                setPop={setPop}
              />
            )}
          </>
        ))} */
}
