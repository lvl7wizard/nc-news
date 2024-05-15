import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";
import { ReactTyped } from "react-typed";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  gap: 32px;
  text-align: center;
  margin-left: 10vw;
  margin-right: 10vw;
`;

const Loading = () => (
  <LoadingContainer>
    <div>
    <ReactLoading
      type={"spinningBubbles"}
      color={"white"}
      height={70}
      width={70}
      alt="spiral of circles indicating loading"
    />
    </div>
    <div>
      <ReactTyped
        strings={["Connecting to server..."]}
        typeSpeed={60}
        loop={true}
      />
    </div>
  </LoadingContainer>
);

export default Loading;