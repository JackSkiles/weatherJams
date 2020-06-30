import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from "./components/Weather";
import SongList from "./components/SongList"
import { Link } from "react-router-dom"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify();

class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams()
    this.state = {
      weather: "",
      background: "url(./Clear.gif)",
      loggedInt: params.access_token ? true : false,
      categories: []
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
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
    if (this.state.weather === "Clouds") {
      let num = 0;
      while (num < 10) {
        const randomNum = Math.floor(Math.random() * 3135556);
        console.log(randomNum);
        num++
      }
      fetch(`https://api.deezer.com/aa6dd1a30087eba6aba15aa1c92630b8/track/3135556`)
    }
  }

  getNowPlaying() {
    spotifyWebApi.getCategoryPlaylists("country")
      .then((response) => {
        console.log(response)
        if (response) {
          console.log(response)
          const url = response.playlists.items[2].uri;
          const uri = url.slice(17, url.length);
          console.log(uri)
          this.setState({
            categories: `https://open.spotify.com/embed/playlist/${uri}`
          })
        } else {
          this.setState({
            categories: 'nothing'
          });
        }
      })
  }

  render() {
    return (
      <Router>
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

                  <a href='http://localhost:8888'>
                    <button>Login With Spotify</button>
                  </a>
                  <button onClick={() => this.getNowPlaying()}>
                    Check Now Playing
                  </button>
                  {/* <h1>{ this.state.categories }</h1> */}
                  <Link to="/SongList"><h3>To Songlist</h3></Link>
                </div>
                <div>
                  <iframe src={this.state.categories}
                  width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media">
                  </iframe>
                </div>
              </Route>
            </Switch>
            <Route path="/SongList">
              <SongList />
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
