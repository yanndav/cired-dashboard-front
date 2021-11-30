import EtiquetteDeModule from "./EtiquetteDeModule";
const ModulesEtiquettes = ({ selectedModules, setSelectedModules }) => {
  return (
    <div className="modules-container">
      {selectedModules.map((d, i) => (
        <EtiquetteDeModule
          d={d}
          setSelectedModules={setSelectedModules}
          keyI={i}
        />
      ))}
    </div>
  );
};

export default ModulesEtiquettes;
