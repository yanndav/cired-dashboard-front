import styled from "styled-components";
import { colorsLight } from "./colorComponents";
import { ReactComponent as LogoEcolo } from "./Ecolometrics.svg";
import { useEffect, useState, useRef } from "react";

const StyledLogoEcolo = styled(LogoEcolo)`
  width: 50px;
  height: 50px;
  padding: 0px;
  border-radius: 15px;
  transition: transform 0.5s ease-in-out;
  transform: scale(1)
    ${(props) => (props.hoverLogo ? "  translateY(10px)" : "  translateY(5px)")};
  g {
    filter: none;
  }
  #layer1 {
    transition: transform 0.5s ease-in-out;
    transform: ${(props) =>
      props.hoverLogo && "rotate(-25deg) translate(-550px,210px)"};
  }
  #layer3 {
    transition: transform 0.5s ease-in-out;
    transform: ${(props) =>
      props.hoverLogo && "rotate(25deg) translate(240px, -450px)"};
  }
`;

const TextHighlight = styled.span`
  background-image: linear-gradient(
    transparent 60%,
    ${(props) =>
        props.secondary
          ? colorsLight.backgroundlight
          : props.tertiary
          ? colorsLight.topBackground
          : colorsLight.background2}
      60%
  );
  background-size: ${(props) =>
      props.animate ? (props.show ? "100%" : "0%") : "100%"}
    100%;
  background-repeat: no-repeat;
  background-position: 0 110%;
  transition: background-size cubic-bezier(1, -0.11, 0.71, 1.07) 0.5s;
`;

const AnimatedTextHighlight = (props) => {
  const refText = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const onScroll = (refText, setScrolled) => {
    if (refText.current) {
      const topPos = refText.current.getBoundingClientRect().top;
      const scrollPos = window.innerHeight;

      topPos >= scrollPos * 0.65 && setScrolled(false);

      topPos < scrollPos * 0.65 && setScrolled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => onScroll(refText, setScrolled));
    return () => {
      window.removeEventListener("scroll", () =>
        onScroll(refText, setScrolled)
      );
    };
  }, []);

  return (
    <TextHighlight animate show={scrolled} ref={refText} {...props}>
      {props.children}
    </TextHighlight>
  );
};

export { StyledLogoEcolo, TextHighlight, AnimatedTextHighlight };
