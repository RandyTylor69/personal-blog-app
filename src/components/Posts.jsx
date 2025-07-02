import React from "react";

export default function Posts() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3001/create")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const allPosts = posts.map((post, key) => (
    <div className="post-card">
      <section className="post-card-header">
        <img src={`http://localhost:3001/${post.file}`} />
        <h1>{post.title}</h1>
      </section>
      <section className="post-card-body">
        <div className="overview-container">
          <p>{post.overview}</p>
        </div>

        <button>Read</button>
      </section>
    </div>
  ));

  return <>{posts.length === 0 ? <h1>Nothing to see</h1> : <>{allPosts}</>}</>;
}
