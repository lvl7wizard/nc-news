import ArticleCardMini from "./ArticleCardMini";
import { getArticles } from "../../../utils/apiRequest";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Loading from "../../loading/Loading";
import CenterContent from "../../layout/CenterContent/CenterContent";
import styled from "styled-components";

const Results = styled.main`
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
  align-items: center;
`

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const { topic_name } = useParams();
  const sortByQuery = searchParams.get("sort_by");
  const order = searchParams.get("order");

  useEffect(() => {
    setError("");
    setIsLoading(true);
    let queryString = "";
    if (topic_name === "all") {
      queryString = `?sort_by=${sortByQuery}&order=${order}`;
    } else {
      queryString = `?topic=${topic_name}&sort_by=${sortByQuery}&order=${order}`;
    }
    if (topic_name !== "all") {
    }
    getArticles(queryString)
      .then((response) => {
        setSearchResults(response);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        console.log(error);
      });
  }, [topic_name, sortByQuery, order]);

  if (isLoading) {
    return (
        <CenterContent>
          <Loading />
        </CenterContent>
    );
  } else if (error !== "") {
    console.log(error.response.data.msg);
    return (
      <>
        <h3 align="center">{error.message}</h3>
        <p align="center">"{error.response.data.msg}"</p>
      </>
    );
  } else {
    return (
      <>
        <h3 align="center">{searchResults.length} articles found for your search</h3>
        <Results>
          {searchResults.map((article) => {
            return (
              <div key={article.author + article.article_id}>
                <ArticleCardMini article={article} />
              </div>
            );
          })}
        </Results>
      </>
    );
  }
};

export default SearchResults;
