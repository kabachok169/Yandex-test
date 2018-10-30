import * as React from 'react';

import {IFlight} from '../../../data';

import './PaginatedTable.scss';

import { Table, Pagination } from 'semantic-ui-react';


interface IProps {
    onPaginate?: any,
    flights?: Array<IFlight>,
    totalPages?: any,
    activePage?: any,
    headers?: any
};

export default class PaginatedTable extends React.Component<IProps, any> {
    render() {
        const {onPaginate, flights, totalPages, headers, activePage} = this.props;

        return(
            <div className="table">
                <Table singleLine columns={6} textAlign="center">
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
                        {flights.length ? flights.map((item: IFlight, key: number) => {
                            if (key >= (activePage - 1) * totalPages && key <= activePage * totalPages - 1) {
                                return(<Table.Row negative={item.delay} positive={!item.delay} key={key}>
                                            <Table.Cell>{item.time}</Table.Cell>
                                            <Table.Cell>{item.destination}</Table.Cell>
                                            <Table.Cell>{item.number}</Table.Cell>
                                            <Table.Cell>{item.arrivalTime}</Table.Cell>
                                            <Table.Cell>{item.status ? 'Прилет' : 'Вылет'}</Table.Cell>
                                            <Table.Cell>{item.delay ? 'Да' : 'Нет'}</Table.Cell>
                                        </Table.Row>
                                );
                            }
                        }) 
                        : ''}
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
