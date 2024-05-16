import { toDaysMonthsYears } from "../../../../utils/formatTimeStamp";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { patchArticleLikes } from "../../../../utils/apiRequest";
import { useState } from "react";
import ErrorMessage from "../../../modals/ErrorMessage"
import { useContext } from "react";
import { UserContext } from "../../../../contexts/User";
import styled from "styled-components";

const ButtonContainer = styled.div`
display: flex;
gap: 20px;
justify-content: right;
margin: 20px;
`

const ArticleCardFull = ({ article }) => {
  const { currentUser } = useContext(UserContext);
  const [currentVotes, setCurrentVotes] = useState(article.votes);
  const [likePressed, setLikePressed] = useState(false);
  const [dislikePressed, setDislikePressed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const likeOnClickHandler = () => {
    if (currentUser === null) {
      setErrorMessage("You must be logged in to vote");
      setShowModal(true);
    } else {
      let increment = 1;
      if (dislikePressed) {
        increment = 2;
      }
      if (!likePressed) {
        setCurrentVotes((currentVotes) => currentVotes + increment);
        try {
          patchArticleLikes(article.article_id, increment);
        } catch (error) {
          console.log(error);
        }
      } else {
        setCurrentVotes((currentVotes) => currentVotes - increment);
        try {
          patchArticleLikes(article.article_id, -increment);
        } catch (error) {
          console.log(error);
        }
      }
      setLikePressed(!likePressed);
      if (dislikePressed === true) {
        setDislikePressed(false);
      }
    }
  };

  const dislikeOnClickHandler = () => {
    if (currentUser === null) {
      setErrorMessage("You must be logged in to vote");
      setShowModal(true);
    } else {
      let decrement = 1;
      if (likePressed) {
        decrement = 2;
      }
      if (!dislikePressed) {
        setCurrentVotes((currentVotes) => currentVotes - decrement);
        try {
          patchArticleLikes(article.article_id, -decrement);
        } catch (error) {
          console.log(error);
        }
      } else {
        setCurrentVotes((currentVotes) => currentVotes + decrement);
        try {
          patchArticleLikes(article.article_id, +decrement);
        } catch (error) {
          console.log(error);
        }
      }
      setDislikePressed(!dislikePressed);
      if (likePressed === true) {
        setLikePressed(false);
      }
    }
  };

  return (
    <>
      <ErrorMessage
        showModal={showModal}
        setShowModal={setShowModal}
        errorMessage={errorMessage}
      />
      <Card
        className="bg-secondary"
        style={{ maxWidth: "1000px", textAlign: "center" }}
      >
        <Card.Header className="text-black h1">{article.title}</Card.Header>
        <Card.Img src={article.article_img_url}></Card.Img>
        <Row className="mt-3">
          <Col xs={6}>
            <Card.Text>
              <FontAwesomeIcon
                icon={faAt}
                color="black"
                aria-label="author icon"
                title="author:"
              />{" "}
              {article.author}
            </Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text>
              <FontAwesomeIcon
                icon={faBook}
                color="black"
                aria-label="topic icon"
                title="topic:"
              />{" "}
              {article.topic}
            </Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text>
              <FontAwesomeIcon
                icon={faThumbsUp}
                color="black"
                aria-label="votes icon"
                title="votes:"
              />{" "}
              {currentVotes}
            </Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text>
              {" "}
              <FontAwesomeIcon
                icon={faComment}
                color="black"
                aria-label="comments icon"
                title="comments:"
              />{" "}
              {article.comment_count}
            </Card.Text>
          </Col>
        </Row>
        <Card.Body className="text-black">{article.body}</Card.Body>
        <ButtonContainer>
            <FontAwesomeIcon
              icon={faThumbsUp}
              color={likePressed ? "darkgreen" : "black"}
              aria-label="like button"
              title="like button"
              size="2xl"
              onClick={likeOnClickHandler}
            />
            <FontAwesomeIcon
              icon={faThumbsDown}
              color={dislikePressed ? "red" : "black"}
              aria-label="dislike button"
              title="dislike button"
              size="2xl"
              onClick={dislikeOnClickHandler}
            />
        </ButtonContainer>
        <Card.Footer>
          Posted: {toDaysMonthsYears(article.created_at)}
        </Card.Footer>
      </Card>
    </>
  );
};

export default ArticleCardFull;
