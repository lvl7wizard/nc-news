import { useState, useEffect } from "react";
import { fetchArticleComments } from "../../utils/apiRequest";
import CommentCard from "./CommentCard";

const CommentSection = ({article_id}) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [showComments, setShowComments] = useState("Show Comments")


  useEffect(() => {
    setIsLoading(true)
    fetchArticleComments(article_id).then((response) => {
        setComments(response)
    }).then(() => {
      setIsLoading(false)
    })
  }, [])

  const commentsOnClickHandler = () => {
    if (showComments === "Show Comments") {
        setShowComments("Hide Comments")
    } else {
        setShowComments("Show Comments")
    }
  }

  return (
    <>
      <h3>Comments ({ isLoading ? "..." : comments.length})</h3>
      <button onClick={commentsOnClickHandler}>{showComments}</button>
      {showComments === "Hide Comments" ? comments.map((comment) => {return <CommentCard key={comment.author+comment.comment_id}comment={comment}/>}) : null}
    </>
  );
};

export default CommentSection;
