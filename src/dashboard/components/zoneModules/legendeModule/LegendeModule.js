import React from "react";
import Markdown from "marked-react";
import { genererLegende } from "./legendeFunctions";

const LegendeModule = ({ module, layers }) => {
  return (
    <div className="flx-bas-adapt  paragraph mrg-t-40 ">
      <Markdown value={genererLegende(layers, module.LEGENDES)} />
    </div>
  );
};

export default LegendeModule;
