import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import { postComment } from "../../utils/apiRequest";
import NCNewsButton from "../buttons/NCNewsButton";
import styled from "styled-components";

const PostCommentContainer = styled.div`
display: block;
padding: 10px;
width: 90%;
margin: auto;
background: rgba(0, 0, 0, 0.7);
border-radius: 15px;
color: white;
text-align: center;
`

const StyledTextArea = styled.textarea`
width: 90%;
height: 100px;
box-sizing: border-box;
border: 2px solid #626262;
border-radius: 4px;
background-color: black;
color: white;
resize: none;
margin: 10px;
`

const CommentForm = ({ article_id, setTriggerFetch, title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [commentText, setCommentText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackStyle, setFeedbackStyle] = useState("");
  const validUserComment = /(.|\s)*\S(.|\s)*/;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!commentText.match(validUserComment)) {
      setFeedback("Error: Comments cannot be blank");
      setFeedbackStyle("error-text");
    } else {
      setIsLoading(true);
      setFeedback("");
      const requestBody = {
        username: currentUser.username,
        body: commentText,
      };
      postComment(article_id, requestBody).then((response) => {
        setIsLoading(false);
          setFeedback("Post successful");
          setFeedbackStyle("success-text");
          setCommentText("");
          setTriggerFetch((prevTriggerFetch) => !prevTriggerFetch);
      }).catch((error) => {
        setIsLoading(false);
        setFeedback(`Error: ${error.message}`);
        setFeedbackStyle("error-text");
      });
    }
  };

  const onChangeHandler = (event) => {
    setCommentText(event.target.value);
  };

  return (
    <PostCommentContainer>
    <h3>{title}</h3>
    <form onSubmit={onSubmitHandler}>
      <StyledTextArea
        disabled={isLoading}
        onChange={onChangeHandler}
        value={commentText}
      ></StyledTextArea>
      <div>
        <NCNewsButton disabled={isLoading}>Post Comment</NCNewsButton>
      </div>
      <p className={feedbackStyle}>{feedback}</p>
    </form>
    </PostCommentContainer>
  );
};

export default CommentForm;
