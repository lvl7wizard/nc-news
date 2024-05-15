import { useContext } from "react";
import styles from "./Post.module.css";
import { UserContext } from "../../../contexts/User";
import PostForm from "./PostForm.jsx/PostForm";



const Post = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className={styles.container}>
      {currentUser === null ? <h2 style={{textAlign:"center"}}>You must be logged in to post articles</h2> : <PostForm/>}
    </div>
  )


}


export default Post;
