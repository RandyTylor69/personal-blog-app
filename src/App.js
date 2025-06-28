import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import React from "react";

import { Route,Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <SignUp setUsername={setUsername} setPassword={setPassword} />
          }
        />
        <Route
          path="/login"
          element={
            <Login setUsername={setUsername} setPassword={setPassword} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
