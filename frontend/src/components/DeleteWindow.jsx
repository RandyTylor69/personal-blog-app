// child of the Profile component

export default function DeleteWindow(props) {
  const post = props.postToBeDeleted;

  // delete post function
  async function handleDelete(post) {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/post/${post._id}`,
      {
        credentials: "include",
        method: "DELETE",
      }
    );
    const data = await res.json();
    console.log(data.message);
    window.location.reload()
  }

  function forfeitDelete() {
    props.setDeleteWarning((prev) => !prev);
  }

  return (
    <div className="delete-warning">
      <p>Sure you want to delete this post? This action is irreversible.</p>
      <section className="warning-buttons">
        <button onClick={() => handleDelete(post)}>Yes</button>
        <button onClick={forfeitDelete}>No</button>
      </section>
    </div>
  );
}
