import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from "./components/Weather";

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
                if(data.cod === "404"){
                  alert('Please enter valid location');
                } else {
                this.setState({weather: data.weather[0].main, background: `url(./${data.weather[0].main}.gif)`})
                }
            })
    }
    
  render(){
      return (
        <div className="App">
            <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
            backgroundImage: this.state.background, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
            }}>
            <div style={{width: '30%', height: '35vh', backgroundColor: 'white', marginTop: '10px', borderRadius: '7px'}}>
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
