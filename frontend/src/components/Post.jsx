import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CreateComment from "./CreateComment";
import React from "react";

export default function Post(props) {
  // deese states do be statin'
  const { id } = useParams();
  const [postData, setPostData] = React.useState(null);
  const [commentData, setCommentData] = React.useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/post/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPostData(data.post);
        setCommentData(data.comments);
      });
  }, []);

  // loading page while waiting for the data to fetch
  if (!postData || !setCommentData) {
    return <h1 className="loading">Loading</h1>;
  }

  // destructuring objects
  const { title, overview, content } = postData;


  // mapping comments
  const commentsMapped = commentData.map((comment, key) => {
    return (
      <div className="comment">
        <p>{`${comment.content} - ${comment.author.username}`}</p>
      </div>
    );


  });

  return (
    <div className="post-page">
      <header>
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
      <h3 className="username">{`Written by ${postData.author.username}`}</h3>
      <p className="content">{content}</p>
      <CreateComment postId={id} isLoggedIn={props.username} />
      <div className="comments-page">
        <h3>Comments</h3>
        <div className="comments-container">
          {commentsMapped}
        </div>
      </div>
    </div>
  );
}
