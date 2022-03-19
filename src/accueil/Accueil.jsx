// -----------------------------------------------------------------------
// -- PAGE D'ACCUEIL DE TV
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS -----------------------------
// import "./Accueil.css";
import styled from "styled-components";
import { colorsLight } from "../app/colorComponents";
import { useRef } from "react";

import Header from "../app/components/header/Header.jsx";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ReactComponent as Territory } from "./Territory.svg";
import { ReactComponent as Modules } from "./Modules.svg";

const ContainerAccueil = styled.div`
  padding: 0px 15%;
  /* min-width: 400px; */
  background-color: ${colorsLight.background};
`;

const ColumnFlexContainer = styled.div`
  margin: 0px auto;
  /* max-width: ${(props) => !props.full && "900px"}; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.big ? "100px" : "30px")};
  min-height: ${(props) => props.full && "95vh"};
  padding-bottom: ${(props) => (props.full ? "30px" : "100px")};
`;

const TitrePage = styled.h2`
  font-size: 2.4em;
  color: ${colorsLight.title};
  font-weight: none;
`;

const SousTitrePage = styled.h3`
  font-size: 1.4em;
  line-height: 1.4em;
  font-weight: none;
`;

const BoutonTableau = styled.div`
  z-index: 0;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.3em;
  /* width: 400px; */
  /* min-width: 300px; */
  height: 50px;

  margin: 0px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: ${colorsLight.background2};
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

// const ContactForm = styled.form`
//   display: flex;
//   flex-direction: row;
//   gap: 5px;
// `;

// const MailInput = styled.input`
//   border-radius: 8px;
//   font-size: 1.1em;
//   border: none;
//   text-indent: 20px;
//   min-width: 400px;
//   background: ${colorsLight.topBackground};
// `;

// const SubmitButton = styled.div`
//   height: 50px;
//   text-decoration: none;
//   font-weight: bold;
//   font-size: 1em;
//   color: white;
//   margin: 0px auto;
//   padding: 15px 12px;
//   border-radius: 8px;
//   background-color: ${colorsLight.title2};
//   text-align: center;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   &:hover {
//     opacity: 80%;
//   }
// `;
const Section = styled.div`
  display: flex;
  max-width: ${(props) => props.limitWidth && "800px"};

  flex-direction: column;
  gap: ${(props) => (props.small ? "10px" : "40px")};
`;

// const IconTerritory = styled(Territory)`
//   width: 90px;
//   height: 90px;
//   margin: 12px;
//   padding: 0;
// `;

// const IconModules = styled(Modules)`
//   width: 90px;
//   height: 90px;
//   margin: 12px;
//   padding: 0;
// `;

const Argument = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 50px;
  font-size: 1.1em;
  flex-shrink: ${(props) => props.shrink && 20};
  flex-grow: ${(props) => props.shrink && 20};
  flex-basis: ${(props) => props.shrink && "300px"};
  margin-bottom: ${(props) => props.bottomSpace && "40px"};
`;

const ZoneTexte = styled.div`
  text-align: justify;
  line-height: 2em;
  flex-basis: 300px;
  flex-shrink: 1;
  flex-grow: 10;
`;
const Emphase = styled.span`
  color: ${colorsLight.title};
  font-weight: bolder;
`;

// const Icone = styled.div`
//   font-size: 3em;
//   margin: 10px 30px;
//   text-align: center;
// `;

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

const AnnonceSortie = styled.div`
  font-size: 1em;
`;
const CustomArrow = styled(IoIosArrowDropdownCircle)`
  margin-left: 10px;
  transform: scale(1.2);
`;

const ImgContainer = styled.div`
  /* flex-basis: 600px; */
  flex-grow: 10;
  flex-shrink: 1;
  height: fit-content;
  margin: ${(props) => props.center && "auto"};
`;
const ImageDemo = styled.img`
  width: 100%;
  height: fit-content;
  max-width: 800px;
  filter: drop-shadow(5px 5px 10px rgba(168, 168, 168, 0.801));
`;

// COMPOSANT --------------------------------

const Accueil = () => {
  const refInfo = useRef(null);

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
              Créez et personnalisez des tableaux d'analyses des données en
              libre accès sur votre territoire.
            </SousTitrePage>
          </Section>
          {/* <ContactForm>
            <MailInput type="email" placeholder="Indiquez votre email" />
            <SubmitButton>Tenez moi informé</SubmitButton>
          </ContactForm> */}
          <BoutonTableau
            onClick={() =>
              window.scrollTo({
                top: refInfo.current.getBoundingClientRect().top - 90,
                behavior: "smooth",
              })
            }
          >
            En savoir plus sur le projet <CustomArrow />
          </BoutonTableau>
          <AnnonceSortie>
            La première version en ligne arrive en avril 2022.
          </AnnonceSortie>
        </ColumnFlexContainer>
        <ColumnFlexContainer big ref={refInfo}>
          <Section limitWidth>
            <SousTitrePage>Comparater c'est quoi ?</SousTitrePage>
            <Argument>
              Comparater vise à appuyer le pilotage de la transition écologique
              dans les territoires, en générant des analyses interactives de
              données territorialisées.{" "}
            </Argument>
            <ImgContainer center>
              <ImageDemo
                src="./Screenshot_demo(1).svg"
                alt="Maquette de la future application en ligne"
              />
            </ImgContainer>
          </Section>
          <Section>
            <SousTitrePage>Comment ça marche ?</SousTitrePage>
            <Argument bottomSpace>
              <ZoneTexte>
                <Emphase>Définissez votre périmètre territorial</Emphase>. À
                partir de la barre de recherche et de l’outil dédié vous pouvez
                définir librement votre périmètre territorial et l'échelle
                d'analyse en sélectionnant un ensemble de communes,
                intercommunalités, départements et/ou régions de France.
              </ZoneTexte>
              <ImgContainer>
                <ImageDemo
                  src="./Screenshot_perimetre.png"
                  alt="Maquette de l'espace de sélection du territoire'"
                />
              </ImgContainer>
            </Argument>
            <Argument>
              {/* <IconModules /> */}
              <ZoneTexte>
                <Emphase>Sélectionnez des analyses</Emphase>. Construisez votre
                tableau de bord en sélectionnant des analyses interactives qui
                s'adaptent à votre territoire. Vous pouvez également comparer
                votre territoire à d'autres.
              </ZoneTexte>
              <ImgContainer>
                <ImageDemo
                  src="./Screenshot_analyse.png"
                  alt="Maquette de l'espace de sélection du territoire'"
                />
              </ImgContainer>
            </Argument>
            {/* <Argument>
              <Icone>💾</Icone>
              <ZoneTexte>
                <Emphase>Personnalisez, enregistrez et partagez</Emphase>.
                Ajustez le tableau à vos besoins et diffusez les analyses de
                votre territoire.
              </ZoneTexte>
            </Argument> */}
          </Section>
          <Section limitWidth>
            <SousTitrePage>La rigueur scientifique accessible</SousTitrePage>
            <Argument>
              <ZoneTexte>
                Développé dans une démarche de
                <Emphase> recherche-action par une équipe du CIRED</Emphase>,
                Comparater se construit en{" "}
                <Emphase>partenariat avec des décideurs territoriaux</Emphase>.
              </ZoneTexte>
            </Argument>
            <Argument>
              <ZoneTexte>
                Nos analyses sont{" "}
                <Emphase>
                  pré-configurées et développées par un réseau de scientifiques
                </Emphase>{" "}
                désireux de rendre accessible leurs résultats de recherche.
                Toutes les données utilisées sont officielles, sourcées et
                ouvertes.
              </ZoneTexte>
            </Argument>
            <Argument>
              <ZoneTexte>
                Comparater propose ainsi{" "}
                <Emphase>
                  une expérience de médiation scientifique interactive
                </Emphase>{" "}
                pour accompagner des décisions basées sur des analyses
                rigoureuses.
              </ZoneTexte>
            </Argument>
          </Section>
          <Section limitWidth>
            <SousTitrePage>
              Une large gamme thématique d'analyses pour soutenir les projets
              d'écodéveloppement
            </SousTitrePage>
            <Argument>
              <ZoneTexte>
                Les analyses proposées vise à répondre aux questionnements des
                décideurs territoriaux avec lesquels nous travaillons. Pour
                répondre à leurs problématiques, une variété de thématiques
                pourront à terme être analysés via Comparater.
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
                Si vous souhaitez suggérer le développement d'analyses, ou être
                informé de l'évolution du projet :{" "}
                <Emphase>
                  {" "}
                  <Lien href="mailto:contact@comparater.fr" target="_blank">
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
