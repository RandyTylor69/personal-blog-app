import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CreateComment from "./CreateComment";
import React from "react";

export default function Post(props) {
  // grab all post information from post id
  const { id } = useParams();
  const [postData, setPostData] = React.useState(null);
  // title, overview, file-img, content, author name

  useEffect(() => {
    fetch(`http://localhost:3001/post/${id}`)
      .then((res) => res.json())
      .then((data) => setPostData(data));
  }, []);

  if (!postData) {
    return <h1 className="loading">Loading</h1>;
  }
  const { title, overview, content} = postData;

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
          <img src={`http://localhost:3001/${postData.file}`} />
        </div>
      </header>
      <h3 className="username">{`Written by ${postData.author.username}`}</h3>
      <p className="content">{content}</p>
        <CreateComment 
        postId = {id}
        isLoggedIn = {props.username}
        />
      
    </div>
  );
}
