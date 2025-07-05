import React from "react";
import { Link } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/create`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const allPosts = posts.map((post, key) => (
    <div className="post-card">
      <section className="post-card-header">
        <img src={`${process.env.REACT_APP_SERVER_URL}/${post.file}`} />
        <h1>{post.title}</h1>
      </section>
      <section className="post-card-body">
        <div className="overview-container">
          <p>{post.overview}</p>
        </div>
        <Link to={`/post/${post._id}`}>
          <button>Read</button>
        </Link>
      </section>
    </div>
  ));

  return <>{allPosts}</>
}
