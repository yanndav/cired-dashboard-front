// import { sliderBottom } from "d3-simple-slider";
// import * as d3 from "d3";

import { Slider } from "@mui/material";

const SliderMap = ({ years, setShowYear }) => {
  // ------------------------------------------------
  // COMPOSANT QUI RETOURNE UN SLIDER DE SELECTION DE L'ANNEE
  // ------------------------------------------------

  const createMarks = (years) => {
    const nb = years.length - 1;
    return years.sort().map((year, i) => {
      return { value: (100 / nb) * i, label: year };
    });
  };
  const marks = createMarks(years);

  function valuetext(value) {
    return `${value}`;
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  const changeYear = (MARKS, value) => {
    setShowYear(MARKS.filter((c) => c.value === value)[0].label);
  };

  return (
    <div className="btn-big">
      <Slider
        valueLabelDisplay="off"
        // aria-label="Restricted values"
        defaultValue={0}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        marks={marks}
        color={"secondary"}
        onChange={(e) => {
          e.preventDefault();
          changeYear(marks, e.target.value);
        }}
      />
    </div>
  );
};

export default SliderMap;

// Création du slider
// const slider = sliderBottom()
//   .min(yearmin)
//   .max(yearmax)
//   .tickValues(years)
//   .value(yearSelected)
//   .marks(years)
//   .tickFormat(d3.format("d"))
//   .width(500)
//   .on("end", (d) => {
//     changeYear(d);
//   });

// const d3selectSlider = (idKey) => {
//   // Fonction qui sélectionne les territoires voisins
//   const g = d3.select("#slider" + idKey);

//   if (g.select("#selector" + idKey).empty()) {
//     return g
//       .attr("width", 600)
//       .attr("height", 100)
//       .append("g")
//       .attr("id", "selector" + idKey)
//       .attr("transform", "translate(50,30)");
//     // .attr("width", 550);
//   } else {
//     return g.select("#selector" + idKey);
//   }
// };

// d3selectSlider(idKey).remove();
// d3selectSlider(idKey).call(slider);

// return <svg id={"slider" + idKey} className="slider"></svg>;
