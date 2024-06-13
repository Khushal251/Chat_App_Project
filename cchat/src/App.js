import React from 'react';  // Add this line to import React
// import socketIO from "socket.io-client";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Join from "./component/Join/Join"
// import chat from './component/Chat/Chat';
import chat from './component/Chat/chat';


// const ENDPOINT ='http://localhost:4500';
// const socket = socketIO(ENDPOINT, {transports:['websocket']});

function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" Component={Join} />
          <Route path="/chat" Component={chat}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
