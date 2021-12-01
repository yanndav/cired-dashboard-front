import EtiquetteDeModule from "./EtiquetteDeModule";
const ModulesEtiquettes = ({ selectedModules, setSelectedModules }) => {
  return (
    <div className="modules-container">
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
