import axios from 'axios';

const newsApi = axios.create({baseURL: "https://news-app-mk4i.onrender.com/api"})

export const getArticles = () => {
    return newsApi.get(`/articles`)
    .then((repsonse) => {
        return repsonse.data.articles
    })
}

export const fetchArticleById = (article_id) => {
    return newsApi.get(`/articles/${article_id}`)
    .then((repsonse) => {
        return repsonse.data.article
    })
}

export const fetchArticleComments = (article_id) => {
    return newsApi.get(`/articles/${article_id}/comments`)
    .then((repsonse) => {
        return repsonse.data.comments;
    })
}

export const fetchUserAvatar = (username) => {
    return newsApi.get(`/users/${username}`)
    .then((repsonse) => {
        return repsonse.data.user.avatar_url;
    })
}