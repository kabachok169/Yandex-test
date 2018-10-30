import {combineReducers} from 'redux';
import flights from './flights/flightReducer';

export default combineReducers(
    {
        flights
    }
);
