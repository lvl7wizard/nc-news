import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../../../contexts/User";
import { postComment } from "../../../../../utils/apiRequest";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ErrorMessage from "../../../../modals/ErrorMessage";

const CommentForm = ({ article_id, comments, setComments }) => {
  const [commentText, setCommentText] = useState("");
  const [commentIsValid, setCommentIsValid] = useState(false);
  const [commentIsInvalid, setCommentIsInvalid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [feedback, setFeedback] = useState("");
  const [feedbackPositive, setFeedbackPositive] = useState(true);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currentUser === null) {
      setErrorMessage("You must be logged in to post comments");
      setShowModal(true);
      return;
    }

    if (commentText.length < 10) {
      setCommentIsInvalid(true);
      setFeedback("Comments must be at least 10 characters");
      setFeedbackPositive(false);
      return;
    }

    setIsLoading(true);

    try {
      const requestBody = {
        username: currentUser.username,
        body: commentText,
      };

      const response = await postComment(article_id, requestBody);
      setCommentIsValid(true);
      setFeedback("Post successful");
      setFeedbackPositive(true);
      console.log(response.data.comment)

      setTimeout(() => {
        setCommentText("");
        setCommentIsValid(false);
        console.log(comments)
        setComments([response.data.comment].concat(comments));
      }, 2000);

    } catch (error) {
      setErrorMessage(`Error: ${error.message}. Please try again later`);
      setShowModal(true)
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeHandler = (event) => {
    setCommentText(event.target.value);
    setCommentIsInvalid(false);
    setCommentIsValid(false);
  };

  return (
    <>
      <ErrorMessage
        showModal={showModal}
        setShowModal={setShowModal}
        errorMessage={errorMessage}
      />
      <Form
        className="text-center bg-dark bg-opacity-75 text-light p-3"
        style={{ width: "100%", maxWidth: "500px" }}
        onSubmit={onSubmitHandler}
      >
        <Form.Group controlId="commentBody">
          <Form.Label className="">Leave a comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="type your comment here"
            isValid={commentIsValid}
            isInvalid={commentIsInvalid}
            onChange={onChangeHandler}
            value={commentText}
            disabled={isLoading}
          />
          <Form.Control.Feedback type={feedbackPositive ? "valid" : "invalid"}>
            {feedback}
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit" disabled={isLoading}>
          {!isLoading ? "Post" : "Posting..."}
        </Button>
      </Form>
    </>
  );
};

export default CommentForm;
