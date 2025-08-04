import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faArrowPointer } from "@fortawesome/free-solid-svg-icons";

export default function CreateList() {
  const searchInputLIST = React.useRef(null);
  const [posts, setPosts] = React.useState([]);
  const [query, setQuery] = React.useState(null);
  // close the search bar upon routing to a different page
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  // posts added to the list, can be removed
  const [addedPosts, setAddedPosts] = React.useState([]);

  // empty list object
  const [list, setList] = React.useState({
    name: "",
    description: "",
    // not including the list content, they'll be added seperately.
  });

  const [lists, setLists] = React.useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    addedPosts.forEach((i) => {
      formData.append("content[]", i._id);
    });

    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/createList`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    setList(data);
    alert(data.message);
    window.location.reload()
  }

  // -------------- SEARCH FUNCTION (search for post, add to list) -------------

  // grabbing all the posts
  React.useEffect(() => {
    async function getPostTitles() {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/createPost`);
      const data = await res.json();
      setPosts(data);
    }
    getPostTitles();
  }, []);

  function filter(posts) {
    return posts.filter((post) => post.title.includes(query));
  }

  // mapping out the filtered posts
  const filteredPosts = filter(posts);

  // adding the searched-up post to the list
  function addToList(post) {
    setAddedPosts((prev) => [...prev, post]);
    setQuery(null);
  }

  function cleanInputBar() {
    searchInputLIST.current.value = "";
  }

  function removePostFromList(post) {
    setAddedPosts((prev) => prev.filter((item) => item.title !== post.title));
  }

  const addedPostsMapped = addedPosts.map((post, key) => {
    return (
      <section className="post-title-card-LIST" key={key}>
        <p>{post.title}</p>
        <div className="options-LIST">
          <button onClick={() => removePostFromList(post)}>
            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
          </button>
        </div>
      </section>
    );
  });

  return (
    <div className="create-list-page">
      <header>
        <h1>New List</h1>
      </header>
      <form
        className="create-list-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="upper-wrapper">
          <div className="name-and-search">
            <label htmlFor="name" className="input-label">
              Name
            </label>
            <input
              className="name-area"
              name="name"
              value={list.name}
              onChange={(e) =>
                setList((prev) => ({ ...prev, name: e.target.value }))
              }
              maxLength={20}
              required
            />
            <div className="search-bar-container">
              <label htmlFor="search" className="input-label">
                Add to list
              </label>
              <input
                name="search"
                type="text"
                placeholder="Search posts..."
                ref={searchInputLIST}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onChange={(e) => setQuery(e.target.value)}
              />
              {(isSearchFocused, query) && (
                <ul>
                  {filteredPosts.length === 0 ? (
                    <p className="no-search-result">No results</p>
                  ) : (
                    filteredPosts.map((filteredPost, key) => (
                      <li className="search-post-item" key={key}>
                        <p
                          onClick={() => {
                            addToList(filteredPost);
                            cleanInputBar();
                          }}
                        >
                          {filteredPost.title}
                        </p>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
            <div className="added-posts-container">{addedPostsMapped}</div>
          </div>

          <div className="description-wrapper">
            <label htmlFor="description" className="input-label">
              Description
            </label>
            <textarea
              className="description-area"
              name="description"
              value={list.description}
              onChange={(e) =>
                setList((prev) => ({ ...prev, description: e.target.value }))
              }
              required
              maxLength={200}
              draggable="false"
            />
          </div>
        </div>

        <div className="submit-class">
          <button type="submit">Create List</button>
        </div>
      </form>
    </div>
  );
}
