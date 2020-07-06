import { CHANGE_WEATHER } from './actions';

const initialState = {
    weather: 'Clear',
    background: "Clear.mp4",
    icon: 'Clear.png',
}

export default function weatherReducer(state = initialState, action){
    switch(action.type){
        case CHANGE_WEATHER:
            return {...state, weather: action.data.weather[0].main, background: `${action.data.weather[0].main}.mp4`, icon: `${action.data.weather[0].main}.png` }
        default:
            return state
    }
}