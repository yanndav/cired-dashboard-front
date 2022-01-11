// -----------------------------------------------
// IMPORTATIONS
// -----------------------------------------------

// Styling
import "../../zoneModules/ZoneModules.css";

// React components
import React, { useState, useEffect } from "react";

// Leaflet components
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

// TV Components
import LegendMap from "../components/LegendMap";
import SliderMap from "../components/SliderMap";
import VariablesSelect from "../components/VariablesSelect";

// Map functions
import {
  updateShape,
  removeSelectionnes,
  arrayYear,
  layerYears,
  yearMin,
  keyGen,
  simplify,
} from "../components/mapFunctions";

//--------------------------------------------------
// FONCTIONS DE GESTION DES DONNEES
// ----------------------------------------------------

const layersToShow = (LAYERS, year, showLayers) => {
  const newData = [...LAYERS];
  const newData2 = newData
    .filter((layer) => showLayers["l" + layer.LAYER.toString()]) // garde les bons layers
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
  data.map((layer) => (obj["l" + layer.LAYER.toString()] = true));
  return obj;
};

// ----------------------------------------------------
// FONCTIONS DE GESTION DE LA REPRESENTATION GRAPHIQUE
// ----------------------------------------------------

const getDesign = (module, layer) =>
  module.REPRESENTATION.DESIGN.filter((c) => c.LAYER === layer.LAYER)[0];

const Map = ({ module, data, center }) => {
  // ----------------------------------------------------
  // CONSTANTES
  // ----------------------------------------------------

  const idKey = simplify(module.NOM); //key of the map
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
  }, [showLayers, showYear, data]);

  useEffect(() => {
    layers.length === 0 &&
      data.map((layer) => removeSelectionnes(idKey, keyGen(layer)));

    map &&
      layers
        .sort((a, b) => b.LAYER - a.LAYER)
        .map((layer) =>
          updateShape(layer, map, idKey, getDesign(module, layer))
        );
  }, [layers]);

  const Events = () => {
    const map = useMapEvents({
      zoomstart: (e) => {
        data.map((layer) => removeSelectionnes(idKey, keyGen(layer)));
      },
      dragend: (e) => {
        layers &&
          layers
            .sort((a, b) => b.LAYER - a.LAYER)
            .map((layer) =>
              updateShape(layer, map, idKey, getDesign(module, layer))
            );
      },
      zoomend: (e) => {
        layers &&
          layers
            .sort((a, b) => b.LAYER - a.LAYER)
            .map((layer) =>
              updateShape(layer, map, idKey, getDesign(module, layer))
            );
      },
    });
    return null;
  };

  return (
    <div>
      <div className="header-graph">
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
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, &copy; Stadia Maps | &copy; CIRED-ENPC'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          />
          <Events />
        </MapContainer>
      </div>
      {years.length > 1 && (
        <SliderMap years={years} setShowYear={setShowYear} />
      )}

      <div id={"legend" + idKey} className="flx-column">
        {layers.map(
          (layer) =>
            getDesign(module, layer).SHOWLEGEND &&
            layerYears(layer).includes(showYear) && (
              <LegendMap layer={layer} idKey={idKey} />
            )
        )}
        {/* {Object.keys(colorScales(data, colors, year)).map((clef, idx) => {
          return (
            
          );
        })} */}
      </div>
    </div>
  );
};

export default Map;
