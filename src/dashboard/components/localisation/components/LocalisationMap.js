import "./LocalisationMap.css";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useEffect, useState } from "react";

import {
  removeSelectionnes,
  updateShape,
  centroid,
  getVoisinnage,
  removeVoisinnage,
} from "../LocalisationFunctions";

const LocalisationMap = ({
  geographies,
  setMap,
  map,
  API_URL,
  setTerritories,
  setGeographies,
  setRemove,
  center,
  setCenter,
}) => {
  const zoom = 6;
  const [count, setCount] = useState(0);
  const [voisinnage, setVoisinnage] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 500);
    return () => {
      setShow(false);
    };
  }, []);

  useEffect(() => {
    map &&
      updateShape(geographies, map, setTerritories, API_URL, setGeographies);
    map && setCenter(centroid(geographies));

    if (map && count !== geographies.length) {
      removeVoisinnage(map);
      getVoisinnage(
        API_URL,
        geographies,
        map,
        voisinnage,
        setVoisinnage,
        "zoom",
        setTerritories,
        setGeographies,
        setRemove
      );
      setCount(geographies.length);
      geographies.length !== 0 && map.panTo(centroid(geographies));
    }

    if (geographies.length === 1 && count === 0) {
      map.setView(centroid(geographies), 10);
      setCount(1);
    }
  }, [geographies]);

  useEffect(() => {
    map && L.svg().addTo(map);
    updateShape(geographies, map, setTerritories, API_URL, setGeographies);
    geographies.length > 0 && map.setView(centroid(geographies), 9);
  }, [map]);

  const Events = () => {
    const map = useMapEvents({
      zoomstart: (e) => {
        removeVoisinnage(map);
        removeSelectionnes(map);
      },
      dragend: (e) => {
        updateShape(geographies, map, setTerritories, API_URL, setGeographies);
        if (geographies.length >= 1) {
          getVoisinnage(
            API_URL,
            geographies,
            map,
            voisinnage,
            setVoisinnage,
            "drag",
            setTerritories,
            setGeographies,
            setRemove
          );
        }
      },
      zoomend: (e) => {
        updateShape(geographies, map, setTerritories, API_URL, setGeographies);
        if (geographies.length >= 1) {
          getVoisinnage(
            API_URL,
            geographies,
            map,
            voisinnage,
            setVoisinnage,
            "zoom",
            setTerritories,
            setGeographies,
            setRemove
          );
        }
      },
    });
    return null;
  };

  return (
    <>
      <div className="map-wrapper">
        {show && (
          <MapContainer
            id="map"
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            whenCreated={setMap}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, &copy; Stadia Maps | &copy; CIRED-ENPC'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />
            {/* <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | &copy; CIRED-ENPC'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            <Events />
          </MapContainer>
        )}
      </div>
    </>
  );
};

export default LocalisationMap;
