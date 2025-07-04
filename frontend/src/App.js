import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import React from "react";

import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [username, setUsername] = React.useState(null)
  console.log(process.env.REACT_APP_SERVER_URL)
  return (
    <>
      <Header username = {username} setUsername = {setUsername}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp username = {username} setUsername = {setUsername}/>}  />
        <Route path="/login" element={<Login username = {username} setUsername = {setUsername}/>} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post username = {username}/>} />
      </Routes>
    </>
  );
}

export default App;
