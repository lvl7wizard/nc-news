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
`;

const InitialConnect = () => (
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
        typeSpeed={100}
        loop={true}
      />
      <p>
        {" "}
        (Note: This site runs on a free server which may take a minute to wake up 🥱)
      </p>
    </div>
  </LoadingContainer>
);

export default InitialConnect;
