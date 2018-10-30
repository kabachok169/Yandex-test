import {SET_FLIGHTS} from '../constants/ReducersConstants';
import {data} from '../../data';


// export function getFlights(): any {
//     return async (dispatch) => {
//         // dispatch(setFlights({flights: [1, 2, 3]}))
//     }
// }

export function setFlights(filters, flights = data): any {
    let checkedSearch = flights;

    if (filters.search) {
        checkedSearch = flights.filter((item) => {
            return item.number.includes(filters.search);
        });
    }    

    const newData = checkedSearch.filter((item) => {
        if (!filters.arrival && !filters.departure) {
            return false;
        }
        if (!filters.delay) {
            return item.status === filters.arrival || item.status === !filters.departure;
        }
        return item.delay && (item.status === filters.arrival || item.status === !filters.departure);
    });

    console.log(newData);


    return {
        type: SET_FLIGHTS,
        payload: {flights: newData}
    };
}
