import { toDaysMonthsYears } from "../../utils/formatTimeStamp";

const ArticleCardFull = ({ article }) => {
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
      <button>Like</button>
      <p>votes = {article.votes}</p>
    </main>
  );
};

export default ArticleCardFull;
