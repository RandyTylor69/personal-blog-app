import React from "react";
import { Link } from "react-router-dom";

export default function Archive(props) {
  const [postsCopy, setPostsCopy] = React.useState(null);
  const [selectedArchivePosts, setSelectedArchivePosts] = React.useState([]);

  function enlargeSelected() {
    // append 10 posts to the selected array.
    let n = 10;
    while (n > 0) {
      if (postsCopy.length === 0) break;
      const post = postsCopy.pop();
      setSelectedArchivePosts((prev) => [...prev, post]);
      n--;
    }
  }

  React.useEffect(() => {
    // Fetching from the same backend endpoint as "Featured.jsx"
    fetch(`${process.env.REACT_APP_SERVER_URL}/create`)
      .then((res) => res.json())
      .then((data) => {
        props.setPosts(data);
        setPostsCopy(data.slice(0));
      });
  }, []);

  React.useEffect(() => {
    if (postsCopy) enlargeSelected();
  }, [postsCopy]);

  console.log(postsCopy);

  return props.posts ? (
    <div className="archive-body">
      <header className="archive-header">
        <h1>All blog posts {`(${props.posts.length})`}</h1>
      </header>
      <div className="archive-container">
        {selectedArchivePosts &&
          selectedArchivePosts.map((post, key) => (
            <div className="archive-card">
              <span>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
              </span>

              <h2>
                {post.authorName} · {post.createdAt.split("T")[0]}
              </h2>
              <p>Overview: {post.overview}</p>
            </div>
          ))}
        {postsCopy && postsCopy.length > 0 && (
          <button className="load-more-btn" onClick={enlargeSelected}>
            Load More
          </button>
        )}
      </div>
    </div>
  ) : (
    <h1 className="loading-text">Loading...</h1>
  );
}
