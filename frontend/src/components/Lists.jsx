import React from "react";
import { Link } from "react-router-dom";
export default function Lists() {
  const [lists, setLists] = React.useState([]);
  let listsMapped = null;

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/lists`)
      .then((res) => res.json())
      .then((data) => {
        setLists(data);
      });
  }, []);

  // display all the lists once they're fetched
  if (lists) {
    listsMapped = lists.map((list, key) => (
      <Link className="list-card" key={key} to={`/list/${list._id}`}>
        <header className="list-card-header">
          <p>
            {list.author.username} {list.createdAt.split("T")[0]}
          </p>
        </header>
        <section className="list-card-main-section">
          <p>
            <span>{list.name}. </span>
            {list.description}
          </p>
        </section>
      </Link>
    ));
  }
  return (
    <div className="list-page">
      <header className="list-header">
        <h1>Come and see: lists are perfect for grouping blog posts.</h1>
        <Link to={"/createList"}>Create new list</Link>
      </header>
      <section className="list-wrapper">
        {lists ? listsMapped : <h1 className="loading-text">Loading...</h1>}
      </section>
    </div>
  );
}
