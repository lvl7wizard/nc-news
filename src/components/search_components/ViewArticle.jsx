import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchArticleById } from '../../utils/apiRequest';
import { toDaysMonthsYears } from '../../utils/formatTimeStamp';

const ViewArticle = () => {
    const [article, setArticle] = useState({});
    const { article_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchArticleById(article_id)
        .then((article) => {
            setArticle(article)
        })
        .then(() => {
            setIsLoading(false);
        })
    }, [article_id])

    if (isLoading) {
        return <>Loading article...</>
    } else {
        return (
            <main className="full-article">
                <h2>{article.title}</h2>
                <div>
                    <p>author: {article.author}</p>
                    <p>created: {toDaysMonthsYears(article.created_at)}</p>
                    <p>topic = {article.topic}</p>
                </div>
                <img src={article.article_img_url}/>
                <p>{article.body}</p>
                <button>Like</button>
                <p>votes = {article.votes}</p>
            </main>
        )
    }

}

export default ViewArticle;