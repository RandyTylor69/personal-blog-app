import Featured from "./Featured";
import Archive from "./Archive";
import React from "react";

export default function Home(props) {
  const [homeView, setHomeView] = React.useState(true); // true: featured; false: archive

  return (
    <main>
      {homeView ? (
        <Featured posts={props.posts} setPosts={props.setPosts} />
      ) : (
        <Archive />
      )}
    </main>
  );
}
