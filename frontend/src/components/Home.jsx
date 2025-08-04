import Featured from "./Featured";

export default function Home(props) {
  return (
    <main>
      <Featured posts={props.posts} setPosts={props.setPosts} />
    </main>
  );
}
