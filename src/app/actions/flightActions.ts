import {SET_FLIGHTS} from '../constants/ReducersConstants';
import {data} from '../../data';
import {IState} from '../containers/MainPage/MainPage';

export function setFlights(filters: IState, flights: any = data): any {
    let checkedSearch: Array<any> = flights;

    if (filters.search) {
        checkedSearch = flights.filter((item) => {
            return item.number.includes(filters.search);
        });
    }    

    const newData: Array<any> = checkedSearch.filter((item) => {
        if (!filters.arrival && !filters.departure) {
            return false;
        }
        if (!filters.delay) {
            return item.status === filters.arrival || item.status === !filters.departure;
        }
        return item.delay && (item.status === filters.arrival || item.status === !filters.departure);
    });

    return {
        type: SET_FLIGHTS,
        payload: {flights: newData}
    };
}
