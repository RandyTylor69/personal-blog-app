import Posts from "./Posts";

export default function Home(props) {
  return (
    <main>
      <Posts posts = {props.posts} setPosts = {props.setPosts} />
    </main>
  );
}
