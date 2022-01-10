import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as d3 from "d3";

// --------------------------------------------
// FONCTIONS DE LEGENDE
// --------------------------------------------

const colors = [
  "#005f73",
  "#001219",
  "#0a9396",
  "#94d2bd",
  "#e9d8a6",
  "#ee9b00",
  "#ca6702",
  "#bb3e03",
  "#ae2012",
  "#9b2226",
];

const getModalites = (layer) =>
  // Fonction qui récupère les modalités du layer
  Array.from(
    new Set({ ...layer }.GEOMETRY.map((geom) => geom.properties.VALEUR))
  ).sort();

const setColorsScales = (modalites, colors) => {
  // Fonction qui crée un Array de la taille du nombre de modalités
  return Array(modalites.length).fill(colors).flat();
};

const setColorsLegend = (layer, colors) => {
  // Fonction qui crée un dictionnaire.
  // Clé = modalité, valeur = couleur

  const modalites = getModalites(layer);
  const colorsArray = setColorsScales(modalites, colors);
  return modalites.reduce((obj, k, i) => ({ ...obj, [k]: colorsArray[i] }), {});
};

const setColorGeom = (geom, colorsLegend) => {
  return colorsLegend[geom.properties.VALEUR];
};

const setFill = (shapes, design, colorsLegend) => {
  const remplissage = design.REMPLISSAGE;

  if (remplissage === "MODALITE") {
    return shapes.attr("fill", (geom) => setColorGeom(geom, colorsLegend));
  } else if (remplissage === "NONE") {
    return shapes.attr("fill", "transparent");
  }
  // else if (contour === "FIN") {
  //   return shapes
  //     .attr("stroke", "rgba(223, 223, 223, 0.76)")
  //     .attr("stroke-width", "1");
  // } else if (contour === "NONE") {
  //   return shapes.attr("stroke", "transparent").attr("stroke-width", "-10");
  // }
};

const setStroke = (shapes, design, colorsLegend) => {
  // Fonction qui définit les contours
  const contour = design.CONTOUR;

  if (contour === "EPAIS") {
    return shapes.attr("stroke", "#0aaacb").attr("stroke-width", "3");
  } else if (contour === "FIN") {
    return shapes
      .attr("stroke", "rgba(223, 223, 223, 0.76)")
      .attr("stroke-width", "1");
  } else if (contour === "NONE") {
    return shapes.attr("stroke", "transparent").attr("stroke-width", "-10");
  } else if (contour === "MODALITE") {
    return shapes
      .attr("stroke", (geom) => setColorGeom(geom, colorsLegend))
      .attr("stroke-width", "1");
  }
};

// --------------------------------------------
// FONCTIONS DE CLE
// --------------------------------------------
const simplify = (string) =>
  string
    .replace(/\s/g, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z]/g, "");

const keyGen = (layer) =>
  // Fonction qui génère une clé à partir d'un string
  simplify(layer.VARIABLE.CODE) + "-lay" + layer.LAYER;

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
const d3SelectToolTipArea = (idmap) => {
  let g = d3.select("#" + idmap);
  if (g.select("svg").empty()) {
    g = g.append("svg").select("svg");
  } else {
    g = g.select("svg");
  }
  // if (g.select("#" + idmap + "-tooltip").empty()) {
  //   return g
  //     .append("g")
  //     .attr("id", idmap + "-tooltip")
  //     .attr("class", "leaflet-zoom-hide");
  // } else {
  //   return g.select("#" + idmap + "-tooltip");
  // }
  return g;
};

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
  d3SelectToolTipArea(idmap).select(".tooltip").remove();
};

// const zoomToTextSize = (map) => {
//   // Fonction qui converti le niveau de zoom en taille de texte
//   let zoomMove = zoomInit(map);
//   if (zoomMove < 9) {
//     return "0em";
//   } else if (zoomMove === 9) {
//     return "0.7em";
//   } else if (zoomMove === 10) {
//     return "0.8em";
//   } else if (zoomMove === 11) {
//     return "1em";
//   }
// };

// Fonctions outils ---------------
// const zoomInit = (map) => {
//   // Function to retrieve the zoom level
//   if (map) {
//     return map.getZoom();
//   } else {
//     return 4.5;
//   }
// };

const getLegend = (layer, geom) => {
  const legend = layer.MODALITES.filter(
    (c) => c.CODE.toString() === geom.properties.VALEUR.toString()
  );
  return legend[0] !== undefined
    ? layer.VARIABLE.LIBELLE + " : " + legend[0].LIBELLE
    : "";
};

const getTerritory = (geom) => {
  return geom.properties.LIBGEO;
};

const setWidth = (geom, layer) => {
  const legend = getLegend(layer, geom);
  const territory = getTerritory(geom);
  const width =
    territory.length * 1.2 >= legend.length
      ? territory.length * 1.2
      : legend.length;
  return width * 8;
};

const getTranslate = (pathCreator, geom, e, layer) => {
  return (
    "translate(" +
    (pathCreator.centroid(geom)[0] - setWidth(geom, layer) / 2) +
    "," +
    (pathCreator.centroid(geom)[1] -
      e.target.parentElement.childNodes[0].getBBox()["height"] / 2 -
      30) +
    ")"
  );
};

const removeToolTip = (g, layer, geom) => {
  g.select("#tooltip-" + keyGen(layer) + "-" + id_gen(geom.properties.CODGEO))
    .style("opacity", "0")
    .remove();
};

const toolTip = (g, layer, geom, translate) => {
  let toolTip = g
    .append("g")
    .attr(
      "id",
      "tooltip-" + keyGen(layer) + "-" + id_gen(geom.properties.CODGEO)
    )
    .attr("transform", translate)
    .style("transition", "opacity 0.3s ease")
    .style("opacity", "100")
    .attr("width", setWidth(geom, layer))
    .attr("height", "50px")
    .attr("class", "tooltip");

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

const updateShape = (layer, map, id, design) => {
  // Fonction qui charge les territoires sélectionnés
  // const ZOOM = zoomInit(map);

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
  removeSelectionnes(id, keyGen(layer));

  if (layer) {
    const colorsLegend = setColorsLegend(layer, colors);
    // Ajout des territoires à la carte
    let g = d3SelectTerritoire(id, keyGen(layer));
    let tltip = d3SelectToolTipArea(id);
    let groupShapes = g
      .selectAll("g")
      .attr("id", "shapes-" + keyGen(layer))
      .data(layer.GEOMETRY)
      .enter()
      .append("g")
      .attr(
        "id",
        (geom) =>
          "shape-" + keyGen(layer) + "-" + id_gen(geom.properties.CODGEO)
      )
      .attr("class", "leaflet-interactive")
      .attr("pointer-events", "auto");

    let shapes = groupShapes
      .append("path")
      .attr("fill-opacity", 0.8)
      .attr("pointer-events", "auto")
      .attr("d", pathCreator);

    if (design.CLICKABLE) {
      shapes
        .attr("class", ` leaflet-interactive`)

        .on("mouseover", (e) => {
          d3.select(e.target).style("filter", "brightness(200%)");
          toolTip(
            tltip,
            layer,
            e.target.__data__,
            getTranslate(pathCreator, e.target.__data__, e, layer)
          );
        })
        .on("mouseout", (e) => {
          d3.select(e.target).style("filter", "brightness(100%)");
          removeToolTip(tltip, layer, e.target.__data__);
        });
    }

    setStroke(shapes, design, colorsLegend);
    setFill(shapes, design, colorsLegend);
    return shapes.exit().remove();
  }
};

export {
  updateShape,
  removeSelectionnes,
  arrayYear,
  yearMax,
  yearMin,
  keyGen,
  getModalites,
  simplify,
  colors,
  setColorsLegend,
};
