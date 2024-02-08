import { useEffect, useState } from "react";
import { getTopics } from "../../utils/apiRequest";
import { useNavigate } from 'react-router-dom';

const SearchArticlesBar = (() => {
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("")
    const navigate = useNavigate();

    useEffect(()=> {
        getTopics().then((response) => {
            setTopics(response)
        })
    },[])

    const topicOnChangeHandler = (event) => {
        setSelectedTopic(event.target.value)
    }

    const onSubmitHandler = ((event) => {
        event.preventDefault()
        navigate(`/articles/topics/${selectedTopic}`)
    })

    return (
    <form onSubmit={onSubmitHandler} className="search-bar">
        <label htmlFor="search-topic">Topic: </label>
        <select onChange={topicOnChangeHandler} id="search-topic">
            <option>all</option>
            {topics.map((topic) => {
                return (
                <option key={topic.slug}>{topic.slug}</option>
                )
            })}
        </select>
        <label htmlFor="sort-search-by">Sort by: </label>
        <select id="sort-search-by">
            <option value="placeholder">placeholder</option>
        </select>
        <button>Search</button>
    </form>
    )})

export default SearchArticlesBar;