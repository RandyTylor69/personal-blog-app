import React from "react";
import { Link } from "react-router-dom";
import DeleteWindow from "./DeleteWindow";
import { Navigate } from "react-router-dom";

// child of the Home component

export default function Profile(props) {
  const [deleteWarning, setDeleteWarning] = React.useState(false);
  const [postToBeDeleted, setPostToBeDeleted] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);
  const [userPosts, setUserPosts] = React.useState(null);
  let userPostsOverview = null;

  // fetching all posts from database with this user
  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error);
        return;
      }
      setUserPosts(data);
    }
    fetchData();
  }, []);

  // prompts the delete warning window
  function toggleDeleteWarning(post) {
    console.log("attempt");
    setPostToBeDeleted(post);
    setDeleteWarning((prev) => !prev);
  }

  // loading page while waiting for the data to fetch
  if (!userPosts) {
    return <h1 className="loading">Loading</h1>;
  }

  // displaying all post titles
  if (userPosts.length > 0) {
    userPostsOverview = userPosts.map((post, key) => (
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
  }

  // logout onclick
  async function logout() {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) alert(data.message);
    props.setUsername(null);
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  } else
    return (
      <>
        {deleteWarning && (
          <DeleteWindow
            postToBeDeleted={postToBeDeleted}
            setDeleteWarning={setDeleteWarning}
          />
        )}
        <main className="profile-section">
          <h1>{props.username}'s Profile</h1>
          <div className="posts-overview">
            {userPosts ? (
              <>
                <section className="title-section">
                  <h2>Your Blog Posts</h2>
                </section>{" "}
                {userPostsOverview}
              </>
            ) : (
              <h2>You haven't posted anything yet.</h2>
            )}
          </div>
          <button className="log-out-button" onClick={logout}>
            Log out
          </button>
        </main>
      </>
    );
}
