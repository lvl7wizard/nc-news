import styled from "styled-components";

const AbsoluteCenterContent = styled.div`
  position: absolute;
  top: calc(50% + 32.5px); /* add half the height of the NavBar */
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

export default AbsoluteCenterContent;