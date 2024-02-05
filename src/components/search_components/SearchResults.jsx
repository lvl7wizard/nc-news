import ArticleCard from "../ArticleCard";
import { getArticles } from "../../utils/apiRequest";
import { useEffect, useState } from "react";

const SearchResults = (() => {
    let [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        getArticles()
        .then((response) => {
            setSearchResults(response)
        })
    }, [])

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
    )})

export default SearchResults;