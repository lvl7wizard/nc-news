import { useEffect, useState } from "react";
import { getTopics } from "../../../utils/apiRequest";
import { useNavigate } from 'react-router-dom';
import Button from '../../buttons/Button'
import styled from "styled-components";

const StyledForm = styled.form`
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: repeat(2, 1fr);
grid-column-gap: 10px;
grid-row-gap: 10px;
justify-items: center;
margin-left: 5px;
margin-right: 5px;
padding-top: 10px;
padding-bottom: 10px;
background: rgba(0, 0, 0, 0.7);
border-radius: 15px;
color: white;
`

const SearchArticlesBar = (() => {
    const [isLoading, setIsLoading] = useState(false)
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("all")
    const [sortByQuery, setSortByQuery] = useState("created_at")
    const [orderByQuery, setOrderByQuery] = useState("desc")
    const navigate = useNavigate();

    useEffect(()=> {
        setIsLoading(true)
        getTopics().then((response) => {
            setTopics(response)
        }).then(() => {
            setIsLoading(false)
        })
    },[])

    const topicOnChangeHandler = (event) => {
        setSelectedTopic(event.target.value)
    }
    const sortByOnChangeHandler = (event) => {
        setSortByQuery(event.target.value)
    }
    const orderByOnChangeHandler = (event) => {
        setOrderByQuery(event.target.value)
    }
    const onSubmitHandler = ((event) => {
        event.preventDefault()
        navigate(`/articles/topics/${selectedTopic}?sort_by=${sortByQuery}&order=${orderByQuery}`)
    })

    if (isLoading) {
        return <></>
    }

    return (
    <StyledForm onSubmit={onSubmitHandler}>
        <div>
        <label htmlFor="search-topic">Topic: </label>
        <select onChange={topicOnChangeHandler} id="search-topic">
            <option>all</option>
            {topics.map((topic) => {
                return (
                <option key={topic.slug}>{topic.slug}</option>
                )
            })}
        </select>
        </div>
        <div>
        <label htmlFor="sort-search-by">Sort by: </label>
        <select onChange={sortByOnChangeHandler} id="sort-search-by">
            <option value="created_at">date</option>
            <option value="comment_count">comment count</option>
            <option value="votes">votes</option>
        </select>
        </div>
        <div>
        <label htmlFor="order-search-by">Order by: </label>
        <select onChange={orderByOnChangeHandler} id="order-search-by">
            <option value="desc">descending</option>
            <option value="asc">ascending</option>
        </select>
        </div>
        <div>
        <Button>Search</Button>
        </div>
    </StyledForm>
    )})

export default SearchArticlesBar;