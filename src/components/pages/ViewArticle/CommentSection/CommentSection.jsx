import { useState, useEffect } from "react";
import { fetchArticleComments } from "../../../../utils/apiRequest";
import CommentCard from "./CommentCard/CommentCard";
import CommentForm from "./CommentForm/CommentForm";
import Button from "react-bootstrap/Button"
import styled from "styled-components";
import DeleteConfirmation from "../../../modals/DeleteConfirmation";

// const CommentSectionContainer = styled.div`
// max-width: 630px;
// margin: auto;
// text-align: center;
// margin-bottom: 20px;
// `

// const StyledDiv = styled.div`
// border-top: solid black;
// width: 90%;
// margin: auto;
// margin-bottom: 18.72px;
// padding: 10px;
// `

// const CommentsTitle = styled.div`
// text-align:center;
// color: white;
// `

const CommentSection = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState("Show Comments");
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("")
  const [deleteFunction, setDeleteFunction] = useState("");

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
    <DeleteConfirmation showModal={showModal} setShowModal={setShowModal} deleteFunction={deleteFunction} deleteMessage={deleteMessage}/>
    <CommentForm article_id={article_id} comments={comments} setComments={setComments}/>
      <h3>Comments ({isLoading ? "..." : comments.length})</h3>
      <Button onClick={commentsOnClickHandler}>{showComments}</Button>
      {showComments === "Hide Comments"
        ? comments.map((comment) => {
          return (
            <CommentCard
            key={comment.author + comment.comment_id}
            setTriggerFetch={setTriggerFetch}
            comment={comment}
            setComments={setComments}
            comments={comments}
            setShowModal={setShowModal}
            setDeleteMessage={setDeleteMessage}
            setDeleteFunction={setDeleteFunction}
            />
          );
        })
        : null}
        </>
  );
};

export default CommentSection;
