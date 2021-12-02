import "./Accueil.css";

import Header from "../components/header/Header";
import { NavLink } from "react-router-dom";

const Accueil = () => {
  return (
    <>
      <Header />
      <div className="container-accueil">
        <p className="intro">
          Bienvenue sur <span class="tw">Transitions Viewer</span>, un outil
          conçu pour aider à la compréhension des enjeux territoriaux et guider
          la prise de décision.
          <br />À partir de sources de données officielles et de savoirs
          experts, nous décrivons, modélisons et expliquons les transitions en
          cours sur votre territoire.
        </p>

        <div className="container-boutons">
          <NavLink to="/tableau" className="lien-bouton bouton-accueil" exact>
            <p>Créer un tableau de bord pour votre territoire</p>
          </NavLink>
          <NavLink
            to="/user-board"
            className="lien-bouton bouton-accueil"
            exact
          >
            <p>
              Se connecter / s'inscrire
              <br />
              <span className="legend-bouton">
                {" "}
                (Personnaliser et sauvegarder son tableau){" "}
              </span>
            </p>
          </NavLink>
        </div>

        <div className="presentation" id="apropos">
          <p className="question">Comment ça marche ?</p>
          <div className="boite">
            <div className="logo-boite">🔍️</div>
            <div className="explication-boite">
              Commencez par définir le périmètre territorial qui vous intéresse.
              À partir de la barre de recherche et de l’outil dédié vous pouvez
              sélectionner les communes, intercommunalités, départements et/ou
              régions qui vous intéressent.
            </div>
          </div>
          <div className="boite">
            <div className="logo-boite">🎛️</div>
            <div className="explication-boite">
              Construisez votre tableau de bord en sélectionnant des modules
              d’analyse dans une bibliothèque construite à partir de savoirs
              experts et de données officielles, et sur toute une gamme de
              thématiques : démographie, tissu productif, usages du sol, etc...{" "}
            </div>
          </div>
          <div className="boite">
            <div className="logo-boite">💾</div>
            <div className="explication-boite">
              Personnalisez les analyses et les représentations de données,
              enregistrez vos découpages territoriaux et vos tableaux de bords.
              Finalement, partagez vos résultats.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accueil;
