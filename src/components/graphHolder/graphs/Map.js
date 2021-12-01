import React, { useState, useEffect } from "react";
import "../../zoneModules/ZoneModules.css";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import LegendMap from "../components/LegendMap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { updateShape, removeSelectionnes } from "../components/mapFunctions";

import Sources from "../components/Sources";

import { sliderBottom } from "d3-simple-slider";
import * as d3 from "d3";

const colors = ["#0ffff7", "#a2ffb7", "#c7021b", "#f77112", "#fde665"];

const arrayYear = (data) =>
  Array.from(
    new Set(data.DATA.map((d) => d.VALEURS.map((c) => c.ANNEE)).flat())
  );

const yearMin = (data) => Math.min(...arrayYear(data));
const yearMax = (data) => Math.max(...arrayYear(data));

const dataForAYear = (data, year) =>
  data.DATA.map((d) => {
    let temp = d.VALEURS.filter((c) => c.ANNEE === year);
    if (temp[0]) {
      temp[0]["CODGEO"] = d.CODGEO;
      return temp[0];
    }
  });

const updatedGeographies = (data, geographies, year) => {
  const toShow = dataForAYear(data, year);
  return geographies.map((d) => {
    let codgeo = d.properties.CODGEO[0].toString();
    let to_add = toShow.filter((c) => c.CODGEO === codgeo);
    if (to_add[0]) {
      d.properties.VALEUR = to_add[0].VALEUR;
    }
    return d;
  });
};

const colorScales = (data, colors, year) => {
  const set = Array.from(
    new Set(
      data.MODALITES.filter((d) => d.ANNEE.includes(year)).map((d) => d.CODE)
    )
  );

  return set.reduce((obj, k, i) => ({ ...obj, [k]: colors[i] }), {});
};

const Map = ({ module, data, geographies, center }) => {
  const [map, setMap] = useState(null); // map reference
  const [idKey, setIdKey] = useState("map-" + data.VARIABLE.CODE); //key of the map
  const [year, setYear] = useState(yearMin(data));
  // const [dataToShow, setDataToShow] = useState(
  //   data ? dataForAYear(data) : data
  // );

  console.log(colorScales(data, colors, 2020));

  useEffect(() => {
    data && setIdKey("map-" + data.VARIABLE.CODE);
    map &&
      updateShape(
        updatedGeographies(data, geographies, year),
        map,
        idKey,
        colorScales(data, colors, year)
      );
    map && map.setView(center, 10);
  }, [data]);

  useEffect(() => {
    if (map) {
      L.svg().addTo(map);
      data &&
        updateShape(
          updatedGeographies(data, geographies, year),
          map,
          idKey,
          colorScales(data, colors, year)
        );
      map.setView(center, 10);
    }
  }, [map]);

  useEffect(() => {
    data &&
      updateShape(
        updatedGeographies(data, geographies, year),
        map,
        idKey,
        colorScales(data, colors, year)
      );
    map && map.setView(center, 10);
  }, [geographies]);

  useEffect(() => {
    data &&
      updateShape(
        updatedGeographies(data, geographies, year),
        map,
        idKey,
        colorScales(data, colors, year)
      );
  }, [year]);

  const Events = () => {
    const map = useMapEvents({
      zoomstart: (e) => {
        removeSelectionnes(idKey);
      },
      dragend: (e) => {
        updateShape(
          updatedGeographies(data, geographies, year),
          map,
          idKey,
          colorScales(data, colors, year)
        );
      },
      zoomend: (e) => {
        updateShape(
          updatedGeographies(data, geographies, year),
          map,
          idKey,
          colorScales(data, colors, year)
        );
      },
    });
    return null;
  };

  const changeYear = (year) => {
    setYear(year);
  };

  // const sources = (sources, year) => {
  //   const temp = sources.filter((c) => c.ANNEE.includes(year));
  //   if (temp.length === 1) {
  //     console.log(temp);
  //     return (
  //       <p>
  //         Source: <span>{temp[0].AUTEUR}</span>
  //       </p>
  //     );
  //   }
  //   if (temp.length === 0) {
  //     return "Pas de source déclarée 🤔";
  //   } else {
  //     console.log(temp);
  //     return (
  //       "Sources: " +
  //       temp.map((d, i) =>
  //         temp.length > i ? d.AUTEUR + ", " : "et " + d.AUTEUR
  //       )
  //     );
  //   }
  // };
  const slider = sliderBottom()
    .min(yearMin(data))
    .max(yearMax(data))
    .value(year)
    .tickValues(arrayYear(data))
    .marks(arrayYear(data))
    .tickFormat(d3.format("d"))
    .width(500)
    .on("end", (d) => {
      changeYear(d);
    });

  const d3selectSlider = (idKey) => {
    // Fonction qui sélectionne les territoires voisins
    const g = d3.select("#slider" + idKey);

    if (g.select("#selector" + idKey).empty()) {
      return g
        .attr("width", 600)
        .attr("height", 100)
        .append("g")
        .attr("id", "selector" + idKey)
        .attr("transform", "translate(50,30)");
      // .attr("width", 550);
    } else {
      return g.select("#selector" + idKey);
    }
  };

  d3selectSlider(idKey).remove();
  d3selectSlider(idKey).call(slider);

  return (
    <div>
      <div className="header-graph">
        <h4 className="map-title">{module.NOM + " en " + year}</h4>
        <Sources sources={data.SOURCES} year={year} />
      </div>

      <div className="map-container">
        <MapContainer
          className="map"
          id={idKey}
          center={center}
          // scrollWheelZoom={true}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | &copy; CIRED-ENPC'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Events />
        </MapContainer>
      </div>
      <svg id={"slider" + idKey} className="slider"></svg>
      {/* <h5 className="legend-title">Légende:</h5> */}
      <div id={"legend" + idKey} className="legend-container">
        {Object.keys(colorScales(data, colors, year)).map((clef, idx) => {
          return (
            <LegendMap
              colors={colorScales(data, colors, year)}
              clef={clef}
              idx={idx}
              data={data}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Map;
