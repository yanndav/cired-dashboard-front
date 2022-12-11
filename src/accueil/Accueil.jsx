// -----------------------------------------------------------------------
// -- PAGE D'ACCUEIL DE TV
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS -----------------------------
// import "./Accueil.css";
import styled from "styled-components";
import { colorsLight } from "../app/colorComponents";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeDesign } from "./composants/homeDesign.svg";
import { ReactComponent as LandingTopRight } from "./composants/LandingTopRight.svg";
import { ReactComponent as Target } from "./composants/measurement.svg";
import { ReactComponent as Territories } from "./composants/territoriesLink.svg";
import { ReactComponent as VizOptions } from "./composants/VizOptions.svg";
import { ReactComponent as PipeOperations } from "./composants/PipeOperations.svg";
import { ReactComponent as LogoCired } from "./composants/logo_cired_white.svg";
import { ReactComponent as LogoEnpc } from "./composants/logo_enpc_white.svg";

import Header from "../app/header/Header";
import { IoIosArrowDropdownCircle } from "react-icons/io";

// COMPOSANT --------------------------------

const Accueil = () => {
  const containerRef = useRef(null);
  const refInfo = useRef(null);
  const refMarche = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  // COUNTDOWN
  // Set the date we're counting down to
  const countDownDate = new Date("Jan 9, 2023 08:00:00").getTime();

  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));

  useEffect(() => {
    window.addEventListener("resize", (event) => {
      setWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      <Header
        sticky
        showMenu={showMenu}
        refInfo={refInfo}
        refMarche={refMarche}
      />
      <ContainerAccueil ref={containerRef}>
        <LandingSection full>
          <SectionAccueil width={width < 1000 ? width * 1 : width * 0.6}>
            <ContainerInfos width={width < 1000 ? width * 1 : width * 0.5}>
              <TitrePage className="title">
                Les données au service du pilotage de la transition écologique
              </TitrePage>
              <TextePresentation>
                Une plateforme pour génerer et partager des analyses de données,
                sans code, à partir de données ouvertes et fiables.
              </TextePresentation>
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
            </ContainerInfos>
            <SectionBoutons>
              <CountDown>{daysLeft} jours avant le lancement 🚀</CountDown>
              {/* <BoutonTableau to="/page" exact>
                    <span>Commencer</span>
                    <LogoMetrics />
                  </BoutonTableau> */}
            </SectionBoutons>
          </SectionAccueil>
          {width > 1000 && (
            <ImageBackContainer width={width * 0.4}>
              <HomeImage show={width > 1000} />
            </ImageBackContainer>
          )}
        </LandingSection>
        <ImageBackTop viewBox="" fullMode={width > 1000} />
        <Section ref={refInfo}>
          <SectionTitle>Fonctionnalités</SectionTitle>
          <SectionSubtitle>
            Un outil conçu pour simplifier le diagnostic des enjeux et
            l’évaluation des avancées du pilotage de la transition écologique.
          </SectionSubtitle>
          <FonctionnalitesContainer>
            <FonctionnaliteCard>
              <FonctionnaliteCardTitle>
                Une base de données qui harmonise l’Open Data
              </FonctionnaliteCardTitle>
              <FonctionnaliteCardContainer>
                <FonctionnaliteCardIcon>
                  <TargetIcon />
                </FonctionnaliteCardIcon>
                <FonctionnaliteCardText>
                  Sélectionnez des indicateurs issus de sources officielles sur
                  de nombreuses thématiques
                </FonctionnaliteCardText>
              </FonctionnaliteCardContainer>
              <FonctionnaliteCardContainer>
                <FonctionnaliteCardIcon>
                  <TerritoriesIcon />
                </FonctionnaliteCardIcon>{" "}
                <FonctionnaliteCardText>
                  Démultipliez les échelles territoriales d’analyses, et
                  comparez les évolutions
                </FonctionnaliteCardText>
              </FonctionnaliteCardContainer>
            </FonctionnaliteCard>

            <FonctionnaliteCard>
              <FonctionnaliteCardTitle>
                Le traitement de données collaboratif et sans code
              </FonctionnaliteCardTitle>
              <FonctionnaliteCardContainer>
                <FonctionnaliteCardIcon>
                  <OperationIcon />
                </FonctionnaliteCardIcon>
                <FonctionnaliteCardText>
                  <FonctionnaliteCardParagraph>
                    Filtrez, modifiez et fusionnez les données à la volée pour
                    créer vos indicateurs.
                  </FonctionnaliteCardParagraph>
                  <FonctionnaliteCardParagraph>
                    Vos chaînes de traitement peuvent être modifées sans limite
                    avec vos collaborateurs.
                  </FonctionnaliteCardParagraph>
                </FonctionnaliteCardText>
              </FonctionnaliteCardContainer>
            </FonctionnaliteCard>

            <FonctionnaliteCard>
              <FonctionnaliteCardTitle>
                Des visualisations de données personnalisables et partageables{" "}
              </FonctionnaliteCardTitle>
              <FonctionnaliteCardContainer>
                <FonctionnaliteCardIcon>
                  <VizIcon />
                </FonctionnaliteCardIcon>
                <FonctionnaliteCardText>
                  <FonctionnaliteCardParagraph>
                    Personnalisez le format de visualisation de vos données
                    parmis un nombre toujours plus important de propositions de
                    graphiques.
                  </FonctionnaliteCardParagraph>
                  <FonctionnaliteCardParagraph>
                    Communiquez vos résultats simplement.
                  </FonctionnaliteCardParagraph>
                </FonctionnaliteCardText>
              </FonctionnaliteCardContainer>
            </FonctionnaliteCard>
          </FonctionnalitesContainer>
        </Section>
        <Section>
          <SectionTitle>
            Une plateforme pour favoriser le partage d’expertises
          </SectionTitle>
          <Section2Container>
            <UtilisateursContainer>
              <UtilisateurCard>décideurs publics</UtilisateurCard>
              <UtilisateurCard>producteurs de données</UtilisateurCard>
              <UtilisateurCard>chercheurs</UtilisateurCard>
              <UtilisateurCard>acteurs associatifs</UtilisateurCard>
              <UtilisateurCard>bureaux d’études</UtilisateurCard>
            </UtilisateursContainer>
          </Section2Container>
        </Section>
        <Section>
          <SectionTitle>Ils nous soutiennent </SectionTitle>
          <SectionSubtitle>
            Projet issu d’un travail de recherche-action, nous conservons une
            connexion très forte au monde de la recherche
          </SectionSubtitle>
          <Section3Container>
            <LogosSoutiensContainer>
              <LinkSoutien
                href="https://www.ecoledesponts.fr/"
                target="_blank"
                rel="noreferrer"
              >
                <Enpc />
              </LinkSoutien>
              <LinkSoutien
                href="https://www.centre-cired.fr/"
                target="_blank"
                rel="noreferrer"
              >
                <Cired />
              </LinkSoutien>
            </LogosSoutiensContainer>
          </Section3Container>
        </Section>
      </ContainerAccueil>
    </>
  );
};

const ContainerAccueil = styled.div`
  background-color: ${colorsLight.background};
  display: flex;
  flex-direction: column;
  gap: 90px;
`;

const LandingSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
  width: 100%;
  min-height: ${(props) => props.full && "95vh"};
`;

const ImageBackContainer = styled.div`
  z-index: 1000000;
  width: ${(props) => props.width}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HomeImage = styled(HomeDesign)`
  max-width: 50%;
  max-height: 60vh;
  margin-top: -100px;
  display: ${(props) => (props.show ? "block" : "none")};
`;
const ImageBackTop = styled(LandingTopRight)`
  position: absolute;
  top: 80px;
  right: 0px;
  transform: ${(props) => !props.fullMode && "translateX(00px)"};
  width: ${(props) => (props.fullMode ? "48%" : "20%")};
  min-height: 100vh;

  z-index: 0;
`;

const SectionAccueil = styled.div`
  width: ${(props) => props.width}px;
  padding: 50px 5%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 90px;
`;

const ContainerInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 30px;
  max-width: ${(props) => props.width}px;
`;

const TitrePage = styled.h2`
  font-size: 2em;
  /* color: black; */
  font-weight: 900;
  margin: 0px;
`;

const TextePresentation = styled.p`
  font-size: 1.2em;
  line-height: 2em;
  margin: 0px;
  margin-top: 30px;
`;

const SectionBoutons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 30px;
`;

const CountDown = styled.div`
  gap: 10px;
  z-index: 0;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.3em;
  /* width: 200px; */
  /* height: 50px; */
  padding: 20px 30px;
  border-radius: 8px;
  background-color: ${colorsLight.backgroundlight};
  color: black;
  text-align: center;
  box-shadow: 3px 3px 7px rgba(168, 168, 168, 0.801);
`;

const BoutonTableau = styled(NavLink)`
  display: grid;
  gap: 10px;
  z-index: 0;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.3em;
  width: 200px;
  height: 50px;
  padding: 20px 30px;
  border-radius: 8px;
  background-color: ${colorsLight.backgroundlight};
  color: black;
  transition: top ease 0.2s, box-shadow ease 0.1s, 0.1s background-color,
    color 0.2s ease;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-shrink: 6;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 7px rgba(168, 168, 168, 0.801);
  svg {
    transition: transform 0.2s ease;
  }
  &:hover {
    /* Box animation on hover */
    /* top: -2px; */
    cursor: pointer;
    /* filter: brightness(110%); */

    svg {
      transition: translate 0.2s ease;
      transform: translateY(1px);
    }
    #layer1 {
      box-shadow: 3px 3px 7px rgba(168, 168, 168, 0.801);
      transition: transform 0.2s ease-in-out;
      transform: rotate(-25deg) translate(-550px, 210px);
    }
    #layer3 {
      transition: transform 0.2s ease-in-out;
      transform: rotate(25deg) translate(240px, -450px);
    }
  }
`;

const BoutonPlus = styled.span`
  color: black;
  width: fit-content;
  white-space: nowrap;

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

const CustomArrow = styled(IoIosArrowDropdownCircle)`
  margin-left: 10px;
  transform: scale(1.2);
`;

const Section = styled.div`
  scroll-margin: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  /* color: black; */
  font-weight: 500;
  margin: 0px;
  max-width: 90%;
  width: 900px;

  text-align: center;
`;

const SectionSubtitle = styled.h3`
  font-size: 1.2em;
  font-weight: 500;
  margin: 0px;
  width: 900px;
  max-width: 90%;
  text-align: center;
  line-height: 1.9em;
`;

const FonctionnalitesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 70px;
  flex-wrap: wrap;
  background: url("./Section1.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-position: top 0px left 0px;
  width: 100vw;
`;

const FonctionnaliteCard = styled.div`
  background-color: ${colorsLight.backgroundlight};
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 40px;
  width: 360px;
  max-width: 70%;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 40px;
`;

const FonctionnaliteCardTitle = styled.h4`
  font-size: 1.2em;
  font-weight: 500;
  margin: 0px;
  text-align: center;
`;

const FonctionnaliteCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  flex-shrink: 0;
`;

const FonctionnaliteCardText = styled.div`
  font-size: 1em;
  font-weight: 500;
  margin: 0px;
  line-height: 1.6em;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FonctionnaliteCardParagraph = styled.p`
  font-size: 1em;
  font-weight: 500;
  margin: 0px;
`;

const FonctionnaliteCardIcon = styled.div`
  max-width: 70px;
`;

const TargetIcon = styled(Target)`
  width: 70px;
  max-height: 50px;
  transform: scale(1);
`;
const TerritoriesIcon = styled(Territories)`
  width: 70px;
  max-height: 50px;
  transform: scale(1.4);
`;

const VizIcon = styled(VizOptions)`
  width: 70px;
  max-height: 120px;
  transform: scale(1.4);
`;

const OperationIcon = styled(PipeOperations)`
  width: 70px;
  max-height: 120px;
  transform: scale(1.4);
`;

const Section2Container = styled.div`
  background: url("./Section2.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-position: top 0px right 0px;
  width: 100vw;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UtilisateursContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  row-gap: 60px;
  column-gap: 40px;
  margin: auto;
  max-width: 900px;
`;

const UtilisateurCard = styled.div`
  background-color: ${colorsLight.backgroundlight};
  padding: 20px 40px;
  border-radius: 8px;
  margin: 0px;
  width: fit-content;
  height: fit-content;
`;
const Section3Container = styled.div`
  background: url("./Section3.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogosSoutiensContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  row-gap: 60px;
  column-gap: 40px;
  margin: auto;
  max-width: 900px;
`;

const LinkSoutien = styled.a``;

const Cired = styled(LogoCired)`
  width: 70px;
`;

const Enpc = styled(LogoEnpc)`
  width: 70px;
`;
export default Accueil;
