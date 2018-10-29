import {SET_FLIGHTS} from '../constants/ReducersConstants';

// import '../../data.json'

export function getFlights(): any {
    console.log(1);
    return async (dispatch) => {
        // const reader: FileReader = new FileReader();
        // const file: File = new File([''], '../../data.json', {type: 'plain/text'});
        // console.log(file);
        // reader.onloadend = async () => {
        //     const data : string = await JSON.parse(reader.result.toString());
        //     console.log(2);
        //     dispatch(setFlights(data));
        // }
        // reader.onerror = (e) => {
        //     console.log(e);
        // };
        // reader.readAsText(file);

        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", './data.json', false);
        rawFile.onreadystatechange = function ()
        {
            console.log('cool');
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    const data : string = JSON.parse(allText);
                    console.log(2);
                    dispatch(setFlights(data));
                }
            }
        }
        rawFile.onerror = (e) => {
            console.log(e);
        };
        rawFile.send(null);
        dispatch(setFlights({flights: [1, 2, 3]}))
    }
}

export function setFlights(flights): any {
    return {
        type: SET_FLIGHTS,
        payload: flights
    };
}