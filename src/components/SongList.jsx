import React from 'react'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify();
export default class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getPlaylist(genre) {
    spotifyWebApi.getCategoryPlaylists(genre)
        .then((response) => {
          console.log(response)
          const playlistNum = this.getRandomInt(19);
          if (response) {
            console.log(response)
            const url = response.playlists.items[playlistNum].uri;
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
  componentDidMount() {
    const weather = "Rain";
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
    }
  }
  // getNowPlaying() {
  //   spotifyWebApi.getCategoryPlaylists("hiphop")
  //     .then((response) => {
  //       console.log(response)
  //       if (response) {
  //         console.log(response)
  //         const url = response.playlists.items[3].uri;
  //         const uri = url.slice(17, url.length);
  //         console.log(uri)
  //         this.setState({
  //           categories: `https://open.spotify.com/embed/playlist/${uri}`
  //         })
  //       } else {
  //         this.setState({
  //           categories: 'nothing'
  //         });
  //       }
  //     })
  // }

  render() {
    return (
      <div>
        <div onMount={() => this.componentDidMount()}>
          Check Now Playing
          </div>
        <div>
          <iframe src={this.state.categories}
            width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media">
          </iframe>
        </div>
      </div>
    )
  }
}
