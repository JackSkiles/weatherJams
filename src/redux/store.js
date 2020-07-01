import { createStore } from 'redux';
// If you make more reducers look at todoList root reducer
import weatherReducer from './reducers';

const store = createStore(weatherReducer);


export default store;