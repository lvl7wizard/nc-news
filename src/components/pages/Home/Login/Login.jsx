import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormText from "react-bootstrap/FormText";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/User";
import { fetchUser } from "../../../../utils/apiRequest";
import rocketIcon from "../../../../assets/Login/rocketIcon.png"
import styled from "styled-components";

const LoginImage = styled.img`
  width: 100px;
  height: 100px;
`;


let Login = ({setIsLoading}) => {
const { setCurrentUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUsernames] = useState([
    "grumpy19",
    "jessjelly",
    "happyamy2016",
    "tickle12",
    "weegembump",
    "cooljmessy",
  ]);
  let [usernameFeedback, setUsernameFeedback] = useState("");
  let [usernameInvalid, setUsernameInvalid] = useState(false);
  let [usernameValid, setUsernameValid] = useState(false);

  useEffect(() => {
    if (username === "") {
      setUsernameValid(false);
      setUsernameInvalid(false);
    } else if (!validUsernames.includes(username)) {
      setUsernameValid(false);
      setUsernameInvalid(false);
      setUsernameFeedback("");
    } else {
      setUsernameValid(true);
      setUsernameInvalid(false);
    }
  }, [username, validUsernames]);

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    if (!validUsernames.includes(username)) {
      event.preventDefault();
      setUsernameInvalid(true);
      setUsernameFeedback("Incorrect username. Please try again.");
    } else {
      event.preventDefault();
        setIsLoading(true);
        fetchUser(username).then((response) => {
            setCurrentUser(response)
            setIsLoading(false);
        })
    }
  };

  return (
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs="auto">
            <Card className="shadow-lg bg-dark bg-opacity-75 text-light">
              <Card.Header className="text-center rounded-top border-bottom-0">
              <LoginImage src={rocketIcon} alt="a cartoon rocket with a circular blue window in launch"/>
                <h2 className="" style={{ textShadow: "2px 2px black" }}>
                  Sign In
                </h2>
              </Card.Header>
              <Card.Body className="text-light rounded-bottom">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <FloatingLabel controlId="floatingUsername" label="Username">
                      <Form.Control
                        required
                        name="username"
                        onChange={updateUsername}
                        type="text"
                        placeholder="Username"
                        aria-describedby="usernameHelpBlock"
                        isInvalid={usernameInvalid}
                        isValid={usernameValid}
                        className="bg-dark text-light"
                      ></Form.Control>
                      <FormText id="usernameHelpBlock" className="text-white">
                        You can use 'grumpy19' for this demo
                      </FormText>
                      <Form.Control.Feedback type="invalid">
                        {usernameFeedback}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
  
                  <Form.Group className="mb-3" controlId="formPassword">
                    <FloatingLabel controlId="floatingPassword" label="Password">
                      <Form.Control
                        required
                        name="password"
                        onChange={updatePassword}
                        type="password"
                        placeholder="Password"
                        aria-describedby="passwordHelpBlock"
                        className="bg-dark text-light"
                      />
                      <Form.Control.Feedback type="invalid">
                        Password cannot be blank.
                      </Form.Control.Feedback>
                      <Form.Text id="passwordHelpBlock" className="text-white">
                        Type anything for the password
                      </Form.Text>
                    </FloatingLabel>
                  </Form.Group>
  
                  <Form.Group className="text-center">
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  

export default Login;