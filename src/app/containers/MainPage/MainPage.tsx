import * as React from 'react';

import './MainPage.scss';

import { Header, Grid, Checkbox, Input } from 'semantic-ui-react';
import PaginatedTable from '../../components/PaginatedTable/PaginatedTable';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as flightActions from '../../redux/flights/flightActions';
import {IFlight} from '../../../data';


interface IProps {
    flightActions? : any;
    flights? : Array<IFlight>;
}

export interface IState {
    totalPages?: number,
    activePage?: number,
    arrival?: boolean,
    departure?: boolean,
    delay?: boolean,
    search?: string
}

class MainPage extends React.Component<IProps, IState> {
constructor(props: IProps) {
    super(props);

    this.state = {
        totalPages: 10,
        activePage: 1,
        arrival: true,
        departure: true,
        delay: false,
        search: ''
    };

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.search = this.search.bind(this);
}

public componentWillMount(): void {
    this.props.flightActions.setFlights(this.state);
}

public handlePaginationChange(event, object) {
    this.setState({ activePage: Math.ceil(object.activePage) });
}

public handleCheck(event, checkbox): void {
    const newState: IState = {};
    newState[checkbox.value] = checkbox.checked;
    this.setState({...newState, activePage: 1});
    this.props.flightActions.setFlights({...this.state, ...newState});
}

public search(event, object): void {
    this.setState({search: object.value, activePage: 1});
    this.props.flightActions.setFlights({...this.state, search: object.value});
}

public render(): JSX.Element {
    const {flights}: any = this.props;

    const headers: Array<string> = ['Время вылета', 'Город', 'Номер рейса', 'Время прибытия', 'Статус', 'Задерживается'];

    return (
        <React.Fragment>
            <div className="header">
                <Header className="header__info" size='huge' color='black'>Расписание рейсов</Header>
            </div>
            <div className="main">
                <div className="checkboxes">
                    <Grid>
                        <Grid.Row columns={5}>
                            <Grid.Column floated='left'>
                                <Checkbox toggle defaultChecked value='arrival' onChange={this.handleCheck} label={{ children: 'Прилет' }}/>
                            </Grid.Column>
                            <Grid.Column floated='left'>
                                <Checkbox toggle defaultChecked value='departure' onChange={this.handleCheck} label={{ children: 'Вылет' }}/>
                            </Grid.Column>
                            <Grid.Column floated='left'>
                                <Checkbox toggle value='delay' onChange={this.handleCheck} label={{ children: 'Только задержанные рейсы' }}/>
                            </Grid.Column>
                            <Grid.Column floated='right' width={4}>
                                <Input fluid onChange={this.search} icon="search" placeholder="Поиск по номеру рейса"/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            
                {flights.flights.length ?
                    <PaginatedTable
                        headers={headers}
                        onPaginate={this.handlePaginationChange}
                        totalPages={this.state.totalPages}
                        activePage={this.state.activePage}
                        flights={flights.flights}
                    /> : ''
                }
            </div>
        </React.Fragment>
    );
}
}

const mapStateToProps: any = (state: any) => {
    return {
        flights: state.flights
    };
};

const mapDispatchToProps: any = (dispatch: any) => {
    return {
        flightActions: bindActionCreators(flightActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);