import { map } from "leaflet";
import React from "react";
import { TiDelete } from "react-icons/ti";
import { IoMdInformationCircleOutline } from "react-icons/io";

import PopupFilterItem from "./PopupFilterItem";
const PopupFilter = ({
  vari,
  code,
  options,
  activatedFilters,
  setActivatedFilters,
  setOpenFilter,
}) => {
  return (
    <div class="backModal">
      <div className="popup">
        <div className="flx-column mrg-20">
          <div className="nom-base">
            <h2>{options.LIBELLE}:</h2>
            <div className="flx-column flx-gap-small">
              {options.OPTIONS.map((dt) => (
                <PopupFilterItem
                  vari={vari}
                  code={code}
                  activatedFilters={activatedFilters}
                  setActivatedFilters={setActivatedFilters}
                  dt={dt}
                />
              ))}
            </div>
          </div>
        </div>
        <TiDelete
          className="croix"
          onClick={() => setOpenFilter((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default PopupFilter;
