import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchArticleById } from '../utils/apiRequest';
import ArticleCardFull from './viewarticle_components/ArticleCardFull';
import CommentSection from './viewarticle_components/CommentSection';
import Loading from './Loading.jsx';
import CenterContent from './CenterContent.jsx'

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
        return (
        <CenterContent>
        <Loading/>
        </CenterContent>
        )
    } else {
        return (
            <>
            <ArticleCardFull article={article}/>
            <CommentSection article_id={article.article_id}/>
            </>
            
        )
    }

}

export default ViewArticle;