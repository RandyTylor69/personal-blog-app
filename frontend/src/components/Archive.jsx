import React from "react";
import { Link } from "react-router-dom";
export default function Archive(props) {
  React.useEffect(() => {
    // Fetching from the same backend endpoint as "Featured.jsx"
    fetch(`${process.env.REACT_APP_SERVER_URL}/create`)
      .then((res) => res.json())
      .then((data) => props.setPosts(data));
  }, []);

  let allArchivePosts;

  if (props.posts) {
    // Yep. This is directly copied from Featured.jsx.
    const archiveArrayReverse = props.posts.slice(0).reverse();

    // Yep. You guessed it. Although modified a lil bit.
    allArchivePosts = archiveArrayReverse.map((post, key) => (
      <div className="archive-card">
        <span>
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </span>

        <h2>
          {post.authorName} · {post.createdAt.split("T")[0]}
        </h2>
        <p>Overview: {post.overview}</p>
      </div>
    ));
  }

  return props.posts ? (
    <div className="archive-body">
      <header className="archive-header">
        <h1>All blog posts</h1>
      </header>
      <div className="archive-container">{allArchivePosts}</div>
    </div>
  ) : (
    <h1 className="loading-text">Loading...</h1>
  );
}
