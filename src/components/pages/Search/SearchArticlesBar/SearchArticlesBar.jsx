import { useEffect, useState } from "react";
import { getTopics } from "../../../../utils/apiRequest";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const SearchForm = styled.form`
display: flex;
flex-wrap: wrap;
justify-content: center;
padding: 10px;
gap: 10px;
width: 100vw;

background: rgba(255, 255, 255, 0.1);

select {
  border: none;
  border-radius: 4px;
  background-color: black;
  color: white;
}

color: white;
animation: slideDown 1s;

@keyframes slideDown {
  from {
    transform: translate(0, -10vh);
  }
  to {
    transform: translate(0, 0);
  }
}
`

const StyledButton = styled.button`
background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 25px;
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: opacity 0.2s ease;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  
  &:hover {
    outline: solid white;
    border-radius: 25px;
  }
`;

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
    <SearchForm onSubmit={onSubmitHandler}>
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
        <option value="comment_count">comments</option>
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
        <StyledButton>Search</StyledButton>
      </div>
    </SearchForm>
  );
};

export default SearchArticlesBar;
