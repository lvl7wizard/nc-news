import { useState } from "react";
import { toDaysMonthsYears } from "../../../utils/formatTimeStamp";
import { patchArticleLikes } from "../../../utils/apiRequest";
import { useContext} from "react";
import { UserContext } from "../../../contexts/User";
import Button from "../../buttons/Button";
import styled from "styled-components";

const ArticleContainer = styled.div`
  display: block;
  width: 90%;
  margin: auto;
  color: white;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
`;

const ArticleTitle = styled.h2`
  text-align: center;
`;

const ArticleInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: auto;

  p {
    margin: 10px;
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: auto;
`;

const ArticleBody = styled.div`
  text-align: center;
`;

const VotingContainer = styled.div`
  margin: 15px;
  text-align: center;
`;

// This component currently uses local storage to check whether a user has already voted for an article
// as the backend does not currently support storing this data

const ArticleCardFull = ({ article }) => {
  const [currentVotes, setCurrentVotes] = useState(article.votes);
  const [voted, setVoted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { currentUser } = useContext(UserContext);

  let listOfArticleVotes = JSON.parse(
    localStorage.getItem(currentUser.username)
  );
  if (listOfArticleVotes === null) {
    listOfArticleVotes = [];
  }

  const likeOnClickHandler = (event) => {
    let increment = event.target.id === "like" ? 1 : -1;
    setCurrentVotes((currentVotes) => currentVotes + increment);
    patchArticleLikes(article.article_id, increment).then((response) => {
      if (response.name === "AxiosError") {
        setErrorMessage(response.message);
        setCurrentVotes((currentVotes) => currentVotes - increment);
      } else {
        setErrorMessage(null);
        setVoted(true);
        listOfArticleVotes.push(article.article_id);
        localStorage.setItem(
          currentUser.username,
          JSON.stringify(listOfArticleVotes)
        );
      }
    });
  };

  return (
    <>
      <ArticleContainer>
        <ArticleTitle>{article.title}</ArticleTitle>
        <ArticleInfoContainer>
          <p>
            author: <span className="bolded">{article.author}</span>
          </p>
          <p>
            topic: <span className="bolded">{article.topic}</span>
          </p>
          <p>
            created:{" "}
            <span className="bolded">
              {toDaysMonthsYears(article.created_at)}
            </span>
          </p>
          <p>
            Votes: <span className="bolded">{currentVotes}</span>
          </p>
        </ArticleInfoContainer>
        <ArticleImage src={article.article_img_url} />
        <ArticleBody>
          <p>{article.body}</p>
        </ArticleBody>
      </ArticleContainer>
      <VotingContainer>
        <p>Did you enjoy this article?</p>
        <Button
          id="like"
          onClick={likeOnClickHandler}
          disabled={
            listOfArticleVotes.includes(article.article_id) ? true : false
          }
        >
          👍 Yes
        </Button>
        <Button
          id="dislike"
          onClick={likeOnClickHandler}
          disabled={
            listOfArticleVotes.includes(article.article_id) ? true : false
          }
        >
          👎 No
        </Button>
        {listOfArticleVotes.includes(article.article_id) || voted ? (
          <p>Thanks for voting!</p>
        ) : null}
        {errorMessage ? (
          <p className="error-text">Error: "{errorMessage}"</p>
        ) : null}
      </VotingContainer>
    </>
  );
};

export default ArticleCardFull;