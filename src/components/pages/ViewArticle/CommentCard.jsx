import { toRelativeTime } from "../../../utils/formatTimeStamp";
import { deleteCommentById, fetchUserAvatar } from "../../../utils/apiRequest";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import Button from "../../buttons/Button";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  color: white;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  margin-bottom: 10px;

  img {
    border: solid black;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    background: white;
    margin-right: 10px;
  }

  .comment-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
    min-width: 50%;
    max-width: 90%;
    word-wrap: break-word;
  }
`;

const VotesDeleteBtn = styled.div`
display: flex;
justify-content: space-between;
`

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
        </div>
        <div className="comment-content">
          <strong>{comment.author}</strong>{" "}
          <em>{toRelativeTime(comment.created_at)}</em>
          <div>
            {comment.body}
          </div>
          <VotesDeleteBtn>
            Votes: {comment.votes}
            {comment.author === currentUser.username ? (
              <Button onClick={deleteOnClickHandler}>Delete my comment</Button>
            ) : (
              <></>
            )}
          </VotesDeleteBtn>
        </div>
      </StyledDiv>
    );
  }
};

export default CommentCard;
