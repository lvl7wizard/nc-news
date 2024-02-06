import ArticleCard from "../ArticleCard";
import { getArticles } from "../../utils/apiRequest";
import { useEffect, useState } from "react";

const SearchResults = (() => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        getArticles()
        .then((response) => {
            setSearchResults(response)
        }).then(() => {
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <p>Loading articles...</p>
    } else {
        return (
        <>
        <h3>Showing {searchResults.length} results</h3>
        <main className="results-display">
            {searchResults.map((article) => {
                return (
                <div id={article.author + article.article_id}>
                    <ArticleCard article={article}/>
                </div>)
            })}
        </main>
        </>
        )}  
    })

export default SearchResults;