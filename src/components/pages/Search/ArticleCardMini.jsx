import { Link } from "react-router-dom";
import { toDaysMonthsYears } from "../../../utils/formatTimeStamp";
import styled from "styled-components";

const Card = styled.div`
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, 0.2);
  margin: 10px;
  width: 285px;
  color: white;
  padding: 5px;
  font-family: Helvetica, Sans-Serif;
  
  p {
    font-size: 15px;
  }

  img {
    width: 270px;
    border-radius: 15px;
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
