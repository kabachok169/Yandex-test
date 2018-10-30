import {SET_FLIGHTS} from '../constants/ReducersConstants';

// import '../../data.json'

export function getFlights(): any {
    console.log(1);
    return async (dispatch) => {
        dispatch(setFlights({flights: [1, 2, 3]}))
    }
}

export function setFlights(flights): any {
    return {
        type: SET_FLIGHTS,
        payload: flights
    };
}