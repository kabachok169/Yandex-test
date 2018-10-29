import {SET_FLIGHTS} from '../constants/ReducersConstants';

const initialState: any = {flights: []};

export default function flights(state: any = initialState, action: any): any {
    switch (action.type) {
        case SET_FLIGHTS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}