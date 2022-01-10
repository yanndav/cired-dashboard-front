import React from "react";
import SourceEtiquette from "./SourceEtiquette";

const Sources = ({ sources, year }) => {
  const temp = sources.filter((c) => c.ANNEE.includes(year));
  if (temp.length === 1) {
    return <p>Source: {<SourceEtiquette source={temp[0]} />}</p>;
  }
  if (temp.length === 0) {
    return <p>Pas de source déclarée 🤔</p>;
  } else {
    return (
      <p>
        Sources:{" "}
        {temp.map((d, i) =>
          temp.length > i
            ? <SourceEtiquette source={d} /> + ", "
            : "et " + <SourceEtiquette source={d} />
        )}
      </p>
    );
  }
};

export default Sources;
