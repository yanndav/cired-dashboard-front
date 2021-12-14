// -----------------------------------------------
// IMPORTATIONS
// -----------------------------------------------

// Styling
import "../../zoneModules/ZoneModules.css";

// React components
import React, { useState, useEffect } from "react";

// import { Slider } from "@mui/material";

// D3 components
import { sliderBottom } from "d3-simple-slider";
import * as d3 from "d3";

// Leaflet components
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

// TV Components
import LegendMap from "../components/LegendMap";
import Sources from "../components/Sources";
import SliderMap from "../components/SliderMap";
import VariablesSelect from "../components/VariablesSelect";

// Map functions
import {
  updateShape,
  removeSelectionnes,
  arrayYear,
  yearMin,
  yearMax,
  keyGen,
} from "../components/mapFunctions";

//--------------------------------------------------
// FONCTIONS DE GESTION DES DONNEES
// ----------------------------------------------------

const layersToShow = (LAYERS, year, showLayers) => {
  const newData = [...LAYERS];
  const newData2 = newData
    .filter((layer) => showLayers[layer.VARIABLE.CODE]) // garde les bons layers
    .map((layer2) => {
      const newLayer = { ...layer2 };
      const tempgeo = newLayer.GEOMETRY.filter(
        (geom) => geom.properties.ANNEE === year
      ).map((c) => c);
      newLayer["GEOMETRY"] = tempgeo;
      return newLayer;
    });
  return [...newData2];
};
const createShowLayers = (data) => {
  const obj = {};
  // Fonction qui crée le dictionnaire des layers à montrer ou pas
  data.map((layer) => (obj[layer.VARIABLE.CODE] = true));
  return obj;
};

// ----------------------------------------------------
// FONCTIONS DE GESTION DE LA REPRESENTATION GRAPHIQUE
// ----------------------------------------------------

const colorScales = (data, colors, year) => {
  const set = Array.from(
    new Set(
      data.MODALITES.filter((d) => d.ANNEE.includes(year)).map((d) => d.CODE)
    )
  );

  return set.reduce((obj, k, i) => ({ ...obj, [k]: colors[i] }), {});
};

const getDesign = (module, layer) =>
  module.REPRESENTATION.DESIGN.filter(
    (c) => c.VARIABLE === layer.VARIABLE.CODE
  )[0];

const Map = ({ module, data, center }) => {
  // ----------------------------------------------------
  // CONSTANTES
  // ----------------------------------------------------

  const idKey = keyGen(module.NOM); //key of the map
  const years = arrayYear(data);

  // ----------------------------------------------------
  // VARIABLES
  // ----------------------------------------------------

  const [map, setMap] = useState(null); // map reference
  const [showLayers, setShowLayers] = useState(createShowLayers(data)); // show layers
  const [showYear, setShowYear] = useState(yearMin(years)); // Minimum year
  const [layers, setLayers] = useState(
    layersToShow(data, showYear, showLayers)
  );

  // ----------------------------------------------------
  // EFFETS
  // ----------------------------------------------------

  useEffect(() => {
    // Initialisation de la carte => ajout du layer svg
    if (map) {
      L.svg().addTo(map);
      map.setView(center, 10);
      layers &&
        layers.map((layer) =>
          updateShape(layer, map, idKey, getDesign(module, layer))
        );
    }
  }, [map]);

  useEffect(() => {
    // Mise à jour des données affichées
    // Fonction année + variable sélectionnée
    setLayers(layersToShow(data, showYear, showLayers));
  }, [showLayers, showYear]);

  useEffect(() => {
    layers.length === 0 &&
      data.map((layer) =>
        removeSelectionnes(idKey, keyGen(layer.VARIABLE.CODE))
      );

    map &&
      layers.map((layer) =>
        updateShape(layer, map, idKey, getDesign(module, layer))
      );
  }, [layers]);

  const Events = () => {
    const map = useMapEvents({
      zoomstart: (e) => {
        data.map((layer) =>
          removeSelectionnes(idKey, keyGen(layer.VARIABLE.CODE))
        );
      },
      dragend: (e) => {
        layers &&
          layers.map((layer) =>
            updateShape(layer, map, idKey, getDesign(module, layer))
          );
      },
      zoomend: (e) => {
        layers &&
          layers.map((layer) =>
            updateShape(layer, map, idKey, getDesign(module, layer))
          );
      },
    });
    return null;
  };

  return (
    <div>
      <div className="header-graph">
        <h4 className="map-title">{module.NOM + " en " + showYear}</h4>
        <VariablesSelect
          data={data}
          showLayers={showLayers}
          setShowLayers={setShowLayers}
        />
        {/* <Sources sources={data.SOURCES} year={year} /> */}
      </div>

      <div className="map-container">
        <MapContainer
          className="map"
          id={idKey}
          center={center}
          scrollWheelZoom={false}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | &copy; CIRED-ENPC'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Events />
        </MapContainer>
      </div>

      <SliderMap years={years} setShowYear={setShowYear} />

      <div id={"legend" + idKey} className="legend-container">
        {/* {Object.keys(colorScales(data, colors, year)).map((clef, idx) => {
          return (
            <LegendMap
              colors={colorScales(data, colors, year)}
              clef={clef}
              idx={idx}
              data={data}
            />
          );
        })} */}
      </div>
    </div>
  );
};

export default Map;

// -----------------------
// POUBELLE

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

// const updatedGeographies = (data, geographies, year, showLayers) => {
//   // Récupère les données pour la bonne année
//   const toShow = dataToShow(data, year, showLayers);

//   // return geographies.map((d) => {
//   //   let codgeo = d.properties.CODGEO[0].toString();
//   //   let to_add = toShow.filter((c) => c.CODGEO === codgeo);
//   //   if (to_add[0]) {
//   //     d.properties.VALEUR = to_add[0].VALEUR;
//   //   }
//   //   return d;
//   // });
// };
