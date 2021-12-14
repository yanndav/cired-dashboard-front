import "leaflet/dist/leaflet.css";
import L, { popup } from "leaflet";
import * as d3 from "d3";
import { width } from "@mui/system";

// --------------------------------------------
// FONCTIONS DE CLE
// ----------------------------------------------------

const keyGen = (nom) =>
  // Fonction qui génère une clé à partir d'un string
  nom
    .replace(/\s/g, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z]/g, "");

const id_gen = (CODGEO) =>
  CODGEO.split("")
    .map((d) => num_to_let(d))
    .join("");

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

// --------------------------------------------------
//  FONCTIONS DE GESTION DES DONNEES
// ----------------------------------------------------

const arrayYear = (data) =>
  // Fonction qui retourne un array des années contenus dans les layers
  Array.from(
    new Set(
      data
        .map((layer) => layer.GEOMETRY.map((geom) => geom.properties.ANNEE))
        .flat()
    )
  );

// Fonction qui retourne l'année minimum
const yearMin = (years) => Math.min(...years);

// Fonction qui retourne l'année max
const yearMax = (years) => Math.max(...years);

// ----------------------------------------------------
//  FONCTIONS DE GESTION DES ELEMENTS DE CARTOGRAPHIE
// ----------------------------------------------------

const d3SelectTerritoire = (idmap, idlayer) => {
  // Fonction qui sélectionne les territoires
  let g = d3.select("#" + idmap).attr("pointer-events", "auto");

  if (g.select("svg").empty()) {
    g = g.append("svg").select("svg");
  } else {
    g = g.select("svg");
  }

  if (g.select("#" + idmap + "-" + idlayer).empty()) {
    return g
      .append("g")
      .attr("id", idmap + "-" + idlayer)
      .attr("class", "leaflet-zoom-hide");
  } else {
    return g.select("#" + idmap + "-" + idlayer);
  }
};

const removeSelectionnes = (idmap, idlayer) => {
  d3SelectTerritoire(idmap, idlayer).remove();
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

// Fonctions outils ---------------
const zoomInit = (map) => {
  // Function to retrieve the zoom level
  if (map) {
    return map.getZoom();
  } else {
    return 4.5;
  }
};

const getLegend = (layer, geom) => {
  return layer.MODALITES.filter((c) => c.CODE === geom.properties.VALEUR)[0]
    .LIBELLE;
};

const getTerritory = (geom) => {
  return geom.properties.CODGEO;
};

const setWidth = (geom, layer) => {
  const legend = getLegend(layer, geom);
  const territory = getTerritory(geom);
  const width =
    territory.length >= legend.territory ? territory.length : legend.length;
  return width * 8;
};

const getTranslate = (pathCreator, geom, e, layer) => {
  return (
    "translate(" +
    (pathCreator.centroid(geom)[0] - setWidth(geom, layer) / 2) +
    "," +
    (e.target.parentElement.childNodes[0].getBBox()["y"] -
      e.target.parentElement.childNodes[0].getBBox()["height"] / 2 -
      30) +
    ")"
  );
};

const removeToolTip = (g, layer, geom) => {
  g.select(
    "#tooltip-" +
      keyGen(layer.VARIABLE.CODE) +
      "-" +
      id_gen(geom.properties.CODGEO)
  )
    .style("opacity", "0")
    .remove();
};

const toolTip = (g, layer, geom, translate) => {
  let toolTip = g
    .append("g")
    .attr(
      "id",
      "tooltip-" +
        keyGen(layer.VARIABLE.CODE) +
        "-" +
        id_gen(geom.properties.CODGEO)
    )
    .attr("transform", translate)
    .style("transition", "opacity 0.3s ease")
    .style("opacity", "100")
    .attr("width", setWidth(geom, layer))
    .attr("height", "50px");

  toolTip
    .append("rect")
    .attr("fill", "var(--main-tv-color)")
    .style("rx", "7px")
    .style("ry", "7px")

    .attr("opacity", "0.7")
    .attr("width", setWidth(geom, layer))
    .attr("height", "50px");

  toolTip
    .append("line")
    .style("stroke", "white")
    .style("stroke-width", 0.5)
    .attr("x1", 0)
    .attr("x2", setWidth(geom, layer))
    .attr("y1", 22)
    .attr("y2", 22);

  toolTip
    .append("text")
    .attr("class", "ft-tv ft-1-2")
    .text(getTerritory(geom))
    .attr("transform", `translate(${setWidth(geom, layer) / 2},15)`)
    .attr("text-anchor", "middle")
    .style("fill", "white");

  toolTip
    .append("text")
    .attr("class", "ft-tv ft-1 bolder")
    .text(getLegend(layer, geom))
    .attr("transform", `translate(${setWidth(geom, layer) / 2},39)`)
    .attr("text-anchor", "middle")
    .style("fill", "white");

  return toolTip;
};

const setStroke = (shapes, design) => {
  const contour = design.CONTOUR;

  if (contour === "EPAIS") {
    return shapes.attr("stroke", "#0aaacb").attr("stroke-width", "4");
  } else if (contour === "FIN") {
    return shapes
      .attr("stroke", "rgba(223, 223, 223, 0.76)")
      .attr("stroke-width", "1");
  } else if (contour === "NONE") {
    return shapes.attr("stroke", "transparent").attr("stroke-width", "-10");
  }
};

const updateShape = (layer, map, id, design) => {
  // console.log("les donnees dy layer", layer.GEOMETRY);
  console.log(design);
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
  removeSelectionnes(id, keyGen(layer.VARIABLE.CODE));

  // Ajout des territoires à la carte
  let g = d3SelectTerritoire(id, keyGen(layer.VARIABLE.CODE));
  let groupShapes = g
    .selectAll("g")
    .attr("id", "shapes-" + keyGen(layer.VARIABLE.CODE))
    .data(layer.GEOMETRY)
    .enter()
    .append("g")
    .attr(
      "id",
      (geom) =>
        "shape-" +
        keyGen(layer.VARIABLE.CODE) +
        "-" +
        id_gen(geom.properties.CODGEO)
    )
    .attr("class", "leaflet-interactive")
    .attr("pointer-events", "auto");

  let shapes = groupShapes
    .append("path")
    .attr("fill-opacity", 0.8)
    .attr("pointer-events", "auto")
    .attr("class", ` leaflet-interactive`)
    .attr("d", pathCreator)
    .attr("fill", "blue")
    .on("mouseover", (e) => {
      return toolTip(
        g,
        layer,
        e.target.__data__,
        getTranslate(pathCreator, e.target.__data__, e, layer)
      );
    })
    .on("mouseout", (e) => {
      removeToolTip(g, layer, e.target.__data__);
    });

  setStroke(shapes, design);

  return shapes.exit().remove();
};

export { updateShape, removeSelectionnes, arrayYear, yearMax, yearMin, keyGen };
