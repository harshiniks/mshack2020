import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Github Kudos</h2>
        <h4>Happy team, healthy team</h4>
        <img src={process.env.PUBLIC_URL + 'resources/Octocat.png'} className="App-logo" alt="Github" />
        <p style={{fontSize: "12px"}}>Kudos helps recognising employees, there by increasing their engagement and strengthen the company culture.</p>
        <Link style={{color: "white"}} to="/Organizations">Your Organizations</Link>
      </header>
    </div>
  );
}

export default App;
