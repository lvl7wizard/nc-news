import { toRelativeTime } from "../../utils/formatTimeStamp";
import { fetchUserAvatar } from "../../utils/apiRequest";
import { useEffect, useState } from "react";

const CommentCard = ({ comment }) => {
  const [userAvatar, setUserAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchUserAvatar(comment.author)
    .then((response) => {
        setUserAvatar(response)
    }).then(() => {
      setIsLoading(false);
    })
  }, [])

  if (isLoading) {
    return <p className="comment-card">Loading Comment...</p>
  } else {
    return (
      <div className="comment-card">
      <div className="comment-card-1">
          <img src={userAvatar}/>
          <strong>{comment.author}</strong> <em>{toRelativeTime(comment.created_at)}</em>
      </div>
        <div className="comment-card-1">
          <div>{comment.body}</div>
        </div>
        <div className="comment-card-1">
          Votes = {comment.votes} <br/>
        </div>
      </div>
    );
  }
};

export default CommentCard;
