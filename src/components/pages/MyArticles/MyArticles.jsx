import { UserContext } from "../../../contexts/User";
import { useContext } from "react";
import styles from "./MyArticles.module.css";
import Button from "react-bootstrap/Button";

import MyArticleCards from "./MyArticlesCards";

const MyArticles = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className={styles.container}>
      {currentUser === null ? (
        <>
          <h2>You must be logged in to view your articles</h2>
          <Button href="/">Log in</Button>
        </>
      ) : (
        <MyArticleCards />
      )}
    </div>
  );
};

export default MyArticles;
