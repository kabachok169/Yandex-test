import * as React from 'react';

import './MainPage.scss';

import { Header, Button } from 'semantic-ui-react';

import {Redirect} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

interface IProps {

}

class MainPage extends React.Component<IProps, any> {

    constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div className="header">
                <Header as={'h1'}>WELCOME BACK!!!!!!</Header>
                <Button>Hi</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);