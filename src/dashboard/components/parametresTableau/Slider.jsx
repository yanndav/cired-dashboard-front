import React, { useState, useEffect, useRef } from "react";
import { Range } from "rc-slider";
import styled from "styled-components";
import { colorsLight } from "../../../app/colorComponents";
import "rc-slider/assets/index.css";

const RangeContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 60px auto 60px;
  grid-gap: 20px;
`;
const CustomRange = styled(Range)`
  & .rc-slider {
    width: inherit;
  }
  & .rc-slider-rail {
    height: 15px;
  }
  & .rc-slider-track {
    background-color: ${colorsLight.background2};
    height: 15px;
  }

  & .rc-slider-handle {
    height: 25px;
    width: 20px;
    margin-top: -5px;
    border-radius: 8px;
    border: solid 3px ${colorsLight.topBackground}!important;

    &:active {
      border: solid 3px ${colorsLight.background2}!important;
    }
    &:hover {
      border: solid 3px ${colorsLight.background2}!important;
    }
    &:visited {
      border: solid 3px ${colorsLight.topBackground}!important;
    }
  }

  & .rc-slider-handle-dragging {
    border-color: ${colorsLight.background2}!important;
    box-shadow: 0 0 5px ${colorsLight.light}!important;
  }
`;

const ValueFixed = styled.div`
  color: black;
  border-radius: 8px;
  border: solid 3px ${colorsLight.topBackground};
  text-align: center;
  padding: 0px;
`;

const ValueChange = styled.input`
  border-radius: 8px;
  border: solid 3px ${colorsLight.topBackground};
  padding: 0px;

  & ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  & ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  & {
    -moz-appearance: textfield;
  }
  text-align: center;
  font-size: inherit;
`;

const SliderValues = ({
  MIN,
  MAX,
  setTempoInclusion,
  KEY,
  MIN_SET,
  MAX_SET,
}) => {
  const [minMax, setMinMax] = useState([
    Math.trunc(MIN_SET),
    Math.trunc(MAX_SET),
  ]);
  const [openMin, setOpenMin] = useState(false);
  const [openMax, setOpenMax] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const updateMinMax = (value) =>
    setTempoInclusion((prev) => {
      let toUpdate = prev.CONDITIONS.find(
        (prevInclus) => prevInclus.KEY === KEY
      );

      toUpdate.CHOIX = toUpdate.CHOIX.map((choix) => ({
        ...choix,
        MIN_SET: value[0],
        MAX_SET: value[1],
      }));

      return {
        ...prev,
        CONDITIONS: [
          ...prev.CONDITIONS.filter((prevInclus) => prevInclus.KEY !== KEY),
          toUpdate,
        ],
      };
    });

  const updateMin = (min) => {
    setTempoInclusion((prev) => {
      let toUpdate = prev.CONDITIONS.find(
        (prevInclus) => prevInclus.KEY === KEY
      );

      toUpdate.CHOIX = toUpdate.CHOIX.map((choix) => ({
        ...choix,
        MIN_SET: min,
      }));

      return {
        ...prev,
        CONDITIONS: [
          ...prev.CONDITIONS.filter((prevInclus) => prevInclus.KEY !== KEY),
          toUpdate,
        ],
      };
    });
    setMinMax((prev) => [min, prev[1]]);
  };

  const updateMax = (max) => {
    setTempoInclusion((prev) => {
      let toUpdate = prev.CONDITIONS.find(
        (prevInclus) => prevInclus.KEY === KEY
      );

      toUpdate.CHOIX = toUpdate.CHOIX.map((choix) => ({
        ...choix,
        MAX_SET: max,
      }));

      return {
        ...prev,
        CONDITIONS: [
          ...prev.CONDITIONS.filter((prevInclus) => prevInclus.KEY !== KEY),
          toUpdate,
        ],
      };
    });
    setMinMax((prev) => [prev[0], max]);
  };

  const useOutsideCloser = (boxRef, which) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
          which === "min" ? setOpenMin(false) : setOpenMax(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [boxRef]);
  };

  useOutsideCloser(leftRef, "min");
  useOutsideCloser(rightRef, "max");
  return (
    <RangeContainer>
      {openMin ? (
        <ValueChange
          ref={leftRef}
          defaultValue={minMax[0]}
          max={minMax[1]}
          min={MIN}
          type="number"
          onKeyDown={(e) =>
            e.key === "Enter" && updateMin(parseInt(e.target.value))
          }
        />
      ) : (
        <ValueFixed onClick={() => setOpenMin((prev) => !prev)}>
          {minMax[0]}
        </ValueFixed>
      )}
      <CustomRange
        min={MIN}
        max={MAX}
        // defaultValue={[Math.trunc(MIN), Math.trunc(MAX)]}
        value={minMax}
        onChange={(value) => setMinMax(value)}
        onAfterChange={updateMinMax}
        allowCross={false}
        ariaLabelGroupForHandles={["test", "test"]}
      />
      {openMax ? (
        <ValueChange
          ref={rightRef}
          defaultValue={minMax[1]}
          min={minMax[0]}
          max={MAX}
          type="number"
          onKeyDown={(e) =>
            e.key === "Enter" && updateMax(parseInt(e.target.value))
          }
        />
      ) : (
        <ValueFixed onClick={() => setOpenMax((prev) => !prev)}>
          {minMax[1]}
        </ValueFixed>
      )}
    </RangeContainer>
  );
};

export default SliderValues;
