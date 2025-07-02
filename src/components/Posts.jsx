import React from "react";

export default function Posts() {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:3001/create")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);
  const allPosts = posts.map((post) => (
    <div className="post-card">
      <h1>{post.title}</h1>
    </div>
  ));
  console.log(posts)
  return (
    <>
      {posts.length === 0 ? 
      <h1>Nothing to see</h1> 
      : <>{allPosts}</>}
    </>
  )
  
}
