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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFeedback("");
    const requestBody = {
      username: currentUser.username,
      body: commentText,
    };

    postComment(article_id, requestBody).then((response) => {
      setIsLoading(false);
      if (response.name === "AxiosError") {
        setFeedback(`Error: ${response.message}`);
        setFeedbackStyle("error-text");
      } else {
        setFeedback("Post Successful");
        setFeedbackStyle("success-text");
        setCommentText("");
        setTriggerFetch((prevTriggerFetch) => !prevTriggerFetch);
      }
    });
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
