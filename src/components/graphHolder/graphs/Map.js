import React, { useState, useEffect } from "react";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { ClipLoader } from "react-spinners";
import { updateShape, removeSelectionnes } from "../components/mapFunctions";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  //   transform: "translate(-50%, -50%)",
};

const Map = ({ module, data, geographies, center }) => {
  const [map, setMap] = useState(null); // map reference
  const [idKey, setIdKey] = useState("");
  const [layer, setLayer] = useState(null);
  const [load, setLoad] = useState(true);
  const [dataToShow, setDataToShow] = useState(data);

  useEffect(() => {
    if (data === null) {
      setLoad(true);
    } else {
      setLoad(false);
      setIdKey("map-" + data.VARIABLE.CODE);
      setDataToShow(data);
      map && updateShape(geographies, map, dataToShow, idKey);
      map && map.setView(center, 10);
    }
  }, [data]);

  useEffect(() => {
    map && L.svg().addTo(map);
    dataToShow && updateShape(geographies, map, dataToShow, idKey);

    map && map.setView(center, 10);
  }, [map]);

  useEffect(() => {
    map && updateShape(geographies, map, dataToShow, idKey);
    map && map.setView(center, 10);
  }, [geographies]);

  const Events = () => {
    const map = useMapEvents({
      load: () => {
        updateShape(geographies, map, dataToShow, idKey);
      },
      zoomstart: (e) => {
        removeSelectionnes(map, idKey);
      },
      dragend: (e) => {
        updateShape(geographies, map, dataToShow, idKey);
      },
      zoomend: (e) => {
        updateShape(geographies, map, dataToShow, idKey);
      },
    });
    return null;
  };

  return (
    <div>
      <h4 className="map-title">{module.NOM}</h4>
      {load ? (
        <div className="spinner">
          <ClipLoader color={"#0AAACB"} style={style} />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Map;
