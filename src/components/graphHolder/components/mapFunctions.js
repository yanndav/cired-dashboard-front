import "leaflet/dist/leaflet.css";
import L, { popup } from "leaflet";
import * as d3 from "d3";

const removeSelectionnes = (id) => {
  d3SelectTerritoire(id).remove();
};

const id_gen = (CODGEO) =>
  CODGEO.split("")
    .map((d) => num_to_let(d))
    .join("");

const d3SelectTerritoire = (id) => {
  // Fonction qui sélectionne les territoires voisins
  const g = d3
    .select("#" + id)
    .attr("pointer-events", "auto")
    .select("svg");

  if (g.select("#selectionnees").empty()) {
    return g
      .append("g")
      .attr("id", "selectionnees")
      .attr("class", "leaflet-zoom-hide");
  } else {
    return g.select("#selectionnees");
  }
};

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

const updateShape = (geographies, map, id, colors) => {
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
  removeSelectionnes(id);

  // Ajout des territoires à la carte
  const d = d3SelectTerritoire(id)
    .selectAll("g")
    .data(geographies)
    .enter()
    .append("g")
    .attr("id", (d) => id_gen(d.properties.CODGEO[0]))
    // .attr('class','leaflet-interactive')
    .attr("pointer-events", "all");
  // .on("mouseover", (d) => {
  //   d3.select(d.target.parentElement)
  //     .select("path")
  //     .attr("class", `z${ZOOM} legendTerritoire-hover leaflet-interactive`);
  //   d3.select(d.target.parentElement)
  //     .select("text")
  //     .attr("class", `legendTerritoire-text-hover`)
  //     .attr("visibility", "visible");
  // })
  // .on("mouseout", (d) => {
  //   d3.select(d.target.parentElement)
  //     .select("path")
  //     .attr("class", `z${ZOOM} legendTerritoire leaflet-interactive`);
  //   d3.select(d.target.parentElement)
  //     .select("text")
  //     .attr("class", `legendTerritoire-text`)
  //     .attr("visibility", ZOOM > 9 ? "visible" : "hidden");
  // })
  // .on("click", (d) => {
  //   const t = d.target.parentElement.__data__.properties;
  //   removerTerritoryFromAnalysis(null, t, setTerritories, setGeographies);
  // });

  d.append("path")
    .attr("fill-opacity", 0.8)
    .attr("stroke", "grey")
    .attr("pointer-events", "auto")
    .attr("class", ` z${ZOOM}  leaflet-interactive`)
    .attr("d", pathCreator)
    .attr("fill", (d) => colors[d.properties.VALEUR]);

  d.append("text")
    .attr("class", "legendTerritoire-text")
    .attr("visibility", ZOOM > 10 ? "visible" : "hidden")
    .attr("font-size", zoomToTextSize(map))
    .text((d) => d.properties.LIBGEO[0])
    .attr("x", (d) => pathCreator.centroid(d)[0])
    .attr("y", (d) => pathCreator.centroid(d)[1]);

  d.exit().remove();
};

export { updateShape, removeSelectionnes };
