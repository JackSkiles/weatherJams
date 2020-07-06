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
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import 'bootstrap/dist/css/bootstrap.min.css';

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
      visible: 'visible',
      mood: 'cheerful',
      code: ''
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
      }).then(
        this.playlistGet()
      )
    this.setState({ visible: 'hidden' });
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
    switch (weather) {
      case "Clear":
        this.setState({mood: 'Cheerful'})
        this.getPlaylist("pop");
        break;
      case "Clouds":
        this.setState({mood: 'Chill'})
        this.getPlaylist("chill");
        break;
      case "Drizzle":
        this.setState({mood: 'Laid back'})
        this.getPlaylist("jazz");
        break;
      case "Rain":
        console.log(this.props.icon)
        this.setState({mood: 'Focused'})
        this.getPlaylist("focus");
        break;
      case "Snow":
        this.setState({mood: 'Relaxed'})
        this.getPlaylist("sleep");
        break;
      case "Thunderstorm":
        this.setState({mood: 'Hype'})
        this.getPlaylist("rock");
        break;
      default:
        this.setState({mood: 'Cheerful'})
        this.getPlaylist("pop")
    }
  }

  newPlaylist = () => {
    this.playlistGet();
  }
 
  customPlaylist = (e) => {
    this.getPlaylist(e.target.name);
  }

  konamiCode = (e) => {
    this.setState({code: e.target.value})
  }

  render() {
    return (
      <Router>
        <div className="App" onChange={this.konamiCode}>
          <Switch>
            <Route path="/" exact>
              <video src={this.props.background} autoPlay="true" loop="true" muted="true"></video>
              <div>
                <div className="card">
                  <div>
                    <a href='/login'>
                      <Button>Login With Spotify</Button>
                    </a>
                  </div>
                </div>
              </div>
              {/* <h1>{ this.state.categories }</h1> */}
            </Route>
            <Route path="/SongList">
            <video src={`../${this.props.background}`} autoPlay="true" loop="true" muted="true"></video>
                <div>
                  <header className="App-header">
                    <div className="container">
                      <div className="titleCont">
                        <div className="title">
                          <h1 className="h1Text">Heavy Weather</h1>
                        </div>
                        <div>
                          <Weather handleSubmit={(e, state) => {
                            this.weatherGet(state)
                          }} />
                        </div>
                      </div>
                      <div className ="whiteSpace"></div>
                      <div className="whiteSpace">
                        <img src={this.props.icon} className="img" ></img>
                      </div>
                    </div>
                  </header>
                <div classNam="playlist" style={{position: 'absolute', top: '30%', left: '35%', width: '65vw'}}>
                  <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '50%'}}>
                    <h3>Mood: {this.state.mood}</h3>
                    <ButtonGroup>
                      <Button style={{ backgroundColor: 'rgba(162, 241, 255, .7)', border: '1px solid rgba(99, 224, 247)' }} onClick={this.newPlaylist}>Weather Playlist</Button>
                      <Button name="decades" style={{ backgroundColor: 'rgba(162, 241, 255, .7)', border: '1px solid rgba(99, 224, 247)' }} onClick={this.customPlaylist}>Decades</Button>
                      <Button name="summer" style={{ backgroundColor: 'rgba(162, 241, 255, .7)', border: '1px solid rgba(99, 224, 247)' }} onClick={this.customPlaylist}>Summer</Button>
                      <Button name="r&b" style={{ backgroundColor: 'rgba(162, 241, 255, .7)', border: '1px solid rgba(99, 224, 247)' }} onClick={this.customPlaylist}>R&B</Button>
                      <Button name="gaming" style={{ backgroundColor: 'rgba(162, 241, 255, .7 )', border: '1px solid rgba(99, 224, 247)' }} onClick={this.customPlaylist}>Gaming</Button>
                    </ButtonGroup>
                    <SongList variant="primary" size="sm" weatherGet={this.weatherGet} playlist={this.state.playlist} />
                  </div>
                </div>
                <div>

                </div>
              </div>
            </Route>
          </Switch>
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
