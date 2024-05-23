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
    .then((response) => {
        return response.data.article
    })
}

export const fetchArticleComments = (article_id) => {
    return newsApi.get(`/articles/${article_id}/comments`)
    .then((response) => {
        return response.data.comments;
    })
}

export const fetchUserAvatar = (username) => {
    return newsApi.get(`/users/${username}`)
    .then((response) => {
        return response.data.user.avatar_url;
    })
}

export const fetchUser = (username) => {
    return newsApi.get(`/users/${username}`)
        .then((response) => {
            return response.data.user
        })
}

export const fetchUsers = () => {
    return newsApi.get(`/users`)
        .then((response) => {
            return response.data.users
        })
}

export const patchArticleLikes = (article_id, amount) => {
    return newsApi.patch(`/articles/${article_id}`, {"inc_votes": amount})
    .then((response) => {
        return response
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
    .catch((error) => {
        throw error;
    })
}

export const postArticle = (requestBody) => {
    return newsApi.post(`/articles`, requestBody)
    .then((response) => {
        return response
    })
}

export const deleteArticleById = (article_id) => {
    return newsApi.delete(`/articles/${article_id}`).then((response) => {
        return response
    });
}