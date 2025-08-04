// NOT TO BE CONFUSED WITH
// LISTS.JSX

import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function List() {
  const { id } = useParams();

  const [listData, setListData] = React.useState(null);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListData(data);
      });
  }, []);

  return (
    <>
      {" "}
      {listData && (
        <div className="individual-list">
          <header className="il-header">
            <h1>
              {listData.name} <span>by {listData.author.username}</span>
            </h1>
            <p>{listData.description}</p>
          </header>
          <div className="il-posts-container">
            {listData.content.map((post, key) => (
              <Link className="il-post-card" to={`/post/${post._id}`}>
                
                  <h2>{post.title}</h2>
               
                <p>Overview: {post.overview}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
