import "leaflet/dist/leaflet.css";
import L, { popup } from "leaflet";
import * as d3 from "d3";

import "./components/LocalisationMap.css";

// FUNCTION TO CREATE UNIQUE IDS
const num_to_let = (num) => {
  if (num === "0") {
    return "z";
  } else if (num === "1") {
    return "u";
  } else if (num === "2") {
    return "d";
  } else if (num === "3") {
    return "t";
  } else if (num === "4") {
    return "q";
  } else if (num === "5") {
    return "c";
  } else if (num === "6") {
    return "s";
  } else if (num === "7") {
    return "S";
  } else if (num === "8") {
    return "h";
  } else if (num === "9") {
    return "n";
  }
};

const let_to_num = (lett) => {
  if (lett === "z") {
    return "0";
  } else if (lett === "u") {
    return "1";
  } else if (lett === "d") {
    return "2";
  } else if (lett === "t") {
    return "3";
  } else if (lett === "q") {
    return "4";
  } else if (lett === "c") {
    return "5";
  } else if (lett === "s") {
    return "6";
  } else if (lett === "S") {
    return "7";
  } else if (lett === "h") {
    return "8";
  } else if (lett === "n") {
    return "9";
  }
};

const id_gen = (CODGEO) =>
  CODGEO.split("")
    .map((d) => num_to_let(d))
    .join("");

// FUNCTIONS CALLING TO THE API

const apiRecommendation = async (query, API_URL, setSuggestions) => {
  // Function to retrieve the locations on the back-end when typing on search bar
  const response = await fetch(`${API_URL}/getLocation`, {
    body: JSON.stringify({ location: query }),
    method: "POST",
    headers: {
      // Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  setSuggestions(data);
};

const handleSearch = (e, query, API_URL, setSuggestions) => {
  // Function to launch the fetch action when press enter on the search bar
  e.preventDefault();
  apiRecommendation(query, API_URL, setSuggestions);
};

const apiVoisinnage = async (API_URL, map) => {
  const bounds = centerInit(map);
  const zoom = zoomInit(map);

  const response = await fetch(`${API_URL}/getTerritoriesAround`, {
    body: JSON.stringify({ lat: bounds.lat, lng: bounds.lng, zoom: zoom }),
    method: "POST",
    headers: {
      // Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

const updateVoisinnage = async (
  API_URL,
  map,
  geographies,
  voisinnage,
  setVoisinnage
) => {
  const voisinnage_start = voisinnage;
  // Téléchargement des données
  let data = await apiVoisinnage(API_URL, map);

  // Suppression des villes déjà sélectionnées + correction coordonnées
  const ids = geographies.map((d) => d.properties.CODGEO[0]);
  data = data
    .filter((d) => !ids.some((a) => a.includes(d.properties.CODGEO[0])))
    .map((d) => {
      d.geometry.coordinates = [d.geometry.coordinates];
      return d;
    });
  //  Mise a jour state voisinnage
  setVoisinnage(data);

  // Renvoi des ids à supprimer // des shapes à ajouter
  let ajout = null;
  let suppr = null;
  if (voisinnage_start.length !== 0) {
    const id_start = voisinnage_start.map((d) => d.properties.CODGEO[0]);
    const id_end = data.map((d) => d.properties.CODGEO[0]);
    suppr = voisinnage_start.filter(
      (a) => !id_end.includes(a.properties.CODGEO[0])
    );
    ajout = data.filter((a) => !id_start.includes(a.properties.CODGEO[0]));
  } else {
    ajout = data;
    suppr = [];
  }
  return { suppr: suppr, ajout: ajout, all: data };
};

// FUNCTIONS CONTROLLING THE MAP ---------------------------
// Fonctions outils ---------------
const zoomInit = (map) => {
  // Function to retrieve the zoom level
  if (map) {
    return map.getZoom();
  } else {
    return 4.5;
  }
};

const centerInit = (map) => {
  if (map) {
    return map.getBounds().getCenter();
  } else {
    return [46.8, 1.7];
  }
};

const zoomToTextSize = (map) => {
  // Fonction qui converti le niveau de zoom en taille de texte
  let zoomMove = zoomInit(map);
  if (zoomMove < 9) {
    return "0em";
  } else if (zoomMove === 9) {
    return "0.7em";
  } else if (zoomMove === 10) {
    return "0.8em";
  } else if (zoomMove === 11) {
    return "1em";
  }
};

const d3SelectMap = () => {
  // Function to select the map
  return d3.select("#map").select("svg");
};

const d3SelectTerritoire = (map) => {
  // Fonction qui sélectionne les territoires voisins
  const g = d3.select("#map").attr("pointer-events", "auto").select("svg");

  if (g.select("#selectionnees").empty()) {
    return g
      .append("g")
      .attr("id", "selectionnees")
      .attr("class", "leaflet-zoom-hide");
  } else {
    return g.select("#selectionnees");
  }
};

const d3SelectSelectionneesLegend = () => {
  return d3SelectMap()
    .select("g")
    .attr("id", "selectionnees")
    .selectAll("text");
};

const d3SelectVoisinnage = (map) => {
  // Fonction qui sélectionne les territoires voisins
  const g = d3.select("#map").attr("pointer-events", "none").select("svg");

  if (g.select("#candidates").empty()) {
    return g
      .append("g")
      .attr("id", "candidates")
      .attr("class", "leaflet-zoom-hide");
  } else {
    return g.select("#candidates");
  }
};

// Fonctions composantes ----------------------------------------
const creationLegendeVille = (geo, map) => {
  // Fonction pour ajouter la légende d'une ville nouvellement sélectionnée à la carte

  // Selection de la légende
  const legend = d3SelectSelectionneesLegend();

  // Suppression des légendes précédentes
  legend.remove();

  // Création des nouvelles légendes
  legend
    .data(geo.filter((d) => d.showLegend === true))
    .enter()
    .append("text")
    .attr("id", (s) => s.id)
    .attr("text-anchor", "middle")
    .attr("class", "legendcity")
    .attr("font-size", zoomToTextSize(map))
    .text((d) => d.properties.LIBGEO[0]);

  majLegendeVille(map);
};

const majLegendeVille = (map) => {
  let legend = d3SelectSelectionneesLegend();

  legend
    .attr("font-size", zoomToTextSize(map))
    .attr(
      "transform",
      (d) =>
        "translate(" +
        map.latLngToLayerPoint(d.latLng).x +
        "," +
        map.latLngToLayerPoint(d.latLng).y +
        ")"
    );
};

const removeVoisinnage = (map, voisinnages_suppr) => {
  if (voisinnages_suppr && voisinnages_suppr.length > 0) {
    const ids = voisinnages_suppr.map((d) => id_gen(d.properties.CODGEO[0]));
    ids.map((d) => d3SelectVoisinnage(map).select(`#${d}`).remove());
  } else {
    d3SelectVoisinnage(map).remove();

    d3SelectVoisinnage(map).selectAll("text").remove();
  }
};

const getVoisinnage = async (
  API_URL,
  geographies,
  map,
  voisinnage,
  setVoisinnage,
  change,
  setTerritories,
  setGeographies,
  setRemove
) => {
  // Fonction qui charge les villes voisines

  const ZOOM = zoomInit(map);

  const projectPoint = function (x, y) {
    // Use Leaflets projection API for drawing svg path (creates a stream of projected points)
    const point = map.latLngToLayerPoint(new L.LatLng(x, y));
    this.stream.point(point.x, point.y);
  };

  if (ZOOM >= 9) {
    // Mise à jour du voisinnage
    const { suppr, ajout, all } = await updateVoisinnage(
      API_URL,
      map,
      geographies,
      voisinnage,
      setVoisinnage
    );
    // Suppression des éléments de voisinnage
    let data = null;
    if (change === "drag") {
      removeVoisinnage(map, suppr);
      data = ajout;
    } else if (change === "zoom") {
      removeVoisinnage(map);
      data = all;
    }

    // Use d3's custom geo transform method to implement the above
    const projection = d3.geoTransform({ point: projectPoint });
    // creates geopath from projected points (SVG)
    const pathCreator = d3.geoPath().projection(projection);

    const d = d3SelectVoisinnage(map)
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("id", (d) => id_gen(d.properties.CODGEO[0]))
      // .attr('class','leaflet-interactive')
      .attr("pointer-events", "all")
      .on("mouseover", (d) => {
        d3.select(d.target.parentElement)
          .select("path")
          .attr("class", `z${ZOOM} mouseOver leaflet-interactive`);
        d3.select(d.target.parentElement)
          .select("text")
          .attr("class", `legendVoisin-hover`)
          .attr("visibility", "visible");
      })
      .on("mouseout", (d) => {
        d3.select(d.target.parentElement)
          .select("path")
          .attr("class", `z${ZOOM} normal leaflet-interactive`);
        d3.select(d.target.parentElement)
          .select("text")
          .attr("class", `legendVoisin`)
          .attr("visibility", ZOOM > 10 ? "visible" : "hidden");
      })
      .on("click", (d) => {
        const t = d.target.parentElement.__data__.properties;
        setTerritories((territories) => [...territories, t]);
        addShapeToGeo(t, 2021, API_URL, setGeographies);
      });

    d.append("path")
      .attr("fill-opacity", 0)
      .attr("stroke", "grey")
      .attr("pointer-events", "auto")
      .attr("class", ` z${ZOOM} normal leaflet-interactive`)
      .attr("d", pathCreator);

    d.append("text")
      .attr("class", "legendVoisin")
      .attr("visibility", ZOOM > 10 ? "visible" : "hidden")
      .attr("font-size", zoomToTextSize(map))
      .text((d) => d.properties.LIBGEO[0])
      .attr("x", function (d) {
        return pathCreator.centroid(d)[0];
      })
      .attr("y", function (d) {
        return pathCreator.centroid(d)[1];
      });
    d.exit().remove().transition();
  }
};

// Function to correct lgtltd reversion
const revertLtLg = (coordinates) =>
  coordinates.map((c) => [parseFloat(c[1]), parseFloat(c[0])]);

// Functrion to get center
const centroid = (territories) => {
  const y = territories
    .map((d) => {
      if (d.geometry.type === "Polygon") {
        return d.geometry.coordinates
          .map((c) => c.map((b) => b[0]).flat())
          .flat();
      } else {
        return d.geometry.coordinates
          .map((c) => c.map((b) => b.map((a) => a[0])).flat())
          .flat();
      }
    })
    .flat();
  const x = territories
    .map((d) => {
      if (d.geometry.type === "Polygon") {
        return d.geometry.coordinates
          .map((c) => c.map((b) => b[1]).flat())
          .flat();
      } else {
        return d.geometry.coordinates
          .map((c) => c.map((b) => b.map((a) => a[1])).flat())
          .flat();
      }
    })
    .flat();

  const loc = [
    y.reduce((a, b) => a + b, 0) / y.length,
    x.reduce((a, b) => a + b, 0) / x.length,
  ];

  return loc;
};

// Function to get a territory shape
const apiShape = async (API_URL, t, year) => {
  const response = await fetch(`${API_URL}/getLocationShape`, {
    body: JSON.stringify({
      location_id: t._id.$oid,
      year: year,
    }),
    method: "POST",
    headers: {
      // Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const addShapeToGeo = async (t, year, API_URL, setGeographies) => {
  const data = await apiShape(API_URL, t, year);

  let data_clean = data[0];
  data_clean.geometry.coordinates = [data_clean.geometry.coordinates];
  setGeographies((prev) => [...prev, data_clean]);
};

const removeSelectionnes = (map) => {
  d3SelectTerritoire(map).remove();
};

const updateShape = (
  geographies,
  map,
  setTerritories,
  API_URL,
  setGeographies
) => {
  // Fonction qui charge les territoires sélectionnés
  const ZOOM = zoomInit(map);

  // Fonctions pour D3 et leaflet----------------------

  const projectPoint = function (x, y) {
    // Use Leaflets projection API for drawing svg path (creates a stream of projected points)
    const point = map.latLngToLayerPoint(new L.LatLng(x, y));
    this.stream.point(point.x, point.y);
  };
  // Use d3's custom geo transform method to implement the above
  const projection = d3.geoTransform({ point: projectPoint });
  // creates geopath from projected points (SVG)
  const pathCreator = d3.geoPath().projection(projection);
  //----------------------

  // Suppression des territoires
  removeSelectionnes(map);

  // Ajout des territoires à la carte
  const d = d3SelectTerritoire(map)
    .selectAll("g")
    .data(geographies)
    .enter()
    .append("g")
    .attr("id", (d) => id_gen(d.properties.CODGEO[0]))
    // .attr('class','leaflet-interactive')
    .attr("pointer-events", "all")
    .on("mouseover", (d) => {
      d3.select(d.target.parentElement)
        .select("path")
        .attr("class", `z${ZOOM} legendTerritoire-hover leaflet-interactive`);
      d3.select(d.target.parentElement)
        .select("text")
        .attr("class", `legendTerritoire-text-hover`)
        .attr("visibility", "visible");
    })
    .on("mouseout", (d) => {
      d3.select(d.target.parentElement)
        .select("path")
        .attr("class", `z${ZOOM} legendTerritoire leaflet-interactive`);
      d3.select(d.target.parentElement)
        .select("text")
        .attr("class", `legendTerritoire-text`)
        .attr("visibility", ZOOM > 9 ? "visible" : "hidden");
    })
    .on("click", (d) => {
      const t = d.target.parentElement.__data__.properties;
      removerTerritoryFromAnalysis(null, t, setTerritories, setGeographies);
    });

  d.append("path")
    .attr("fill-opacity", 0)
    .attr("stroke", "grey")
    .attr("pointer-events", "auto")
    .attr("class", ` z${ZOOM} legendTerritoire leaflet-interactive`)
    .attr("d", pathCreator);

  d.append("text")
    .attr("class", "legendTerritoire-text")
    .attr("visibility", ZOOM > 9 ? "visible" : "hidden")
    .attr("font-size", zoomToTextSize(map))
    .text((d) => d.properties.LIBGEO[0])
    .attr("x", function (d) {
      return pathCreator.centroid(d)[0];
    })
    .attr("y", function (d) {
      return pathCreator.centroid(d)[1];
    });

  d.exit().remove();
};

// Function to add a territory to the analysis
const addTerritoryToAnalysis = (
  e,
  t,
  territories,
  setTerritories,
  setSuggestions,
  setQuery,
  suggestions,
  year = 2021,
  API_URL,
  setGeographies
) => {
  e && e.preventDefault();
  if (!territories.some((ter) => ter._id.$oid === t._id.$oid)) {
    setTerritories((territories) => [...territories, t]);
    setSuggestions(suggestions.filter((ter) => ter !== t));
    setQuery("");
    addShapeToGeo(t, year, API_URL, setGeographies);
  } else {
    alert("Already added");
    setQuery("");
  }
};

// Function to remove a territory from the analysis
const removerTerritoryFromAnalysis = (e, t, setTerritories, setGeographies) => {
  e && e.preventDefault();
  let id = t._id.$oid;

  setTerritories((territories) =>
    territories.filter((ter) => ter._id.$oid !== id)
  );
  setGeographies((geographies) =>
    geographies.filter((t) => t.properties._id.$oid !== id)
  );
};

// Function setting the naming of locations
const namingLocation = (t, shorten = false, territories) => {
  if ((t.LIBGEO[0].length > 10) & (shorten === true)) {
    if (territories.length > 1) {
      return (
        t.LIBGEO[0].substring(0, 6) +
        "... (" +
        t.CODGEO[0].substring(0, 2) +
        ")"
      );
    } else {
      return (
        t.LIBGEO[0].substring(0, 10) +
        "... (" +
        t.CODGEO[0].substring(0, 2) +
        ")"
      );
    }
  } else {
    return t.LIBGEO[0] + " (" + t.CODGEO[0].substring(0, 2) + ")";
  }
};

// Function to open drop down of locations added
const openInfo = (e, SEARCH_BAR_REF, setModal) => {
  setModal({
    clientX: SEARCH_BAR_REF.current.offsetLeft,
    clientY: SEARCH_BAR_REF.current.offsetTop,
    open: true,
  });
};

// Modal styling (=> the dropdown of locations)
const styleModal = (modal, SEARCH_BAR_REF) => {
  const width = SEARCH_BAR_REF.current.offsetWidth * 0.25;
  return {
    width: width,
    top: modal.clientY,
    left: modal.clientX,
    borderRadius: 7,
  };
};

export {
  apiRecommendation,
  handleSearch,
  addTerritoryToAnalysis,
  namingLocation,
  removerTerritoryFromAnalysis,
  openInfo,
  styleModal,
  zoomToTextSize,
  zoomInit,
  creationLegendeVille,
  majLegendeVille,
  getVoisinnage,
  removeVoisinnage,
  removeSelectionnes,
  updateShape,
  centroid,
};
