import axios from 'axios';

const newsApi = axios.create({baseURL: "https://news-app-mk4i.onrender.com/api"})

export const getArticles = () => {
    return newsApi.get(`https://news-app-mk4i.onrender.com/api/articles`)
    .then((repsonse) => {
        return repsonse.data.articles
    })
}

export const fetchArticleById = (article_id) => {
    return newsApi.get(`https://news-app-mk4i.onrender.com/api/articles/${article_id}`)
    .then((repsonse) => {
        return repsonse.data.article
    })
}