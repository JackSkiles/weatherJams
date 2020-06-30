import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from "./components/Weather";
import SongList from "./components/SongList"
import {Link} from "react-router-dom" 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: "",
      background: "url(./Clear.gif)"
    }
  }

  weatherGet = (state) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state.city},${state.state},${state.country}&appid=c6009635b8482d222193df4508ba690a`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.cod === "404") {
          alert('Please enter valid location');
        } else {
          this.setState({ weather: data.weather[0].main, background: `url(./${data.weather[0].main}.gif)` });
        }
      })
  }

  getSong = (e) => {
    console.log("Hello")
    if (this.state.weather === "Clouds"){
      let num = 0;
      while (num < 10){
        const randomNum = Math.floor(Math.random() * 3135556);
        console.log(randomNum);
        num++
      }
      fetch(`https://api.deezer.com/aa6dd1a30087eba6aba15aa1c92630b8/track/3135556`)
    }
  }

  render() {
    return (
      <Router>
      <Route path="/SongList"></Route>
      <Link to="/SongList"></Link>
      <div className="App">
        <div style={{
          height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundImage: this.state.background, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
        }}>
          <Switch>
            <Route path="/" exact>
              <div style={{ width: '30%', height: '35vh', backgroundColor: 'white', marginTop: '10px', borderRadius: '7px' }}>
                <Weather handleSubmit={(e, state) => {
                  this.weatherGet(state)
                }} />
                <button onClick={this.getSong}>Get Songs</button>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
