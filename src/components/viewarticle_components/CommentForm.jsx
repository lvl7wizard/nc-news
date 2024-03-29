import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import { postComment } from "../../utils/apiRequest";

const CommentForm = ({ article_id, setTriggerFetch }) => {
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
    <form onSubmit={onSubmitHandler}>
      <textarea
        disabled={isLoading}
        onChange={onChangeHandler}
        value={commentText}
      ></textarea>
      <div>
        <button disabled={isLoading}>Post Comment</button>
      </div>
      <p className={feedbackStyle}>{feedback}</p>
    </form>
  );
};

export default CommentForm;
