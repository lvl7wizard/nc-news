import { useState, useEffect } from "react";
import { fetchArticleComments } from "../../../utils/apiRequest";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import Button from "../../buttons/Button"
import styled from "styled-components";

const CommentSectionContainer = styled.div`
max-width: 630px;
margin: auto;
text-align: center;
margin-bottom: 20px;
`

const StyledDiv = styled.div`
border-top: solid black;
width: 90%;
margin: auto;
margin-bottom: 18.72px;
padding: 10px;
`

const CommentsTitle = styled.div`
text-align:center;
color: white;
`

const CommentSection = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState("Show Comments");
  const [triggerFetch, setTriggerFetch] = useState(false);

  const fetchComments = () => {
    setIsLoading(true);
    fetchArticleComments(article_id)
      .then((response) => {
        setComments(response);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        window.alert(`${error.message}. Could not connect to server`)
      })
  };

  useEffect(() => {
    fetchComments();
  }, [triggerFetch]);

  const commentsOnClickHandler = () => {
    if (showComments === "Show Comments") {
      setShowComments("Hide Comments");
    } else {
      setShowComments("Show Comments");
    }
  };

  return (
    <>
    <CommentSectionContainer> 
      <CommentForm title={"Leave a comment"}article_id={article_id} setTriggerFetch={setTriggerFetch} />
      <StyledDiv>
      <CommentsTitle>
      <h3>Comments ({isLoading ? "..." : comments.length})</h3>
      </CommentsTitle>
      <Button onClick={commentsOnClickHandler}>{showComments}</Button>
      </StyledDiv>
      </CommentSectionContainer>
      {showComments === "Hide Comments"
        ? comments.map((comment) => {
          return (
            <CommentCard
            key={comment.author + comment.comment_id}
            setTriggerFetch={setTriggerFetch}
            comment={comment}
            setComments={setComments}
            comments={comments}
            />
          );
        })
        : null}
        </>
  );
};

export default CommentSection;
