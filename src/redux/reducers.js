import { CHANGE_WEATHER } from './actions';

const initialState = {
    weather: 'Clear',
    background: "Clear.gif",
}

export default function weatherReducer(state = initialState, action){
    switch(action.type){
        case CHANGE_WEATHER:
            return {...state, weather: action.data.weather[0].main, background: `${action.data.weather[0].main}.gif`}
        default:
            return state
    }
}