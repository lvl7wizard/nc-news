import { toRelativeTime } from "../../utils/formatTimeStamp";
import { deleteCommentById, fetchUserAvatar } from "../../utils/apiRequest";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: block;
  padding: 10px;
  margin: 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  color: white;

  img {
    width: 50px;
    max-height: 50px;
    height: auto;
  }
`;

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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your comment?"
    );
    if (isConfirmed) {
      const updatedComments = comments.filter((item) => {
        return item.comment_id !== comment.comment_id;
      });
      setComments(updatedComments);
      deleteCommentById(comment.comment_id).catch((error) => {
        window.alert(`Delete request was unsuccessful. Press okay to refresh.`);
        setTriggerFetch((prevTriggerFetch) => !prevTriggerFetch);
      });
    }
  };

  if (isLoading) {
    return <p className="comment-card">Loading Comment...</p>;
  } else {
    return (
      <StyledDiv>
        <div>
          <img src={userAvatar} />
          <strong>{comment.author}</strong>{" "}
          <em>{toRelativeTime(comment.created_at)}</em>
        </div>
        <div>
          <div>{comment.body}</div>
        </div>
        <div>
          Votes = {comment.votes} <br />
        </div>
        {comment.author === currentUser.username ? (
          <button onClick={deleteOnClickHandler}>Delete comment</button>
        ) : (
          <></>
        )}
      </StyledDiv>
    );
  }
};

export default CommentCard;
