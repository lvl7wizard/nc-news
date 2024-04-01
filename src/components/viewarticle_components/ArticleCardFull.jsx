import { useState } from "react";
import { toDaysMonthsYears } from "../../utils/formatTimeStamp";
import { patchArticleLikes } from "../../utils/apiRequest";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";

// This component currently uses local storage to check whether a user has already voted for an article
// as the backend does not currently support storing this data

const ArticleCardFull = ({ article }) => {
  const [currentVotes, setCurrentVotes] = useState(article.votes);
  const [errorMessage, setErrorMessage] = useState(null);
  const { currentUser } = useContext(UserContext);

  let listOfArticleVotes = JSON.parse(
    localStorage.getItem(currentUser.username)
  );
  if (listOfArticleVotes === null) {
    listOfArticleVotes = [];
  }

  const likeOnClickHandler = (event) => {
    listOfArticleVotes.push(article.article_id);
    localStorage.setItem(
      currentUser.username,
      JSON.stringify(listOfArticleVotes)
    );

    
    let increment = event.target.id === "like" ? 1 : -1
    setCurrentVotes((currentVotes) => currentVotes + increment);
    patchArticleLikes(article.article_id, increment).then((response) => {
      if (response.name === "AxiosError") {
        setErrorMessage(response.message);
        setCurrentVotes((currentVotes) => currentVotes - increment);
      } else {
        setErrorMessage(null);
      }
    });
  };

  return (
    <main className="full-article">
      <h2>{article.title}</h2>
      <div>
        <p>author: {article.author}</p>
        <p>created: {toDaysMonthsYears(article.created_at)}</p>
        <p>topic = {article.topic}</p>
      </div>
      <img src={article.article_img_url} />
      <p>{article.body}</p>
      <div className="votes">
        <p>Votes:</p>
        {errorMessage ? (
          <p className="error-text">Error: "{errorMessage}"</p>
        ) : null}
        <p>{currentVotes}</p>
        <button
          id="like"
          onClick={likeOnClickHandler}
          disabled={
            listOfArticleVotes.includes(article.article_id) ? true : false
          }
        >
          👍
        </button>
        <button
          id="dislike"
          onClick={likeOnClickHandler}
          disabled={
            listOfArticleVotes.includes(article.article_id) ? true : false
          }
        >
          👎
        </button>
        {listOfArticleVotes.includes(article.article_id) ? (
          <p>Thanks for voting!</p>
        ) : null}
      </div>
    </main>
  );
};

export default ArticleCardFull;
