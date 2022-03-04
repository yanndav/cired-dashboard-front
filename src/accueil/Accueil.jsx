// -----------------------------------------------------------------------
// -- PAGE D'ACCUEIL DE TV
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS -----------------------------
// import "./Accueil.css";
import styled from "styled-components";
import { colorsLight } from "../app/colorComponents";

import Header from "../app/components/header/Header.jsx";
import { NavLink } from "react-router-dom";

const ContainerAccueil = styled.div`
  padding: 0px 15%;
  min-width: 400px;
  background-color: ${colorsLight.background};
`;

const ColumnFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.big ? "100px" : "30px")};
  min-height: ${(props) => props.full && "95vh"};
  padding-bottom: ${(props) => (props.full ? "30px" : "100px")};
`;

// const RowFlexContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   /* gap: 80px; */
//   flex-wrap: wrap;

// `;

const TitrePage = styled.h2`
  font-size: 2.4em;
  color: ${colorsLight.title2};
  font-weight: none;
`;

const SousTitrePage = styled.h3`
  font-size: 1.4em;
  line-height: 1.4em;
  font-weight: none;
`;

const BoutonTableau = styled(NavLink)`
  z-index: 0;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.3em;
  width: 300px;
  min-width: 300px;
  height: 50px;

  margin: 0px auto;
  padding: 15px 12px;
  border-radius: 8px;
  background-color: ${colorsLight.title2};
  color: white;
  position: relative;
  top: 0;
  box-shadow: white;
  transition: top ease 0.2s, box-shadow ease 0.1s, 0.1s background-color;
  /* Text centering */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    /* Box animation on hover */
    box-shadow: 3px 3px 7px rgba(168, 168, 168, 0.801);
    top: -2px;
    cursor: pointer;
    filter: brightness(110%);
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.small ? "10px" : "40px")};
`;

const Argument = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;
const ZoneTexte = styled.div`
  text-align: justify;
  line-height: 2em;
`;
const Emphase = styled.span`
  color: ${colorsLight.title};
  font-weight: bolder;
`;

const Icone = styled.div`
  font-size: 3em;
  margin: 10px 30px;
  text-align: center;
`;

const WordCloud = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const Mot = styled.div`
  color: ${colorsLight.title};
  font-size: ${(props) => props.size * 1.2 + "em"};
`;

const Lien = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    color: ${colorsLight.interaction};
  }
`;
// COMPOSANT --------------------------------

const Accueil = () => {
  return (
    <>
      <Header sticky />
      <ContainerAccueil>
        <ColumnFlexContainer full big>
          <Section small>
            <TitrePage>
              Analysez et comparez les transitions dans votre territoire.
            </TitrePage>
            <SousTitrePage>
              Créez et personnalisez vos tableaux de bord à partir de modules
              d'analyse de données locales et de modélisations.
            </SousTitrePage>
          </Section>
          <BoutonTableau to="/tableau" exact>
            Créer un tableau
          </BoutonTableau>
        </ColumnFlexContainer>
        <ColumnFlexContainer big>
          <Section>
            <SousTitrePage>Comment ça marche ?</SousTitrePage>
            <Argument>
              <Icone>🔍️</Icone>
              <ZoneTexte>
                <Emphase>Définissez votre périmètre territorial</Emphase>. À
                partir de la barre de recherche et de l’outil dédié vous pouvez
                définir librement votre périmètre territorial en sélectionnant
                un ensemble de communes, intercommunalités, départements et/ou
                régions de France.
              </ZoneTexte>
            </Argument>
            <Argument>
              <Icone>🎛️</Icone>
              <ZoneTexte>
                <Emphase>Sélectionnez des modules d’analyse</Emphase>.
                Construisez votre tableau de bord en sélectionnant des modules
                d'analyse et de modélisation qui s'adaptent à votre territoire.
                Vous pouvez également définir des territoires de comparaison.
              </ZoneTexte>
            </Argument>
            <Argument>
              <Icone>💾</Icone>
              <ZoneTexte>
                <Emphase>Personnalisez, enregistrez et partagez</Emphase>.
                Ajustez le tableau de bord à vos besoins et diffusez les
                analyses de votre territoire.
              </ZoneTexte>
            </Argument>
          </Section>
          <Section>
            <SousTitrePage>La rigueur scientifique accessible</SousTitrePage>
            <Argument>
              <ZoneTexte>
                Développé dans une démarche de
                <Emphase> recherche-action par une équipe du CIRED</Emphase>,
                ComparaTer se construit en{" "}
                <Emphase>partenariat avec des décideurs territoriaux </Emphase>
                issus de plusieurs régions de France.
              </ZoneTexte>
            </Argument>
            <Argument>
              <ZoneTexte>
                Nos modules thématiques sont{" "}
                <Emphase>pré-configurés par un réseau de scientifiques</Emphase>{" "}
                désireux de rendre accessible leurs résultats de recherche.
                Toutes les analyses sont issues de données officielles et
                ouvertes.
              </ZoneTexte>
            </Argument>
            <Argument>
              <ZoneTexte>
                ComparaTer propose ainsi{" "}
                <Emphase>
                  une expérience de médiation scientifique interactive
                </Emphase>{" "}
                pour accompagner des décisions basées sur des analyses
                rigoureuses.
              </ZoneTexte>
            </Argument>
          </Section>
          <Section>
            <SousTitrePage>
              Une large gamme de modules thématiques pour soutenir les projets
              d'écodéveloppement
            </SousTitrePage>
            <Argument>
              <ZoneTexte>
                Le développement de modules s'appui sur les demandes des
                décideurs territoriaux avec lesquels nous travaillons. Pour
                répondre à leurs questionnements, une variété de thématiques
                pourront à terme être analysés via ComparaTer.
              </ZoneTexte>
            </Argument>
            <WordCloud>
              <Mot size={1}>logement</Mot>
              <Mot size={0.7}>formation</Mot>
              <Mot size={1.7}>emploi</Mot>
              <Mot size={1.2}>agriculture</Mot>
              <Mot size={0.9}>démographie</Mot>
              <Mot size={1.3}>usage des sols</Mot>
              <Mot size={1.8}>déchets</Mot>
              <Mot size={0.7}>tissu productif</Mot>
              <Mot size={1.2}>Énergie</Mot>
            </WordCloud>
            <Argument>
              <ZoneTexte>
                Si vous souhaitez suggérer le développement de modules, ou être
                informé de l'évolution du projet :{" "}
                <Emphase>
                  {" "}
                  <Lien href="mailto:yann.david@enpc.fr" target="_blank">
                    contactez-nous !
                  </Lien>
                </Emphase>
              </ZoneTexte>
            </Argument>
          </Section>
        </ColumnFlexContainer>
      </ContainerAccueil>
    </>
  );
};

export default Accueil;
