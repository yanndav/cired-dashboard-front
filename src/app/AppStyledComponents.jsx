import styled from "styled-components";
const Logo = styled.img`
  width: ${(props) =>
    typeof props.size !== "undefined" ? props.size + "em" : "1em"};
  margin-right: 7px;
  transition: 0.1s width, 0.1s margin, 0.1s filter;
`;

export { Logo };
