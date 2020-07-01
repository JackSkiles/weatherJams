import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from "./components/Weather";
import SongList from "./components/SongList"
import { Link } from "react-router-dom"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Spotify from 'spotify-web-api-js';
import { connect } from 'react-redux';
import { changeWeather } from './redux/actions';

const spotifyWebApi = new Spotify();

class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams()
    this.state = {
      // weather: "Clear",
      // background: "url(./Clear.gif)",
      loggedInt: params.access_token ? true : false,
      categories: [],
      playlist: [],
      visible: 'visible'
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
          this.props.changeWeather(data);
        }
      })
    this.playlistGet()
    this.setState({visible: 'hidden'});
  }

  
  getPlaylist(genre) {
    spotifyWebApi.getCategoryPlaylists(genre)
        .then((response) => {
          console.log(response)
          const playlistNum = this.getRandomInt(response.playlists.items.length);
          if (response) {
            console.log(response)
            const url = response.playlists.items[playlistNum].uri;
            const uri = url.slice(17, url.length);
            console.log(uri)
            this.setState({
              playlist: `https://open.spotify.com/embed/playlist/${uri}`
            })
          } else {
            this.setState({
              playlist: 'nothing'
            });
          }
        })
  }

  getRandomInt(max) {
    return Math.floor(Math.random(0) * Math.floor(max));
  }


  componentDidMount() {
    this.getPlaylist("pop");
  }

  playlistGet = () => {
    const weather = this.props.weather;
    switch(weather) {
      case "Clear":
        this.getPlaylist("pop");
        break;
      case "Clouds":
        this.getPlaylist("chill");
        break;
      case "Drizzle":
        this.getPlaylist("jazz");
        break;
      case "Rain":
        this.getPlaylist("focus");
        break;
      case "Snow":
        this.getPlaylist("sleep");
        break;
      case "Thunderstorm":
        this.getPlaylist("rock");
        break;
      default:
        this.getPlaylist("pop")
    }
  }
  
  
  render() {
    return (
      <Router>
        <div className="App">
        <div style={{
                height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
                backgroundImage: `url(../${this.props.background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
              }}>
          <Switch>
            <Route path="/" exact>
              <div className="card">
                <div>
                  <a href='http://localhost:8888'>
                    <button>Login With Spotify</button>
                  </a>
                </div>
              </div>
              {/* <h1>{ this.state.categories }</h1> */}
            </Route>
            <Route path="/SongList">
                  <Weather visible={this.state.visible} handleSubmit={(e, state) => {
                    this.weatherGet(state)
                  }} />
                <SongList weatherGet={this.weatherGet} playlist={this.state.playlist}/>
              </Route>
            </Switch>
          </div>
          </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
    background: state.background
  }
}

const mapDispatchToProps = {
  changeWeather
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
