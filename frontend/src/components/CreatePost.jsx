import React from "react";
import { Navigate, redirectDocument } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = React.useState("");
  const [overview, setOverview] = React.useState("");
  const [content, setContent] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [redirect, setRedirect] = React.useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    
    // fetch request
      const res = await fetch("http://localhost:3001/create", {
        method:"POST",
        credentials: "include",
        body: formData,
    })
    const data = await res.json()
    if (!res.ok){
      alert(data.message)
      console.error(data.error)
    }
    alert(data.message)
    console.log(data.userDoc)
    setRedirect(true)
  }



  if (redirect) {
    return <Navigate to={"/"} />
  } else
  return (
    <form
      onSubmit={handleSubmit}
      className="create-post-form"
      autoComplete="off"
    >
      <input
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        maxLength={60}
      />
      <textarea
      className="overview-area"
        name="overview"
        placeholder="overview"
        value={overview}
        onChange={(e) => setOverview(e.target.value)}
        required
        maxLength={200}
        draggable="false"
      />

      <textarea
      className="content-area"
        name="content"
        placeholder="Blog away..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="submit-class">
        <label for="file" className="file-class">
          Optional cover image{" "}
        </label>
        <input
        name="file"
        id="file"
          type="file"
          placeholder="upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Post</button>
      </div>
    </form>
  );
}
