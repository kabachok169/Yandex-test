import {SET_FLIGHTS} from '../constants/ReducersConstants';
import {data} from '../../data';


// export function getFlights(): any {
//     return async (dispatch) => {
//         // dispatch(setFlights({flights: [1, 2, 3]}))
//     }
// }

export function setFlights(filters, flights = data): any {
    let checkedSearch = flights;
    console.log('filters: ', filters);

    if (filters.search) {
        checkedSearch = flights.filter((item) => {
            return item.number.includes(filters.search);
        });
    }    

    const newData = checkedSearch.filter((item) => {
        if (!filters.arrivalCheck && !filters.departureCheck) {
            return false;
        }
        if (!filters.delayCheck) {
            return item.status === filters.arrivalCheck || item.status === !filters.departureCheck;
        }
        return item.delay && (item.status === filters.arrivalCheck || item.status === !filters.departureCheck);
    });

    console.log(newData);


    return {
        type: SET_FLIGHTS,
        payload: {flights: newData}
    };
}
