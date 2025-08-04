import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import Profile from "./components/Profile";
import Archive from "./components/Archive";
import Lists from "./components/Lists";
import CreateList from "./components/CreateList";
import List from "./components/List";
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
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post username = {username}/>} />
         <Route path="/list/:id" element={<List/>} />
        <Route path="/profile" element={<Profile username = {username} setUsername = {setUsername} />} />
        <Route path="/archive" element={<Archive posts = {posts} setPosts={setPosts}/>}/>
        <Route path="/lists" element={<Lists />}/>
        <Route path="/createList" element={<CreateList />}/>
      </Routes>
    </>
  );
}

export default App;
