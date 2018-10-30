import * as React from 'react';
import {Router, Route, Switch} from 'react-router';
import {createBrowserHistory} from 'history';
import * as PathConstants from '../../constants/PathsConstants';

import MainPage from '../MainPage/MainPage';

import '../../../static/main.scss';

const history = createBrowserHistory();

export default class App extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <Router history={ history }>
                <Switch>
                    <Route exact path={ PathConstants.MAINPAGE } component={ MainPage } />
                </Switch>
            </Router>
        );
    }
}