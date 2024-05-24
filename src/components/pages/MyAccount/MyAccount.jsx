import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/User";
import AccountsTable from "./AccountsTable/AccountsTable";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MyAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 60px);
  justify-content: center;
  text-align: center;
`;

const ButtonContainer = styled.div`
display: flex;
gap: 20px;
margin-bottom: 20px;
`

const MyAccount = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    setCurrentUser(null);
    navigate(`/`);
  };

  const [showAccountsTable, setShowAccountsTable] = useState(false);
  const onClickChangeAccount = () => {
    setShowAccountsTable(!showAccountsTable);
  };

  return (
    <MyAccountContainer>
      {currentUser === null ? (
        <>
          <h2>You must be logged in to view your account</h2>
          <Button href="/">Log in</Button>
        </>
      ) : (
        <>
          <p>
            You are currently logged in as <mark>{currentUser.username}</mark>
          </p>
          <ButtonContainer>
          <Button onClick={logOut}>Log out</Button>
          <Button
            onClick={onClickChangeAccount}
            disabled={isLoading ? true : false}
          >
            {!isLoading ? "Change account" : "Loading..."}
          </Button>
          </ButtonContainer>
          {showAccountsTable ? (
            <AccountsTable isLoading={isLoading} setIsLoading={setIsLoading} />
          ) : (
            <></>
          )}
        </>
      )}
    </MyAccountContainer>
  );
};

export default MyAccount;