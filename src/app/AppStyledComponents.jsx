import styled from "styled-components";
import { colorsLight } from "./colorComponents";
import { useEffect, useState, useRef } from "react";

const Logo = styled.img`
  width: ${(props) =>
    typeof props.size !== "undefined" ? props.size + "em" : "1.6em"};
  margin-right: 2px;
  transition: 0.1s width, 0.1s margin, 0.1s filter;
  cursor: pointer;
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

export { Logo, TextHighlight, AnimatedTextHighlight };
