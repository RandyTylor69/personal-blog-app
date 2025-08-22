import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import CreateComment from "./CreateComment";
import React from "react";
import ReactMarkdown from "react-markdown";
import { userContext } from "../App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock } from "@fortawesome/free-solid-svg-icons";

export default function Post(props) {
  // deese states do be statin'
  const { id } = useParams();
  const [postData, setPostData] = React.useState(null);
  const [authorId, setAuthorId] = React.useState(null);
  const [commentData, setCommentData] = React.useState(null);
  const userId = React.useContext(userContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/post/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPostData(data.post);
        setCommentData(data.comments);

        setAuthorId(data.post.author._id);
      });
  }, []);

  // loading page while waiting for the data to fetch
  if (!postData || !commentData) {
    return <h1 className="loading">Loading</h1>;
  }

  // destructuring objects
  const { title, overview, content } = postData;

  // mapping comments
  const commentsMapped = commentData.map((comment, key) => {
    return (
      <div className="comment">
        <p>
          {`${comment.content} - `}
          <span className="comment-author">
            {comment.author.username} {comment.createdAt.split("T")[0]}
          </span>
        </p>
      </div>
    );
  });

  return (
    <div className="post-page">
      <header className="post-header">
        <div className="header-words">
          <h1>{title}</h1>
          <div className="overview">
            <p>{overview}</p>
          </div>
        </div>
        <div className="header-img">
          <img src={postData.file} />
        </div>
      </header>
      <h3 className="author-info">
        <p>
          <FontAwesomeIcon icon={faUser} />
          {` `}
          {postData.author.username} · <FontAwesomeIcon icon={faClock} />
          {` `}
          {postData.createdAt.split("T")[0]}
          {/** --- if the userId and the authorId match, allow edit --- */}
          {userId === authorId && (
            <Link to={`/edit/${postData._id}`}>
              <button> Edit Post </button>
            </Link>
          )}
        </p>
      </h3>
      <section className="content-wrapper">
        <div className="markdown-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </section>

      <CreateComment postId={id} isLoggedIn={props.username} />
      <div className="comments-page">
        <h3>Comments</h3>
        <div className="comments-container">{commentsMapped}</div>
      </div>
    </div>
  );
}
