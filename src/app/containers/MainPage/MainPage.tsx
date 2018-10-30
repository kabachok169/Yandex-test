import * as React from 'react';

import './MainPage.scss';

import { Header, Button, Container, Table, Pagination, Grid, Checkbox, Input } from 'semantic-ui-react';

import {Redirect} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {data} from './data';

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
        arrivalCheck: true,
        departureCheck: true,
        delayCheck: false
    };

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleCheckData = this.handleCheckData.bind(this);
    this.handleDelayCheck = this.handleDelayCheck.bind(this);
    this.handleArrivalCheck = this.handleArrivalCheck.bind(this);
    this.handleDepartureCheck = this.handleDepartureCheck.bind(this);
    this.search = this.search.bind(this);
}

public componentWillMount() {
    this.handleCheckData(this.state);
}

public handlePaginationChange(e: any, o: any) {
    const page: number = (o.activePage - 1) * this.state.totalPages + 1;
    this.setState({currentPage: page});
}

public handleCheckData(filters, input = this.state.input): void {

    const checkedInput = data.flights.filter((item) => {
        if (!input) {
            return true;
        }
        return item.number.includes(input);
    });

    const newData = checkedInput.filter((item) => {
        if (!filters.arrivalCheck && !filters.departureCheck) {
            return false;
        }
        if (!filters.delayCheck) {
            return item.status === filters.arrivalCheck || item.status === !filters.departureCheck;
        }
        return item.delay && (item.status === filters.arrivalCheck || item.status === !filters.departureCheck);
    });

    this.setState({flights: newData});
}

public handleArrivalCheck(e, o): void {
    this.setState({arrivalCheck: o.checked});
    this.handleCheckData({...this.state, arrivalCheck: o.checked});
}

public handleDepartureCheck(e, o): void {
    this.setState({departureCheck: o.checked});
    this.handleCheckData({...this.state, departureCheck: o.checked});
}

public handleDelayCheck(e, o): void {
    console.log(o);
    this.setState({delayCheck: o.checked});
    this.handleCheckData({...this.state, delayCheck: o.checked});
}

public search(event, object): void {
    this.setState({input: object.value});
    this.handleCheckData(this.state, object.value);
}

public render(): JSX.Element {
    console.log('state: ', this.state);

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
                                <Checkbox toggle defaultChecked value='arrival' onChange={this.handleArrivalCheck} label={{ children: 'Прилет' }}/>
                            </Grid.Column>
                            <Grid.Column key={3}>
                                <Checkbox toggle defaultChecked value='departure' onChange={this.handleDepartureCheck} label={{ children: 'Отлет' }}/>
                            </Grid.Column>
                            <Grid.Column key={5}>
                                <Checkbox toggle value='delay' onChange={this.handleDelayCheck} label={{ children: 'Только задержанные рейсы' }}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={5}>
                            <Grid.Column key={1}><Input fluid onChange={this.search} icon="search" placeholder="Search..."/></Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            
                <Table celled>
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
                        {this.state.flights.length ? this.state.flights.map((item, key) => {
                            console.log(key, this.state.currentPage);
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
                    totalPages={this.state.flights.length / this.state.totalPages} 
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