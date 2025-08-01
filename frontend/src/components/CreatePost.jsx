import React from "react";
import { Navigate, redirectDocument } from "react-router-dom";
import ReactMarkdown from "https://esm.sh/react-markdown@7";

export default function CreatePost() {
  const [title, setTitle] = React.useState("");
  const [overview, setOverview] = React.useState("");
  const [content, setContent] = React.useState(""); // goes to preview too
  const [file, setFile] = React.useState(null);
  const [redirect, setRedirect] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("file").size === 0) {
      alert("Please upload a cover image!");
      return;
    }
    // fetch request
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/create`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }
    alert(data.message);
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  } else
    return (
      <main className="create-post-page">
        {/* --------------EDITOR------------------*/}

        <form
          className="create-post-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <label htmlFor="title" className="input-label">Title</label>
          <input
            name="title"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={60}
            required
          />
          <label htmlFor="title" className="input-label">Overview</label>
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
          <label htmlFor="title" className="input-label">Body</label>
          <textarea
            className="content-area"
            name="content"
            placeholder="Blog away..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="submit-class">
            <label htmlFor="file" className="file-class">
              Conver Image
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

        {/* --------------PREVIEW------------------*/}
        <div className="post-preview">
          <section className="preview-wrapper">
            <header><h2>Preview</h2></header>
            <ReactMarkdown className="markdown-content">{content}</ReactMarkdown>
          </section>
        </div>
      </main>
    );
}
