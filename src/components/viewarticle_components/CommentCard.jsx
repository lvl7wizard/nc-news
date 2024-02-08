import { toRelativeTime } from "../../utils/formatTimeStamp";
import { deleteCommentById, fetchUserAvatar } from "../../utils/apiRequest";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";

const CommentCard = ({ comment, setTriggerFetch }) => {
  const [userAvatar, setUserAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);
  const [processingDeleteRequest, setProcessingDeleteRequest] = useState(false);
  const [feedback, setFeedback] = useState("");

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

  const deleteOnClickHandler = () => {
    setProcessingDeleteRequest(true);
    deleteCommentById(comment.comment_id)
      .then(() => {
        setTriggerFetch((prevTriggerFetch) => !prevTriggerFetch);
      })
      .catch((error) => {
        setFeedback(`Error: ${error.message}`);
        setProcessingDeleteRequest(false);
      });
  };

  if (isLoading) {
    return <p className="comment-card">Loading Comment...</p>;
  } else {
    return (
      <div className="comment-card">
        <div className="comment-card-1">
          <img src={userAvatar} />
          <strong>{comment.author}</strong>{" "}
          <em>{toRelativeTime(comment.created_at)}</em>
        </div>
        <div className="comment-card-1">
          <div>{comment.body}</div>
        </div>
        <div className="comment-card-1">
          Votes = {comment.votes} <br />
        </div>
        {comment.author === currentUser.username ? (
          <button
            disabled={processingDeleteRequest}
            onClick={deleteOnClickHandler}
          >
            Delete comment
          </button>
        ) : (
          <></>
        )}
        <p className="error-text">{feedback}</p>
      </div>
    );
  }
};

export default CommentCard;
