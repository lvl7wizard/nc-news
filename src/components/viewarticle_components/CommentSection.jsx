import { useState, useEffect } from "react";
import { fetchArticleComments } from "../../utils/apiRequest";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

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
      <h3>Leave a comment</h3>
      <CommentForm article_id={article_id} setTriggerFetch={setTriggerFetch} />
      <h3>Comments ({isLoading ? "..." : comments.length})</h3>
      <button onClick={commentsOnClickHandler}>{showComments}</button>
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
