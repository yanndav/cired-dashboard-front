import "./ModuleSelecteur.css";
import { useRef } from "react";

import {
  Back,
  ModalBox,
  HeaderModal,
  TitleModal,
  ClosingButton,
  ParagraphSousTitre,
  LogoModules,
} from "./StyledComparaison";

import BarreRecherche from "./BarreRecherche";

const ModuleSelecteur = ({
  setSelectedModules,
  selectedModules,
  setParam,
  useOutsideCloser,
}) => {
  const refMod = useRef(null);

  const closeModules = () => setParam((prev) => ({ ...prev, modules: false }));

  useOutsideCloser(refMod, "modules");

  return (
    <>
      <Back />
      <ModalBox ref={refMod}>
        <HeaderModal>
          <TitleModal>
            <LogoModules />
            Ajout de modules
          </TitleModal>
          <ClosingButton onClick={closeModules}></ClosingButton>
        </HeaderModal>
        <ParagraphSousTitre>
          Utilisez le moteur de recherche pour trouver les modules de votre
          choix.
        </ParagraphSousTitre>
        <BarreRecherche
          tempo={selectedModules}
          setTempo={setSelectedModules}
          parametre="modules"
        />
      </ModalBox>
    </>
  );
};

export default ModuleSelecteur;
