import * as React from 'react';

import './MainPage.scss';

import { Header, Button, Container, Table, Pagination, Grid, Checkbox, Input } from 'semantic-ui-react';
import PaginatedTable from '../../components/PaginatedTable/PaginatedTable';

import {Redirect} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as flightActions from '../../actions/flightActions';
import flights from '../../reducers/flightReducer';



interface IProps {
    flightActions? : any;
    flights? : any;
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

public handlePaginationChange(event: any, object: any): void {
    this.setState({activePage: object.activePage});
}

public handleCheck(event: any, checkbox: any): void {
    const newState: IState = {};
    newState[checkbox.value] = checkbox.checked;
    this.setState(newState);
    this.props.flightActions.setFlights({...this.state, ...newState});
}

public search(event: any, object: any): void {
    this.setState({search: object.value});
    this.props.flightActions.setFlights({...this.state, search: object.value});
}

public render(): JSX.Element {
    const {flights}: any = this.props;

    const headers: Array<string> = ['Время вылета', 'Город', 'Номер рейса', 'Время прибытия', 'Статус', 'Задерживается'];

    return (
        <div>
            <div className="header">
                <Header className="header__info" size="huge">Flights</Header>
            </div>
            <div className="main">
                <div className="checkboxes">
                    <Grid>
                        <Grid.Row columns={6}>
                            <Grid.Column key={1}>
                                <Checkbox toggle defaultChecked value='arrival' onChange={this.handleCheck} label={{ children: 'Прилет' }}/>
                            </Grid.Column>
                            <Grid.Column key={3}>
                                <Checkbox toggle defaultChecked value='departure' onChange={this.handleCheck} label={{ children: 'Отлет' }}/>
                            </Grid.Column>
                            <Grid.Column key={5}>
                                <Checkbox toggle value='delay' onChange={this.handleCheck} label={{ children: 'Только задержанные рейсы' }}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={5}>
                            <Grid.Column key={1}><Input fluid onChange={this.search} icon="search" placeholder="Search..."/></Grid.Column>
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
        </div>
    );
}
}

const mapStateToProps: any = (state: any) => {
    return {
        flights: state.flights,
    };
};

const mapDispatchToProps: any = (dispatch: any) => {
    return {
        flightActions: bindActionCreators(flightActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);