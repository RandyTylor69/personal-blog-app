import React from "react";
import { Link } from "react-router-dom";
export default function SearchBar(props) {
  const searchInput = React.useRef(null);
  const [posts, setPosts] = React.useState([]);
  const [query, setQuery] = React.useState(null);

  function filter(posts) {
    return posts.filter((post) => post.title.includes(query));
  }
  React.useEffect(() => {
    async function getPostTitles() {
      // grabbing all the posts
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/create`);
      const data = await res.json();
      setPosts(data);
    }

    getPostTitles();
  }, []);

  // mapping out the filtered posts
  const filteredPosts = filter(posts);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search posts..."
        ref={searchInput}
        onFocus={() => props.setIsSearchFocused(true)}
        onBlur={() => props.setIsSearchFocused(false)}
        onChange={(e) => setQuery(e.target.value)}
      />
      {(props.isSearchFocused, query) && (
        <ul>
          {filteredPosts.length===0 ? (
            <p className="no-search-result">No results</p>
          ) : (
            filteredPosts.map((filteredPost) => (
              <li>
                <Link
                  className="search-post-item"
                  to={`/post/${filteredPost._id}`}
                >
                  <p onClick={props.closeSearchBar}>{filteredPost.title}</p>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
