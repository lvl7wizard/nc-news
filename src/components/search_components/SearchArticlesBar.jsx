const SearchArticlesBar = (() => {
    return (
    <div className="search-bar">
        <label htmlFor="search-topic">Topic: </label>
        <select id="search-topic">
            <option value="placeholder">placeholder</option>
        </select>
        <label htmlFor="sort-search-by">Sort by: </label>
        <select id="sort-search-by">
            <option value="placeholder">placeholder</option>
        </select>
        <button>Search</button>
    </div>
    )})

export default SearchArticlesBar;