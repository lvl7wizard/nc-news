import { useContext } from "react";
import styles from "./Post.module.css";
import { UserContext } from "../../../contexts/User";
import PostForm from "./PostForm.jsx/PostForm";
import Button from "react-bootstrap/Button"


const Post = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className={styles.container}>
      {currentUser === null ?         <>
        <h2>You must be logged in to post articles</h2>
        <Button href="/">Log in</Button>
        </> : <PostForm/>}
    </div>
  )
}


export default Post;
