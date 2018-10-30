import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { Header, Button, Container, Table, Pagination, Grid, Checkbox, Input } from 'semantic-ui-react';


interface IProps {
    onPaginate?: any,
    flights?: any,
    totalPages?: any,
    activePage?: any,
    headers?: any
};

class PaginatedTable extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const {onPaginate, flights, totalPages, headers, activePage} = this.props;

        console.log('1: ', flights);

        return(
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            {headers.length && headers.map((item, key) => {
                                return(
                                    <Table.HeaderCell key={key}>{item}</Table.HeaderCell>
                                );
                            })}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {flights.length ? flights.map((item, key) => {
                            if (key >= (activePage - 1) * totalPages && key <= activePage * totalPages - 1) {
                                return(
                                    <Table.Row negative={item.delay} positive={!item.delay} key={key}>
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
                    totalPages={flights.length / totalPages}
                    activePage={activePage}
                    onPageChange={onPaginate}
                    pointing
                    secondary
                    firstItem={null}
                    lastItem={null}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginatedTable);