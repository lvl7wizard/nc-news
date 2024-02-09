import axios from 'axios';

const newsApi = axios.create({baseURL: "https://news-app-mk4i.onrender.com/api"})

export const getArticles = (queryString = "") => {
    return newsApi.get(`/articles${queryString}`)
    .then((repsonse) => {
        return repsonse.data.articles
    })
}

export const getTopics = () => {
    return newsApi.get(`/topics`)
    .then((response) => {
        return response.data.topics
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

export const fetchUsers = () => {
    return newsApi.get(`/users`)
        .then((repsonse) => {
            return repsonse.data.users
        })
}

export const patchArticleLikes = (article_id, amount) => {
    return newsApi.patch(`/articles/${article_id}`, {"inc_votes": amount})
    .then((repsonse) => {
        return repsonse
    })
    .catch((error) => {
        return error
    })
}

export const postComment = (article_id, requestBody) => {
    return newsApi.post(`/articles/${article_id}/comments`, requestBody)
    .then((response) => {
        return response
    })
}

export const deleteCommentById = (comment_id) => {
    return newsApi.delete(`/comments/${comment_id}`)
    .then((repsonse) => {
        return repsonse
    })
}