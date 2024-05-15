import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchArticleById } from '../../../utils/apiRequest.js';
import ArticleCardFull from './ArticleCardFull.jsx';
import CommentSection from './CommentSection.jsx';
import Loading from '../../loading/Loading.jsx';
import AbsoluteCenterContent from "../../layout/CenterContent/AbsoluteCenterContent.jsx"
import { useContext } from 'react';
import { UserContext } from '../../../contexts/User.jsx';
import styles from "./ViewArticle.module.css";
import Button from "react-bootstrap/Button"

const ViewArticle = () => {
    const [article, setArticle] = useState({});
    const { article_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useContext(UserContext);

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

    if (currentUser === null) {
        return (
        <div className={styles.container}>
            <h2>You must be logged in to view articles</h2>
            <Button href="/">Log in</Button>
        </div>
        )
    } else {
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

}

export default ViewArticle;