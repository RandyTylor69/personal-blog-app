import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";

export default function Featured(props) {
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/create`)
      .then((res) => res.json())
      .then((data) => props.setPosts(data));
  }, []);
  let postsArrayReverse = [];

  // when all the posts are fetched:
  if (props.posts) {
    // mongoDB adds new post document from the back of the array; we want to
    // display the newest post first. So we need to reverse the array.
    postsArrayReverse = props.posts.slice(0).reverse();
  }

  const allPosts = postsArrayReverse.map((post, key) => (
    <Link
      to={`/post/${post._id}`}
      className="post-card"
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.9)),
                         url(${post.file})`,
      }}
    >
      <section className="post-card-body">
        <h2>{post.title}</h2>
        <h3>
          {post.authorName} {post.createdAt.split("T")[0]}
        </h3>
      </section>
    </Link>
  ));
  return props.posts ? (
    <div className="featured-body">
      <header className="ft-header-grid">
        <div className="grid-item-left">
          <h1>Featured blog posts</h1>
        </div>
        
        <div className="grid-item-right">
          <FontAwesomeIcon icon={faBoxArchive} className="archive-icon" />
          <Link to={"/archive"}>
            {" "}
            <h3>Go to blog archive</h3>
          </Link>
        </div>
      </header>
      <div className="ft-grid-container">{allPosts}</div>
    </div>
  ) : (
    <h1 className="loading-text">Loading...</h1>
  );
}
