import ArticleCardMini from "../ArticleCardMini";
import { getArticles } from "../../utils/apiRequest";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const SearchResults = (() => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const { topic_name } = useParams();

    useEffect(() => {
        setError("")
        setIsLoading(true);
        let queryString = ""
        if (topic_name !== 'all') {
            queryString = `?topic=${topic_name}`
        }
        getArticles(queryString)
        .then((response) => {
            setSearchResults(response)
        }).then(() => {
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
            setError(error.message)

        })
    }, [topic_name])

    if (isLoading) {
        return <p>Loading articles...</p>
    } else if (error !== "") {
        return <p>{error}</p>
    } else {
        return (
        <>
        <h3>Showing {searchResults.length} results</h3>
        <main className="results-display">
            {searchResults.map((article) => {
                return (
                <div key={article.author + article.article_id}>
                    <ArticleCardMini article={article}/>
                </div>)
            })}
        </main>
        </>
        )}  
    })

export default SearchResults;