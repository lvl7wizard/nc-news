import { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faThumbsUp,
  faThumbsDown,
  faAt,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { toDaysMonthsYears } from "../../../../utils/formatTimeStamp";
import { patchArticleLikes } from "../../../../utils/apiRequest";
import ErrorMessage from "../../../modals/ErrorMessage";
import { UserContext } from "../../../../contexts/User";

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  margin: 20px;
`;

const ArticleCardFull = ({ article }) => {
  const { currentUser } = useContext(UserContext);
  const { article_id, title, article_img_url, author, topic, votes, comment_count, body, created_at } = article;
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [likePressed, setLikePressed] = useState(false);
  const [dislikePressed, setDislikePressed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVote = async (type) => {
    if (!currentUser) {
      setErrorMessage("You must be logged in to vote");
      setShowModal(true);
      return;
    }

    let increment = 0;

    if (type === "like") {
      increment = likePressed ? -1 : (dislikePressed ? 2 : 1);
      setLikePressed(!likePressed);
      if (dislikePressed) setDislikePressed(false);
    } else if (type === "dislike") {
      increment = dislikePressed ? 1 : (likePressed ? -2 : -1);
      setDislikePressed(!dislikePressed);
      if (likePressed) setLikePressed(false);
    }

    try {
      await patchArticleLikes(article_id, increment);
      setCurrentVotes(currentVotes + increment);
    } catch (error) {
      console.error("Error updating votes:", error);
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
        className="border-white border-opacity-50 bg-secondary bg-opacity-25 text-light"
        style={{ maxWidth: "1000px", textAlign: "center" }}
      >
        <Card.Header className="h1">{title}</Card.Header>
        <Card.Img src={article_img_url} alt={`Article image for ${title}`} />
        <Row className="mt-3">
          <Col xs={6}>
            <Card.Text>
              <FontAwesomeIcon
                icon={faAt}
                color="lightblue"
                aria-label="author icon"
                title="author:"
              />{" "}
              {author}
            </Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text>
              <FontAwesomeIcon
                icon={faBook}
                color="pink"
                aria-label="topic icon"
                title="topic:"
              />{" "}
              {topic}
            </Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text>
              <FontAwesomeIcon
                icon={faThumbsUp}
                color="lightgreen"
                aria-label="votes icon"
                title="votes:"
              />{" "}
              {currentVotes}
            </Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text>
              <FontAwesomeIcon
                icon={faComment}
                color="burlywood"
                aria-label="comments icon"
                title="comments:"
              />{" "}
              {comment_count}
            </Card.Text>
          </Col>
        </Row>
        <Card.Body>{body}</Card.Body>
        <ButtonContainer>
          <FontAwesomeIcon
            icon={faThumbsUp}
            color={likePressed ? "lightgreen" : "white"}
            aria-label="like button"
            title="like button"
            size="2x"
            onClick={() => handleVote("like")}
          />
          <FontAwesomeIcon
            icon={faThumbsDown}
            color={dislikePressed ? "pink" : "white"}
            aria-label="dislike button"
            title="dislike button"
            size="2x"
            onClick={() => handleVote("dislike")}
          />
        </ButtonContainer>
        <Card.Footer className="text-black bg-secondary bg-opacity-50">
          Posted: {toDaysMonthsYears(created_at)}
        </Card.Footer>
      </Card>
    </>
  );
};

export default ArticleCardFull;
