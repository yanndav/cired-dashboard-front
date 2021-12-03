import { TiDelete } from "react-icons/ti";

const EtiquetteDeModule = ({ d, setSelectedModules, keyI }) => {
  return (
    <div className="box btn-big" key={keyI}>
      <span>{d.TITRE}</span>

      <TiDelete
        className="croix"
        onClick={() =>
          setSelectedModules((prev) => prev.filter((m) => m.TITRE !== d.TITRE))
        }
      />
    </div>
  );
};

export default EtiquetteDeModule;
