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
    
  getNowPlaying(){
    spotifyWebApi.getCategoryPlaylists("country")
    .then((response) => {
      console.log(response)
      if(response){
        this.setState({
          categories: response
          })
      } else {
        this.setState({categories: 'nothing'
        });
      }
    })
  }

    render(){
        return (
            <div>
                  <div> Now Playing: </div>
                  <div>
                    {/* <img src={ this.state.nowPlaying.image } style={{width: 100}}/> */}
                  </div>
                  <button onClick={() => this.getNowPlaying()}>
                    Check Now Playing
                  </button>
            </div>
        )
    }
}
