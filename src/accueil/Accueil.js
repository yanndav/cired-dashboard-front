import "./Accueil.css";

import Header from "../components/header/Header";
import { NavLink } from "react-router-dom";

const Accueil = () => {
  return (
    <>
      <Header />
      <div className="container-accueil">
        <div class="flx-column flx-gap-big">
          <div>
            <h2 className="ft-2-5">
              Créez un tableau de bord des évolutions de votre territoire.
            </h2>
            <h3>
              À partir de sources de données officielles et de savoirs experts,
              nous décrivons, modélisons et expliquons les transitions en cours
              sur votre territoire.
            </h3>
          </div>
          <div className="flx-row flx-sb flx-gap-big flx-shrink">
            <div className="flx-row flx-center">
              <NavLink
                to="/tableau"
                className="lien-bouton bouton-accueil"
                exact
              >
                <p> Créer un tableau</p>
              </NavLink>
            </div>

            <div className="flx-column flx-gap-small" id="apropos">
              <h3>Comment ça marche ?</h3>
              <div className="flx-row flx-center">
                <div className="logo-boite">🔍️</div>
                <div className="explication-boite">
                  <span className="emphase">
                    Définissez votre périmètre territorial
                  </span>
                  . À partir de la barre de recherche et de l’outil dédié vous
                  pouvez sélectionner les communes, intercommunalités,
                  départements et/ou régions qui vous intéressent.
                </div>
              </div>
              <div className="flx-row flx-center">
                <div className="logo-boite">🎛️</div>
                <div className="explication-boite">
                  <span className="emphase">
                    Sélectionnez des modules d’analyse
                  </span>
                  . Proposés et conçus par des experts et à partir de données
                  officielles, les modules couvrent une large gamme thématique :
                  démographie, tissu productif, usages du sol, etc...{" "}
                </div>
              </div>
              <div className="flx-row flx-center">
                <div className="logo-boite">💾</div>
                <div className="explication-boite">
                  <span className="emphase">
                    Personnalisez, enregistrez et partagez
                  </span>
                  . Ajustez le tableau de bord à vos besoins et diffusez les
                  analyses de votre territoire.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accueil;
