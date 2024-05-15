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

const NoteMessage = styled.p`
animation: fadeIn 5s;
@keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`

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
      <NoteMessage>
        {" "}
        (Note: This site runs on a free server which may take a minute to wake up 🥱)
      </NoteMessage>
    </div>
  </LoadingContainer>
);

export default Loading;