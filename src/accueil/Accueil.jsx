// -----------------------------------------------------------------------
// -- PAGE D'ACCUEIL DE TV
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS -----------------------------
// import "./Accueil.css";
import styled from "styled-components";
import { colorsLight } from "../app/colorComponents";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { AnimatedTextHighlight } from "../app/AppStyledComponents";
import Header from "../app/header/Header";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import {
  AnimComparaison,
  AnimPlatform,
  AnimMultiniveau,
} from "./composants/AnimatedImg";

// COMPOSANT --------------------------------

const Accueil = () => {
  const refInfo = useRef(null);
  const refEquipe = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Header
        sticky
        showMenu={showMenu}
        refInfo={refInfo}
        refEquipe={refEquipe}
      />
      <ContainerAccueil>
        <FlexContainer full>
          <FlexContainer row big>
            <Section small>
              <TitrePage className="title">
                <TextHighlight>
                  Une plateforme d'appui au pilotage de la transition écologique
                  des territoires
                </TextHighlight>
              </TitrePage>
              <SousTitrePage>
                Trouvez des analyses interactives et localisées des enjeux de la
                transition
              </SousTitrePage>
            </Section>
            <Section>
              {/* <ContactForm>
                <MailInput type="email" placeholder="Indiquez votre email" />
                <SubmitButton>Tenez moi informé</SubmitButton>
              </ContactForm> */}
              <AnnonceSortie>
                La version beta arrive en ligne en juillet 2022.
              </AnnonceSortie>
            </Section>
          </FlexContainer>
          <BoutonPlus
            onClick={() => {
              refInfo.current.scrollIntoView({
                behavior: "smooth",
              });
              setShowMenu(true);
            }}
          >
            En savoir plus sur le projet <CustomArrow />
          </BoutonPlus>
        </FlexContainer>

        <FlexContainer full big ref={refInfo}>
          <Section limitWidth>
            <SousTitrePage>
              <AnimatedTextHighlight>
                Comparater c'est quoi ?
              </AnimatedTextHighlight>
            </SousTitrePage>
            <Argument column>
              <ZoneTexte noBasis>
                Comparater est une plateforme en ligne destinée aux{" "}
                <AnimatedTextHighlight tertiary>
                  acteurs de la transition écologique dans les territoires
                </AnimatedTextHighlight>
                . Pour{" "}
                <AnimatedTextHighlight tertiary>
                  appuyer le pilotage de ces transformations
                </AnimatedTextHighlight>
                , comparater propose des{" "}
                <AnimatedTextHighlight tertiary>
                  {" "}
                  analyses interactives et localisées des enjeux de la
                  transition.{" "}
                </AnimatedTextHighlight>{" "}
              </ZoneTexte>
              <ZoneTexte noBasis>
                Développé dans une démarche de{" "}
                <AnimatedTextHighlight tertiary>
                  recherche-action
                </AnimatedTextHighlight>{" "}
                par une équipe de l'École des Ponts ParisTech et du Centre
                international de recherche sur l'environnement et le
                développement, comparater se{" "}
                <AnimatedTextHighlight tertiary>
                  co-construit avec des décideurs territoriaux.{" "}
                </AnimatedTextHighlight>{" "}
              </ZoneTexte>
            </Argument>
            {/* <ImgContainer center>
              <ImageDemo
                src="./Screenshot_demo(2).svg"
                alt="Maquette de la future application en ligne"
              />
            </ImgContainer> */}
          </Section>
        </FlexContainer>
        <FlexContainer full>
          <Section limitWidth>
            <SousTitrePage>
              <AnimatedTextHighlight>Comment ça marche ?</AnimatedTextHighlight>
            </SousTitrePage>
            <Argument bottomSpace>
              <ZoneTexte>
                Pour accompagner ces acteurs dans la réalisation de{" "}
                <AnimatedTextHighlight tertiary>
                  diagnostics
                </AnimatedTextHighlight>{" "}
                et dans le{" "}
                <AnimatedTextHighlight tertiary>
                  suivi des trajectoires de leur territoire
                </AnimatedTextHighlight>
                , nous proposons des analyses qui s'articulent autour de trois
                principes fondamentaux : l'approche plateforme, la perspective
                multiniveaux et la logique comparative.
              </ZoneTexte>
            </Argument>
          </Section>
          <FlexContainer row big>
            <Argument column shrink>
              <ZoneTitreImg>
                <AnimPlatform />
                <TitreSousSousSection>
                  <Emphase>
                    <AnimatedTextHighlight tertiary>
                      Une plateforme
                    </AnimatedTextHighlight>
                    , pour regrouper les savoirs.
                  </Emphase>
                </TitreSousSousSection>
              </ZoneTitreImg>
              <ZoneTexte noBasis>
                Comparater connecte des sources de connaissance multiples sur
                les transitions écologiques territoriales. Nos analyses se
                fondent sur des{" "}
                <AnimatedTextHighlight tertiary>
                  {" "}
                  données officielles
                </AnimatedTextHighlight>
                , les{" "}
                <AnimatedTextHighlight tertiary>
                  {" "}
                  cadres règlementaires
                </AnimatedTextHighlight>
                , ainsi que sur des{" "}
                <AnimatedTextHighlight tertiary>
                  expertises scientifiques
                </AnimatedTextHighlight>{" "}
                mais également celles des
                <AnimatedTextHighlight tertiary>
                  {" "}
                  acteurs de la transition
                </AnimatedTextHighlight>
                .
              </ZoneTexte>
            </Argument>
            <Argument column shrink>
              <ZoneTitreImg>
                <AnimMultiniveau />
                <TitreSousSousSection>
                  <Emphase>
                    <AnimatedTextHighlight tertiary>
                      La perspective multiniveaux
                    </AnimatedTextHighlight>
                    , pour mettre les savoirs en résonance.
                  </Emphase>
                </TitreSousSousSection>
              </ZoneTitreImg>
              <ZoneTexte noBasis>
                Pour mettre en résonance ces différents savoirs, comparater
                s'appuie sur la perspective multiniveaux. Cette méthode
                d'analyse{" "}
                <AnimatedTextHighlight tertiary>
                  ancrée dans les sciences sociales
                </AnimatedTextHighlight>{" "}
                envisage la transition écologique comme un{" "}
                <AnimatedTextHighlight tertiary>
                  phénomène multi-échelles
                </AnimatedTextHighlight>
                . Elle invite ainsi à analyser l'évolution des territoires comme
                la résultante de{" "}
                <AnimatedTextHighlight tertiary>
                  forces opérant en leur sein mais aussi en-dehors
                </AnimatedTextHighlight>
                .
              </ZoneTexte>
            </Argument>
            <Argument column shrink>
              <ZoneTitreImg>
                <AnimComparaison />
                <TitreSousSousSection>
                  <Emphase>
                    <AnimatedTextHighlight tertiary>
                      La logique comparative
                    </AnimatedTextHighlight>
                    , pour faire circuler les savoirs.
                  </Emphase>
                </TitreSousSousSection>
              </ZoneTitreImg>
              <ZoneTexte noBasis>
                Afin d'accélerer la transition écologique, il est essentiel de{" "}
                <AnimatedTextHighlight tertiary>
                  capitaliser sur les apprentissages émanants d'autres
                  territoires
                </AnimatedTextHighlight>
                . Comparater permet de comparer librement les trajectoires
                territoriales et ainsi{" "}
                <AnimatedTextHighlight tertiary>
                  mettre en relation les acteurs soumis aux mêmes enjeux{" "}
                </AnimatedTextHighlight>
                .
              </ZoneTexte>
            </Argument>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer big>
          <Section limitWidth>
            <SousTitrePage>
              <AnimatedTextHighlight>
                Quels enjeux de la transition?
              </AnimatedTextHighlight>
            </SousTitrePage>
            <Argument column>
              <ZoneTexte noBasis>
                La démarche de recherche-action nous permet tout à la fois de
                construire les fonctionnalités autour des besoins de nos
                utilisateurs, mais également de prioriser les thèmes des
                analyses que nous mettons progressivement en ligne. Nous allons
                ainsi étoffer progressivement la gamme de questionnements
                auxquels comparater sera capable de répondre. Nous prévoyons de
                traiter un vaste panel de thématiques :
              </ZoneTexte>
            </Argument>
            <WordCloud>
              <Mot size={1}>logement</Mot>
              <Mot size={0.7}>formation</Mot>
              <Mot size={1.7}>emploi</Mot>
              <Mot size={1.2}>agriculture</Mot>
              <Mot size={0.9}>démographie</Mot>
              <Mot size={1.2}>littoral</Mot>
              <Mot size={0.6}>économie circulaire</Mot>
              <Mot size={1.3}>biodiversité</Mot>
              <Mot size={0.8}>émissions de C02</Mot>
              <Mot size={0.6}>eau</Mot>
              <Mot size={1}>inégalités économiques</Mot>
              <Mot size={1.8}>déchets</Mot>
              <Mot size={1}>égalite femmes/hommes</Mot>

              <Mot size={1.3}>usage des sols</Mot>
              <Mot size={0.7}>tissu productif</Mot>
              <Mot size={1.2}>Énergie</Mot>
            </WordCloud>
          </Section>
        </FlexContainer>

        <FlexContainer>
          <Section limitWidth>
            <Argument>
              <ZoneTexte>
                Si vous souhaitez suggérer le développement d'analyses, ou être
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
        </FlexContainer>
      </ContainerAccueil>
    </>
  );
};

const ContainerAccueil = styled.div`
  padding: 0px 15%;
  /* min-width: 400px; */
  background-color: ${colorsLight.background};
`;

const FlexContainer = styled.div`
  margin: 0px auto;
  /* max-width: ${(props) => !props.full && "900px"}; */
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  align-items: ${(props) => (props.row ? "start" : "center")};
  justify-content: center;
  gap: ${(props) => (props.big ? "150px" : "30px")};
  min-height: ${(props) => props.full && "95vh"};
  padding-bottom: ${(props) => (props.full ? "30px" : "100px")};
  flex-wrap: wrap;
`;

const TitrePage = styled.h2`
  font-family: "Ubuntu";
  font-size: 2.4em;
  color: black;
  font-weight: 800;
  /* text-transform: uppercase; */
`;

const TextHighlight = styled.span`
  background-image: linear-gradient(
    transparent 60%,
    ${colorsLight.background2} 60%
  );
  background-size: 100% 102%;
  background-repeat: no-repeat;
  background-position: 0 100%;
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
  background-color: ${colorsLight.background5};
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

const BoutonPlus = styled.span`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 30px auto;
  color: black;
  width: fit-content;

  z-index: 0;
  font-weight: bold;
  font-size: 1.3em;

  border-radius: 8px;
  position: relative;
  top: 0;
  transition: top ease 0.2s, fill ease 1s, background-size ease 0.2s;
  /* Text centering */
  fill: black;

  background-image: linear-gradient(
    transparent 60%,
    ${colorsLight.background2} 60%
  );
  background-size: 0% 102%;
  background-repeat: no-repeat;
  background-position: bottom left;

  &:hover {
    /* Box animation on hover */
    & svg {
      transform: translate(-20);
      fill: ${colorsLight.background2};
    }
    cursor: pointer;
    filter: brightness(110%);
    background-size: 90% 102%;
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
  scroll-margin: 100px;
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
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  flex-wrap: wrap;
  align-items: ${(props) => (props.column ? "start" : "center")};
  justify-content: center;
  gap: ${(props) => (props.column ? "30px" : "50px")};
  font-size: 1.1em;
  flex-shrink: ${(props) => props.shrink && 20};
  flex-grow: ${(props) => props.shrink && 20};
  flex-basis: ${(props) => props.shrink && "300px"};
  margin-bottom: ${(props) => props.bottomSpace && "40px"};
`;

const ZoneTitreImg = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;
const TitreSousSousSection = styled.h3`
  font-size: 1.2em;
`;
const ZoneTexte = styled.div`
  text-align: justify;
  line-height: 2em;
  flex-basis: ${(props) => (props.noBasis ? "0px" : "300px")};
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

export default Accueil;
