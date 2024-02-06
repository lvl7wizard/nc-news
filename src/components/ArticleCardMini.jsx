import { Link } from "react-router-dom";
import { toDaysMonthsYears } from "../utils/formatTimeStamp";

const ArticleCardMini = ({ article }) => {
  const articleUrl = `/articles/${article.article_id}`;
  return (
    <Link to={articleUrl}>
      <div className="article-card">
        <h4>{article.title}</h4>
        <p>author: {article.author}</p>
        <img src={article.article_img_url} />
        <p>Topic: {article.topic}</p>
        <p>Created: {toDaysMonthsYears(article.created_at)}</p>
        <p>Votes: {article.votes}</p>
        <p>Comments: {article.votes}</p>
      </div>
    </Link>
  );
};

export default ArticleCardMini;
