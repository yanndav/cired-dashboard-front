import React from "react";
import { FaList } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useState, useEffect } from "react";

const SelectTerritoires = ({ variable, territoiresVar, setTerritoiresVar }) => {
  const [pop, setPop] = useState(false);
  const [terr, setTer] = useState(territoiresVar);
  useEffect(() => {
    setTer(territoiresVar);
  }, [territoiresVar]);
  return (
    <>
      <span className="btn-tv-sec-color btn-small ">
        <span className="ft-0-8 italic">Sélection des territoires</span>
        <FaList
          size={14}
          style={{ marginLeft: "10px", marginBottom: "-2px" }}
          className="info"
          onClick={() => setPop((prev) => !prev)}
        />
      </span>
      {pop && (
        <div class="backModal">
          <div className="popup">
            <div className="flx-column mrg-20">
              <div className="nom-base">
                <h2>Sélection des territoires :</h2>
                <div className="flx-column flx-gap-small">
                  {terr[variable].map((dt, i) => (
                    <div>
                      {" "}
                      <input
                        type="checkbox"
                        checked={terr[variable][i].SHOW}
                        style={{ marginRight: "15px", marginLeft: "5px" }}
                        onChange={() =>
                          setTerritoiresVar((prev) => {
                            let temp = prev[variable][i];
                            temp.SHOW = !temp.SHOW;
                            console.log([
                              ...prev[variable].slice(0, i),
                              ...[temp],
                              ...prev[variable].slice(
                                i + 1,
                                prev[variable].length
                              ),
                            ]);
                            return {
                              ...prev,
                              [variable]: [
                                ...prev[variable].slice(0, i),
                                ...[temp],
                                ...prev[variable].slice(
                                  i + 1,
                                  prev[variable].length
                                ),
                              ],
                            };
                          })
                        }
                      ></input>
                      {dt.LIBGEO}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <TiDelete
              className="croix"
              onClick={() => setPop((prev) => !prev)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SelectTerritoires;
