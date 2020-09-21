import React from "react";
import "./App.css";
import ChatBox from "./components/ChatBox/ChatBox";

const App = () => {
  return (
    <div className="app">
      <div className="app-body">
        <ChatBox />
      </div>
    </div>
  );
};

export default App;
