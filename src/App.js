import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from "./components/Weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Heavy Weather</h1>
      </header>
      <div>
        <h2>Current weather: </h2>
        <Weather />
      </div>
    </div>
  );
}

export default App;
