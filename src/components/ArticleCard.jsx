const ArticleCard = ({article}) => {
    console.log(article)
    return (
    <div className="article-card">
    <h4>{article.title}</h4>
    <img src={article.article_img_url}/>
    <p>Topic: {article.topic}</p>
    <p>Created: {article.created_at}</p>
    <p>Votes: {article.votes}</p>
    </div>
    )
}

export default ArticleCard;