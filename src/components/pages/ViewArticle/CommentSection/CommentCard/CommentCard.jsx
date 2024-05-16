import { toRelativeTime } from "../../../../../utils/formatTimeStamp";
import {
  deleteCommentById,
  fetchUserAvatar,
} from "../../../../../utils/apiRequest";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../../../contexts/User";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CommentCard = ({
  setTriggerFetch,
  comment,
  comments,
  setComments,
  setShowModal,
  setDeleteMessage,
  setDeleteFunction,
}) => {
  const [userAvatar, setUserAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    fetchUserAvatar(comment.author)
      .then((response) => {
        setUserAvatar(response);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  const deleteComment = () => {
    console.log("delete confirmed");
          const updatedComments = comments.filter((item) => {
        return item.comment_id !== comment.comment_id;
      });
            setComments(updatedComments);
      deleteCommentById(comment.comment_id).catch((error) => {
        window.alert(`Delete request was unsuccessful. Press okay to refresh.`);
        setTriggerFetch((prevTriggerFetch) => !prevTriggerFetch);
      });
  };

  const deleteOnClickHandler = () => {
    setDeleteMessage("Are you sure you want to delete your comment?");
    setShowModal(true);
    setDeleteFunction(() => deleteComment);
  };

  if (isLoading) {
    return <p className="comment-card">Loading Comment...</p>;
  } else {
    return (
      <Card
        className="w-100 bg-secondary text-black"
        style={{ maxWidth: "1000px" }}
      >
        <Card.Body>
          <Row>
            <Col xs={10}>
              <Card.Title>{comment.author}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {toRelativeTime(comment.created_at)}
              </Card.Subtitle>
              <Card.Text>{comment.body}</Card.Text>
              <Card.Text className="mb-2 text-muted">
                {" "}
                <FontAwesomeIcon
                  icon={faHeart}
                  color="black"
                  aria-label="likes icon"
                  title="likes:"
                />{" "}
                {comment.votes}
              </Card.Text>
            </Col>
            <Col xs={2} className="d-flex justify-content-center align-items-end">
              {currentUser !== null ? (
                comment.author === currentUser.username ? (
                  <FontAwesomeIcon
                    icon={faTrash}
                    color="black"
                    aria-label="delete icon"
                    title="delete comment"
                    onClick={deleteOnClickHandler}
                    size="xl"
                    style={{ marginBottom: "8px" }}
                  />
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
};

export default CommentCard;
