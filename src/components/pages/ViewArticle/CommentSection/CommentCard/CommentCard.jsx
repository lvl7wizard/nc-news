import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrash,
  faAt,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { toRelativeTime } from "../../../../../utils/formatTimeStamp";
import {
  deleteCommentById,
  patchCommentLikes,
} from "../../../../../utils/apiRequest";
import { UserContext } from "../../../../../contexts/User";
import ErrorMessage from "../../../../modals/ErrorMessage";

const CommentCard = ({
  setTriggerFetch,
  comment,
  comments,
  setComments,
  setShowModal,
  setDeleteMessage,
  setDeleteFunction,
}) => {
  const { currentUser } = useContext(UserContext);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [commentVotes, setCommentVotes] = useState(comment.votes);
  const [hasVotedPositive, setHasVotedPositive] = useState(false);
  const [hasVotedNegative, setHasVotedNegative] = useState(false);

  useEffect(() => {}, [showErrorModal]);

  const deleteComment = async () => {
    try {
      await deleteCommentById(comment.comment_id);
      const updatedComments = comments.filter(
        (item) => item.comment_id !== comment.comment_id
      );
      setComments(updatedComments);
    } catch (error) {
      setErrorMessage(
        `Error: ${
          error.response ? error.response.data.msg : error.message
        }. Please refresh and try again.`
      );
      setShowErrorModal(true);
    }
  };

  const deleteOnClickHandler = () => {
    setDeleteMessage("Are you sure you want to delete your comment?");
    setShowModal(true);
    setDeleteFunction(() => deleteComment);
  };

  const handleVote = (vote) => {
    if (!currentUser) {
      setErrorMessage("You must be logged in to vote on comments")
      setShowErrorModal(true)
      return;
    }

    // calculate positive vote change
    if (vote === 1) {
      if (hasVotedPositive) {
        vote = -1;
      } else if (hasVotedNegative) {
        vote += 1;
        setHasVotedNegative(false);
      }
      setHasVotedPositive(!hasVotedPositive);

      // calculate negative vote change
    } else if (vote === -1) {
      if (hasVotedNegative) {
        vote = 1;
      } else if (hasVotedPositive) {
        vote -= 1;
        setHasVotedPositive(false);
      }
      setHasVotedNegative(!hasVotedNegative);
    }
    setCommentVotes((currentVotes) => {
      return currentVotes + vote;
    });
    patchCommentLikes(comment.comment_id, vote).catch((error) => {
      setErrorMessage(`Error: ${error.message}`);
      setShowErrorModal(true);
      setCommentVotes((currentVotes) => {
        return currentVotes - vote;
      });
      setHasVotedPositive(false);
      setHasVotedNegative(false);
    });
  };

  return (
    <>
      <ErrorMessage
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        errorMessage={errorMessage}
      />
      <Card
        className="w-100 border-white border-opacity-75 bg-dark bg-opacity-50 text-light"
        style={{ maxWidth: "1000px" }}
      >
        <Card.Body>
          <Row className="mb-2">
            <Col xs={6}>
              <Card.Title>
                <FontAwesomeIcon
                  icon={faAt}
                  color="lightblue"
                  aria-label="author icon"
                  title="author:"
                />{" "}
                {comment.author}
              </Card.Title>
            </Col>
            <Col xs={6} className="text-end">
              <Card.Subtitle className="text-primary">
                {toRelativeTime(comment.created_at)}
              </Card.Subtitle>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Card.Text>{comment.body}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col xs={10}>
              <Card.Text className="mb-2 text-light">
                <FontAwesomeIcon
                  icon={faHeart}
                  color="pink"
                  aria-label="number of likes"
                  title="likes:"
                />{" "}
                {commentVotes}
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  onClick={() => handleVote(1)}
                  color={hasVotedPositive ? "lightgreen" : "white"}
                  aria-label="like comment button"
                  title="like comment"
                  className="ms-2"
                />
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  onClick={() => handleVote(-1)}
                  color={hasVotedNegative ? "red" : "white"}
                  aria-label="dislike comment button"
                  title="dislike comment"
                  className="ms-1"
                />
              </Card.Text>
            </Col>
            <Col xs={2} className="text-end">
              {currentUser !== null &&
                comment.author === currentUser.username && (
                  <FontAwesomeIcon
                    icon={faTrash}
                    color="grey"
                    aria-label="delete icon"
                    title="delete comment"
                    onClick={deleteOnClickHandler}
                    size="xl"
                  />
                )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default CommentCard;
