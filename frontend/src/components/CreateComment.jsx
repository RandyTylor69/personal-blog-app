
export default function CreateComment(props) {

  async function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append("postId", props.postId)
    // store the comment in the comments database
    const res = await fetch("http://localhost:3001/comments", {
      method: "POST",
      credentials: "include",
      body: formData
    })

    

    const data = await res.json()
    alert(data.message)
    window.location.reload()
  }
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      {props.isLoggedIn ? (
        <>
          {" "}
          <textarea
          name="content"
            maxLength={300}
            placeholder="Add something to the conversation!"
          />
          <button type="submit">Comment</button>
        </>
      ) : (
        <textarea
            placeholder="Need to log in first in order to comment :)"
            disabled
        ></textarea>
      )}
    </form>
  );
}
