import * as React from 'react';

import './MainPage.scss';

import { Header, Button, Container, Table, Pagination, Grid, Checkbox, Input } from 'semantic-ui-react';

import {Redirect} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as flightActions from '../../actions/flightActions';
import flights from '../../reducers/flightReducer';


interface IProps {
    flightActions? : any;
    flights? : any;
}

class MainPage extends React.Component<IProps, any> {

constructor(props: any) {
    super(props);

    this.state = {
        totalPages: 10,
        currentPage: 1,
        arrival: true,
        departure: true,
        delay: false,
        search: ''
    };

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.search = this.search.bind(this);
}

public componentWillMount() {
    this.props.flightActions.setFlights(this.state);
}

public handlePaginationChange(e: any, o: any) {
    const page: number = (o.activePage - 1) * this.state.totalPages + 1;
    this.setState({currentPage: page});
}

public handleCheck(event, checkbox): void {
    const newState = {};
    newState[checkbox.value] = checkbox.checked;
    this.setState(newState);
    this.props.flightActions.setFlights({...this.state, ...newState});
}

public search(event, object): void {
    this.setState({search: object.value});
    this.props.flightActions.setFlights({...this.state, search: object.value});
}

public render(): JSX.Element {
    const {flights} = this.props;
    console.log(flights);

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
            
                <Table singleLine columns={6} textAlign="center" selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Время вылета</Table.HeaderCell>
                            <Table.HeaderCell>Город</Table.HeaderCell>
                            <Table.HeaderCell>Номер рейса</Table.HeaderCell>
                            <Table.HeaderCell>Время прибытия</Table.HeaderCell>
                            <Table.HeaderCell>Статус</Table.HeaderCell>
                            <Table.HeaderCell>Задерживается</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {flights.flights.length ? flights.flights.map((item, key) => {
                            if (key >= this.state.currentPage - 1 && key < this.state.currentPage + this.state.totalPages) {
                                return(
                                    <Table.Row negative={item.delay} positive={!item.delay}>
                                        <Table.Cell>{item.time}</Table.Cell>
                                        <Table.Cell>{item.destination}</Table.Cell>
                                        <Table.Cell>{item.number}</Table.Cell>
                                        <Table.Cell>{item.arrival_time}</Table.Cell>
                                        <Table.Cell>{item.status ? 'arrival' : 'departure'}</Table.Cell>
                                        <Table.Cell>{item.delay ? 'Да' : 'Нет'}</Table.Cell>
                                    </Table.Row>
                                );
                            }
                        }) : ''}
                    </Table.Body>
                </Table>
                <Pagination 
                    boundaryRange={0} 
                    defaultActivePage={1} 
                    totalPages={flights.flights.length / this.state.totalPages} 
                    onPageChange={this.handlePaginationChange} 
                />
            </div>
        </div>
    );
}
}

const mapStateToProps = (state) => {
    return {
        flights: state.flights,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        flightActions: bindActionCreators(flightActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);