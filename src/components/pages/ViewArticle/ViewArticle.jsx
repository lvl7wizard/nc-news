import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchArticleById } from '../../../utils/apiRequest.js';
import ArticleCardFull from './ArticleCardFull.jsx';
import CommentSection from './CommentSection.jsx';
import Loading from '../../loading/Loading.jsx';
import CenterContent from '../../layout/CenterContent/CenterContent.jsx'

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
        <AbsoluteCenterContent>
        <Loading/>
        </AbsoluteCenterContent>
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