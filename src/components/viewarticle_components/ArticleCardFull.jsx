import { useState } from "react";
import { toDaysMonthsYears } from "../../utils/formatTimeStamp";
import { patchArticleLikes } from "../../utils/apiRequest";

const ArticleCardFull = ({ article }) => {
  const [currentVotes, setCurrentVotes] = useState(article.votes);
  const [errorMessage, setErrorMessage] = useState(null);

  const likeOnClickHandler = (event) => {
    let increment = 0
    if (event.target.id === 'like') {
      increment = 1
    } else {
      increment = -1
    }
    setCurrentVotes((currentVotes) => currentVotes + increment)
    patchArticleLikes(article.article_id, increment)
    .then((response) => {
      if (response.name === "AxiosError") {
        setErrorMessage(response.message)
        setCurrentVotes((currentVotes) => currentVotes - increment)
      } else {
        setErrorMessage(null)
      }
    })
  }

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
      {errorMessage ? <p className="error-text">Error: "{errorMessage}"</p> : null}
      <p>{currentVotes}</p>
      <button id="like" onClick={likeOnClickHandler}>👍</button>
      <button id="dislike"onClick={likeOnClickHandler}>👎</button>
      </div>
    </main>
  );
};

export default ArticleCardFull;
