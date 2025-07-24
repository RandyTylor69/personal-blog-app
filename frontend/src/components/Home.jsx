import Featured from "./Featured";
import Archive from "./Archive";
import React from "react";

export default function Home(props) {
  return (
    <main>
      <Featured posts={props.posts} setPosts={props.setPosts} />
    </main>
  );
}
