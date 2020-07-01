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


  getNowPlaying() {
    spotifyWebApi.getCategoryPlaylists("hiphop")
      .then((response) => {
        console.log(response)
        if (response) {
          console.log(response)
          const url = response.playlists.items[3].uri;
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
      <div>
        <button onClick={() => this.getNowPlaying()}>
          Check Now Playing
                </button>
        <div>
          <iframe src={this.state.categories}
            width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media">
          </iframe>
        </div>
      </div>
    )
  }
}
