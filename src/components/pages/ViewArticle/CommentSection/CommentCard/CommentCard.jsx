import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash, faAt } from "@fortawesome/free-solid-svg-icons";
import { toRelativeTime } from "../../../../../utils/formatTimeStamp";
import { deleteCommentById } from "../../../../../utils/apiRequest";
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

  useEffect(() => {
    console.log("showErrorModal state changed:", showErrorModal);
  }, [showErrorModal]);

  const deleteComment = async () => {
    try {
      await deleteCommentById(comment.comment_id);
      const updatedComments = comments.filter(
        (item) => item.comment_id !== comment.comment_id
      );
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
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

  return (
    <>
      <ErrorMessage
        showModal={showErrorModal}
        setShowErrorModal={setShowErrorModal}
        errorMessage={errorMessage}
      />
      <Card
        className="w-100 border-white border-opacity-50 bg-secondary bg-opacity-25 text-light"
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
                  aria-label="likes icon"
                  title="likes:"
                />{" "}
                {comment.votes}
              </Card.Text>
            </Col>
            <Col xs={2} className="text-end">
              {currentUser !== null &&
                comment.author === currentUser.username && (
                  <FontAwesomeIcon
                    icon={faTrash}
                    color="red"
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
