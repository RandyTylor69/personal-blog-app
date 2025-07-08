import React from "react";
import { Link } from "react-router-dom";
import DeleteWindow from "./DeleteWindow";
import { Navigate } from "react-router-dom";
// child of the Home component

export default function Profile(props) {
  const [deleteWarning, setDeleteWarning] = React.useState(false);
  const [postToBeDeleted, setPostToBeDeleted] = React.useState(null);
  const [redirect, setRedirect] = React.useState(false)

  // fetching all posts from database
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/create`)
      .then((res) => res.json())
      .then((data) => props.setPosts(data));
  }, []);

  // prompts the delete warning window
  function toggleDeleteWarning(post) {
    console.log("attempt");
    setPostToBeDeleted(post);
    setDeleteWarning((prev) => !prev);
  }

  // displaying all post titles
  const usersPosts = props.posts.map((post, key) => (
    <section className="post-title-card">
      <p>{post.title}</p>
      <div className="options">
        <Link to={`/post/${post._id}`}>
          <button>Read</button>
        </Link>
        <button onClick={() => toggleDeleteWarning(post)}>Delete</button>
      </div>
    </section>
  ));

  // logout onclick
  async function logout() {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) alert(data.message);
    props.setUsername(null);
    setRedirect(true)
  }

  if (setRedirect) {
    return <Navigate to={"/"} />
  } else return (
    <>
      {" "}
      {deleteWarning && (
        <DeleteWindow
          postToBeDeleted={postToBeDeleted}
          setDeleteWarning={setDeleteWarning}
        />
      )}
      <main className="profile-section">
        <h1>{props.username}'s Profile</h1>
        <div className="posts-overview">
          <section className="title-section">
            <h2>Your Blog Posts</h2>
          </section>

          {usersPosts}
        </div>
        <a className = "log-out-button"onClick={logout}>Log out</a>
      </main>
    </>
  );
}
