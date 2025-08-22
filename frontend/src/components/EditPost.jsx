import React from "react";
import { Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";

export default function CreatePost() {
  const [title, setTitle] = React.useState("");
  const [overview, setOverview] = React.useState("");
  const [content, setContent] = React.useState(""); // goes to preview too
  const [file, setFile] = React.useState(null);
  const [redirect, setRedirect] = React.useState(false);
  const { id: postId } = useParams(); // getting post id from the main post page

  // grabbing all the original post info, display them.
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/post/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.post.title);
        setOverview(data.post.overview);
        setContent(data.post.content);
        setFile(data.post.file);
      });
  }, []);

  // updating fetch!
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!file) {
      alert("Please upload a cover image!");
      return;
    }


    // fetch request


/*     const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/editPost/${postId}`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
      return;
    }
    alert(data.message);
    console.log(data.post);
    setRedirect(true); */
  }

  React.useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

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
          <label htmlFor="title" className="input-label">
            Edit Title
          </label>
          <input
            name="title"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={60}
            required
          />
          <label className="input-label">Edit Overview</label>
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
          <label htmlFor="title" className="input-label">
            Edit Body {` `}
            <a
              href="https://www.markdownguide.org/cheat-sheet/"
              className="label-body-span"
            >
              {`(markdown syntax available)`}
              <FontAwesomeIcon icon={faArrowPointer} />
            </a>
          </label>
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
            <button type="submit">Edit</button>
          </div>
          {file && (
            <div className="file-shower">
              <div className="file-shower-item">
                <p>{file.name ? file.name : "old cover img"}</p>
                <button
                  onClick={() => {
                    setFile(null);
                  }}
                >
                  X
                </button>
              </div>
            </div>
          )}
        </form>

        {/* --------------PREVIEW------------------*/}
        <div className="post-preview">
          <section className="preview-wrapper">
            <header>
              <h2>Preview</h2>
            </header>
            <div className="markdown-content">
              {" "}
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </section>
        </div>
      </main>
    );
}
