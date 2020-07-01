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

 
  render() {
    return (
      <div  mount={() => this.componentDidMount()}>
        <div>
          <iframe src={this.props.playlist}
            style={{width: '70vh', height: '70vh'}} allow="encrypted-media">
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