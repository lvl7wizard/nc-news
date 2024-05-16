import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import ChangeAccount from "./ChangeAccount.jsx/ChangeAccount";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const MyAccountContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
height: calc(100vh - 60px);
min-height: 150px;
`;

const MyAccount = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <MyAccountContainer>
      {currentUser === null ? (
        <>
        <h2>You must be logged in to view your account</h2>
        <Button href="/">Log in</Button>
        </>
      ) : (
        <ChangeAccount />
      )}
    </MyAccountContainer>
  );
};

export default MyAccount;