import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import Profile from "./components/Profile";
import Archive from "./components/Archive";
import React from "react";

import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [username, setUsername] = React.useState(null)
  const [posts, setPosts] = React.useState([]);
  return (
    <>
      <Header username = {username} setUsername = {setUsername}/>
      <Routes>
        <Route path="/" element={<Home posts = {posts} setPosts={setPosts} />} />
        <Route path="/signup" element={<SignUp username = {username} setUsername = {setUsername}/>}  />
        <Route path="/login" element={<Login username = {username} setUsername = {setUsername}/>} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post username = {username}/>} />
        <Route path="/profile" element={<Profile username = {username} setUsername = {setUsername} />} />
        <Route path="/archive" element={<Archive posts = {posts} setPosts={setPosts}/>}/>
      </Routes>
    </>
  );
}

export default App;
