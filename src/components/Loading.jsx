import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
 
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loading = ({ type, color }) => (
  <LoadingContainer>
    <ReactLoading type={'spin'} color={'white'} height={70} width={70} />
    <p>Loading, please wait...</p>
  </LoadingContainer>
);
 
export default Loading;