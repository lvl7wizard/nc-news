import { Link } from "react-router-dom";
import { toDaysMonthsYears } from "../utils/formatTimeStamp";
import styled from "styled-components";

const Card = styled.div`
  text-align: center;
  background-color: rgb(255, 255, 255, 0.65);
  border: solid black;
  border-radius: 25px;
  box-shadow: 7px 7px 2px 1px rgba(0, 0, 0, 0.226);
  margin: 10px;
  width: 300px;
  color: black;
  padding: 20px;

  img {
    width: 250px;
  }
`;

const ArticleCardMini = ({ article }) => {

  const articleUrl = `/articles/${article.article_id}`;
  return (
    <Link className="link" to={articleUrl}>
      <Card>
        <h4>{article.title}</h4>
        <img src={article.article_img_url} />
        <p>Posted: {toDaysMonthsYears(article.created_at)}</p>
        <p>Author: {article.author} | Topic: {article.topic}</p>
        <p>Votes: {article.votes} | Comments: {article.comment_count}</p>
      </Card>
    </Link>
  );
};

export default ArticleCardMini;
