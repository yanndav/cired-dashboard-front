import { useState, useEffect, useRef } from "react";
import { ReactComponent as Compare } from "./Comparaison.svg";
import { ReactComponent as Platform } from "./Platform.svg";
import { ReactComponent as Multiniveau } from "./Multiniveau.svg";
import styled from "styled-components";

// COMPARAISON ---------------------

const AnimationCompare = styled.div`
  width: 60px;
  height: 40px;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-right: 20px;
  margin-top: -5px;
  svg {
    /* transform: scale(0.1); */

    #left path {
      transition: 0.7s cubic-bezier(0.45, 0.05, 0.655, 0.95) transform;

      transform: translate(${(props) => (props.show ? "-15px" : "400px")}, 0);
    }
    #right path {
      transition: 0.7s cubic-bezier(0.45, 0.05, 0.655, 0.95) transform;

      transform: translate(${(props) => (props.show ? "15px" : "-450px")}, 0);
    }
  }
`;

const AnimComparaison = (props) => {
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
    <AnimationCompare show={scrolled} ref={refText} {...props}>
      <Compare />
    </AnimationCompare>
  );
};

// PLATFORM ----------------

const AnimationPlatform = styled.div`
  width: 60px;
  height: 40px;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-right: 20px;
  margin-top: -5px;
  svg {
    #c1 {
      transition: 0.2s cubic-bezier(1, -0.01, 1, 1.01) fill-opacity;
      fill-opacity: ${(props) => (props.show ? "1" : "0")};
    }
    #c2 {
      transition: 0.8s cubic-bezier(1, -0.01, 1, 1.01) fill-opacity;
      fill-opacity: ${(props) => (props.show ? "1" : "0")};
    }
    #c3 {
      transition: 1s cubic-bezier(1, -0.01, 1, 1.01) fill-opacity;
      fill-opacity: ${(props) => (props.show ? "1" : "0")};
    }
    #c4 {
      transition: 0.4s cubic-bezier(1, -0.01, 1, 1.01) fill-opacity;
      fill-opacity: ${(props) => (props.show ? "1" : "0")};
    }
    #c5 {
      transition: 0.7s cubic-bezier(1, -0.01, 1, 1.01) fill-opacity;
      fill-opacity: ${(props) => (props.show ? "1" : "0")};
    }
    #lines line {
      transition: 2s cubic-bezier(1, -0.01, 1, 1.01) stroke-opacity;
      stroke-opacity: ${(props) => (props.show ? "1" : "0")};
    }
  }
`;

const AnimPlatform = (props) => {
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
    <AnimationPlatform show={scrolled} ref={refText} {...props}>
      <Platform />
    </AnimationPlatform>
  );
};

// PLATFORM ----------------

const AnimationMultiniveau = styled.div`
  width: 60px;
  height: 40px;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-right: 20px;
  margin-top: -5px;
  svg {
    #rect3 path {
      transition: 1s ease transform;
      transform: translate(0, ${(props) => (props.show ? "0" : "-220px")});
    }

    #rect1 path {
      transition: 1s ease transform;
      transform: translate(0, ${(props) => (props.show ? "0" : "220px")});
    }
  }
`;

const AnimMultiniveau = (props) => {
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
    <AnimationMultiniveau show={scrolled} ref={refText} {...props}>
      <Multiniveau />
    </AnimationMultiniveau>
  );
};

export { AnimComparaison, AnimPlatform, AnimMultiniveau };
