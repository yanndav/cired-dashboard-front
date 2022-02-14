import React from "react";
import styled from "styled-components";
import { useRef, useEffect } from "react";

const Box = styled.div`
  position: fixed;
  top: 20%;
  z-index: 500;
  padding: 7px 15px;
  background-color: rgb(255, 255, 255);
  box-shadow: 1px 1px 7px rgba(168, 168, 168, 0.438);
`;
const ComparaisonContainer = ({ setComparaison }) => {
  // Variables
  const boxRef = useRef(null);

  // Hook
  const useOutsideCloser = (boxRef) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
          closeComparaison();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [boxRef]);
  };

  // Functions
  const closeComparaison = () => {
    setComparaison((prev) => ({ ...prev, open: false }));
  };

  // Exécution de la fonction de fermeture de la boîte
  useOutsideCloser(boxRef);
  return (
    <Box ref={boxRef}>
      <h1>Analyse comparative</h1>
      <div onClick={closeComparaison}>❌</div>
    </Box>
  );
};

export default ComparaisonContainer;
