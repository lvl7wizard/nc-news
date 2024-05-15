import { useContext } from "react";
import styles from "./Post.module.css";
import { UserContext } from "../../../contexts/User";
import PostForm from "./PostForm.jsx/PostForm";
import Button from "react-bootstrap/Button";

const Post = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className={styles.container}>
      {currentUser === null ? (
        <div className={styles.notLoggedInText}>
          <h2>You must be logged in to post articles</h2>
          <Button href="/">Log in</Button>
        </div>
      ) : (
        <div>
          <PostForm />
        </div>
      )}
    </div>
  );
};

export default Post;
