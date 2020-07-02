import React from 'react';
import Spotify from 'spotify-web-api-js';
import { connect } from 'react-redux';



const spotifyWebApi = new Spotify();

class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: []
    }
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
    
    newPlaylist = () => {
      this.playlistGet();
    }
  render() {
    return (
      <div  mount={() => this.componentDidMount()}>
        <div>
          <iframe src={this.props.playlist}
            style={{width: '100%', height: '60vh'}} allow="encrypted-media">
          </iframe>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    weather: state.weather,
    background: state.background
  }
}

export default connect(
  mapStateToProps,
  null
)(SongList);