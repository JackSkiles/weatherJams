import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from "./components/Weather";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: {},
            background: ""
        }
    }

    weatherGet = (state) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state.city},${state.state},${state.country}&appid=c6009635b8482d222193df4508ba690a`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({weather: data.weather[0].main, background: `url(./${data.weather[0].main}.jpg)`})
            })
    }
  render(){
      return (
        <div style={{height: '100vh', backgroundImage: this.state.background}}>
          <div className="App">
            <header className="App-header">
              <h1>Heavy Weather</h1>
            </header>
            <div>
              <h2>Current weather: </h2>
              <Weather handleSubmit={(e, state) => {
                this.weatherGet(state)
              }}/>
            </div>
          </div>
        </div>
      );
    }
  }

export default App;
