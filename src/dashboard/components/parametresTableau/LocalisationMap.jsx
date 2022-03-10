import { useEffect, useState, useContext, useRef } from "react";
import { AppContext } from "../../../app/AppContext";

import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Polygon,
  Tooltip,
  FeatureGroup,
} from "react-leaflet";

import styled from "styled-components";

import {
  BoiteParametre,
  TitreParametre,
  ZoneSelection,
  MapImg,
  ZoneFiltres,
  FiltreButton,
  LegendeParametre,
} from "./StyledComparaison";

import {
  // removeSelectionnes,
  // updateShape,
  apiVoisinnage,
  // getVoisinnage,
  // removeVoisinnage,
  apiShape,
} from "./LocalisationFunctions";
import { colorsLight } from "../../../app/colorComponents";

const ContainerMap = styled.div`
  position: relative;
  margin: 30px auto;
  width: 100%;
  max-width: 900px;
  height: 560px;
`;

const Map = styled(MapContainer)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const StyledPolygon = styled(Polygon).attrs((props) => {
  return {
    pathOptions: { fillOpacity: props.isSelected ? "80%" : "10%" },
  };
})`
  fill: ${(props) =>
    props.isSelected ? colorsLight.title : colorsLight[props.TYPE]};
  stroke: ${(props) => colorsLight[props.TYPE]};
  opacity: 90% !important;
  &:hover {
    fill: ${(props) =>
      props.isSelected
        ? props.isTerritoriesAround && colorsLight.cancel
        : colorsLight.title2};
  }
`;

const StyledTooltip = styled(Tooltip)`
  background: ${colorsLight.background};
  border-radius: 8px;
  font-size: 1.2em;
`;

const LocalisationMap = ({
  perimetre,
  setCritere,
  isZoomControl,
  isTerritoriesAround,
  isGeographies,
  title,
}) => {
  const zoom = 6;
  const [center, setCenter] = useState([47.2, 2.25]);
  const [geographies, setGeographies] = useState(
    isGeographies ? perimetre : []
  );
  const [voisins, setVoisins] = useState([]);
  const [filtres, setFiltres] = useState([
    { CODE: "COM", selected: true, LIBELLE: "Communes", RANK: 1 },
    { CODE: "EPCI", selected: false, LIBELLE: "EPCI", RANK: 2 },
    { CODE: "DEP", selected: false, LIBELLE: "Départements", RANK: 3 },
    { CODE: "REG", selected: false, LIBELLE: "Régions", RANK: 4 },
  ]);
  const { API_URL } = useContext(AppContext);
  const [map, setMap] = useState(null);
  const featureRef = useRef(null);

  const addVoisinToTerritory = (voisin) => {
    setVoisins((prev) =>
      prev.filter((vois) => vois._id.$oid !== voisin._id.$oid)
    );

    setCritere((prev) => ({
      ...prev,
      TERRITOIRES: [...prev.TERRITOIRES, voisin],
    }));
  };

  const removeTerritory = (territoire) => {
    setVoisins((prev) => [...prev, territoire]);
    setCritere((prev) => ({
      ...prev,
      TERRITOIRES: [
        ...prev.TERRITOIRES.filter(
          (prevElem) => prevElem._id.$oid !== territoire._id.$oid
        ),
      ],
    }));
  };

  useEffect(() => {
    if (!isGeographies) {
      const toAdd = perimetre.filter(
        (perim) =>
          !geographies.map((geo) => geo._id.$oid).includes(perim._id.$oid)
      );

      if (toAdd) {
        const getShape = async (toAdd) => {
          const data = await apiShape(API_URL, toAdd, 2021);
          setGeographies((prev) => [...prev, ...data]);
        };
        getShape(toAdd);
      }

      const toDelete = geographies
        .filter(
          (geo) =>
            !perimetre.map((perim) => perim._id.$oid).includes(geo._id.$oid)
        )
        .map((geo) => geo._id.$oid);

      if (toDelete) {
        setGeographies((prev) =>
          prev.filter((prevElem) => !toDelete.includes(prevElem._id.$oid))
        );
      }
    }
  }, [perimetre]);

  useEffect(() => {
    const getData = async (API_URL, map) => {
      const data = await apiVoisinnage(
        API_URL,
        map,
        filtres.find((flt) => flt.selected).CODE
      );

      isTerritoriesAround && setVoisins(data);
    };
    getData(API_URL, map);
  }, [filtres]);

  useEffect(() => {
    if (map) {
      const bounds = featureRef.current.getBounds();
      console.log(bounds);
      map.fitBounds(bounds);
    }
  }, [geographies]);

  useEffect(() => {
    if (map && isGeographies) {
      const bounds = featureRef.current.getBounds();
      console.log(bounds);
      map.fitBounds(bounds);
    }
  }, [map]);

  const Events = () => {
    const map = useMapEvents({
      moveend: (e) => {
        const getData = async (API_URL, map, perimetre) => {
          const data = await apiVoisinnage(
            API_URL,
            map,
            filtres.find((flt) => flt.selected).CODE
          );
          const clean =
            data &&
            data.filter(
              (geo) =>
                !perimetre.map((perim) => perim._id.$oid).includes(geo._id.$oid)
            );
          setVoisins(clean);
        };
        isTerritoriesAround && getData(API_URL, map, perimetre);
      },
    });
    return null;
  };

  return (
    <BoiteParametre>
      <ZoneSelection>
        <TitreParametre>
          <MapImg />
          {typeof title !== "undefined"
            ? title
            : isTerritoriesAround
            ? "La carte de votre périmètre"
            : "La carte de votre territoire"}
        </TitreParametre>
        {isTerritoriesAround && (
          <LegendeParametre color="black">
            Vous pouvez ajouter ou supprimer des territoires en cliquant dessus.
          </LegendeParametre>
        )}
        {isTerritoriesAround && (
          <ZoneFiltres>
            <LegendeParametre color="black">Afficher les</LegendeParametre>
            {filtres
              .sort((a, b) => a.RANK > b.RANK)
              .map((filtre) => (
                <FiltreButton
                  isSelected={filtre.selected}
                  onClick={() =>
                    setFiltres((prev) => [
                      ...prev
                        .filter((flt) => flt.CODE !== filtre.CODE)
                        .map((flt) => ({ ...flt, selected: false })),
                      { ...filtre, selected: true },
                    ])
                  }
                  isGeo={true}
                  code={filtre.CODE}
                >
                  {filtre.LIBELLE}
                </FiltreButton>
              ))}
          </ZoneFiltres>
        )}
        <ContainerMap>
          <Map
            // id="map"
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            zoomControl={isZoomControl}
            whenCreated={setMap}
          >
            <FeatureGroup ref={featureRef}>
              {geographies &&
                geographies.map((geo) => (
                  <StyledPolygon
                    clickable={true}
                    eventHandlers={{
                      click: () => isTerritoriesAround && removeTerritory(geo),
                    }}
                    positions={geo.GEOMETRY.coordinates}
                    TYPE={geo.TYPE}
                    isSelected
                    isTerritoriesAround={isTerritoriesAround}
                  >
                    <StyledTooltip>
                      {isTerritoriesAround && "Supprimer"} {geo.LIBGEO}
                    </StyledTooltip>
                  </StyledPolygon>
                ))}
            </FeatureGroup>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, &copy; Stadia Maps | &copy; Comparater'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />
            {isTerritoriesAround && (
              <>
                <Events />
                {voisins &&
                  voisins.length > 0 &&
                  voisins.map((vois) => (
                    <StyledPolygon
                      clickable={true}
                      eventHandlers={{
                        click: () => addVoisinToTerritory(vois),
                      }}
                      positions={vois.GEOMETRY.coordinates}
                      TYPE={vois.TYPE}
                      key={vois.CODGEO}
                    >
                      <StyledTooltip>
                        {isTerritoriesAround && "Ajouter"} {vois.LIBGEO}
                      </StyledTooltip>
                    </StyledPolygon>
                  ))}
              </>
            )}
          </Map>
        </ContainerMap>{" "}
      </ZoneSelection>
    </BoiteParametre>
  );
};

export default LocalisationMap;

// POUBELLE

// const [count, setCount] = useState(0);
// const [voisinnage, setVoisinnage] = useState([]);
// const [show, setShow] = useState(false);

// useEffect(() => {
//   map && L.svg().addTo(map);
//   // updateShape(geographies, map, setTerritories, API_URL, setGeographies);
//   // geographies.length > 0 && map.setView(centroid(geographies), 9);
// }, [map]);

// useEffect(() => {
//   map &&
//     updateShape(geographies, map, setTerritories, API_URL, setGeographies);
//   map && setCenter(centroid(geographies));

//   if (map && count !== geographies.length) {
//     removeVoisinnage(map);
//     getVoisinnage(
//       API_URL,
//       geographies,
//       map,
//       voisinnage,
//       setVoisinnage,
//       "zoom",
//       setTerritories,
//       setGeographies,
//       setRemove
//     );
//     setCount(geographies.length);
//     geographies.length !== 0 && map.panTo(centroid(geographies));
//   }

//   if (geographies.length === 1 && count === 0) {
//     map.setView(centroid(geographies), 10);
//     setCount(1);
//   }
// }, [geographies]);
