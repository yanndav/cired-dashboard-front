import EtiquetteDeModule from "./EtiquetteDeModule";

const ModulesEtiquettes = ({ selectedModules, setSelectedModules }) => {
  return (
    <div className="flx-row x-overflow pdg-box">
      {selectedModules.map((d, i) => (
        <EtiquetteDeModule
          d={d}
          setSelectedModules={setSelectedModules}
          key={i * 100}
        />
      ))}
    </div>
  );
};

export default ModulesEtiquettes;
