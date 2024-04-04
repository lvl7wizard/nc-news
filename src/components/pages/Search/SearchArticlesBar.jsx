import { useEffect, useState } from "react";
import { getTopics } from "../../../utils/apiRequest";
import { useNavigate } from "react-router-dom";
import Button from "../../buttons/Button";
import StyledForm from "../../forms/StyledForm";

const SearchArticlesBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [sortByQuery, setSortByQuery] = useState("created_at");
  const [orderByQuery, setOrderByQuery] = useState("desc");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((response) => {
        setTopics(response);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  const topicOnChangeHandler = (event) => {
    setSelectedTopic(event.target.value);
  };
  const sortByOnChangeHandler = (event) => {
    setSortByQuery(event.target.value);
  };
  const orderByOnChangeHandler = (event) => {
    setOrderByQuery(event.target.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    navigate(
      `/articles/topics/${selectedTopic}?sort_by=${sortByQuery}&order=${orderByQuery}`
    );
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <StyledForm onSubmit={onSubmitHandler}>
      <div>
        <label htmlFor="search-topic">Topic: </label>
        <div>
          <select onChange={topicOnChangeHandler} id="search-topic">
            <option>all</option>
            {topics.map((topic) => {
              return <option key={topic.slug}>{topic.slug}</option>;
            })}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="sort-search-by">Sort by: </label>
      <div>
      <select onChange={sortByOnChangeHandler} id="sort-search-by">
        <option value="created_at">date</option>
        <option value="comment_count">comment count</option>
        <option value="votes">votes</option>
      </select>
     </div>
     </div>
      <div>
        <label htmlFor="order-search-by">Order by: </label>
        <div>
        <select onChange={orderByOnChangeHandler} id="order-search-by">
          <option value="desc">descending</option>
          <option value="asc">ascending</option>
        </select>
        </div>
      </div>
      <div>
        <Button>Search</Button>
      </div>
    </StyledForm>
  );
};

export default SearchArticlesBar;
