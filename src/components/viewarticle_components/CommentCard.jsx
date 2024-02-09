import { toRelativeTime } from "../../utils/formatTimeStamp";
import { deleteCommentById, fetchUserAvatar } from "../../utils/apiRequest";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";

const CommentCard = ({ setTriggerFetch, comment, comments, setComments }) => {
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

  const deleteOnClickHandler = () => {
    const updatedComments = comments.filter((item) => {
      return item.comment_id !== comment.comment_id;
    })
    setComments(updatedComments);
    deleteCommentById(comment.comment_id)
      .catch((error) => {
        window.alert(`Delete request was unsuccessful. Press okay to refresh.`);
        setTriggerFetch((prevTriggerFetch) => !prevTriggerFetch);
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
            onClick={deleteOnClickHandler}
          >
            Delete comment
          </button>
        ) : (
          <></>
        )}
      </div>
    );
  }
};

export default CommentCard;
