import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createContainer } from 'meteor/react-meteor-data';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Subscribe from '../Subscribe.jsx'

injectTapEventPlugin();

export default class Public extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {main} = this.props;
        console.log('render working');

        return(
            <MuiThemeProvider>
                <div className="container">
                    <header>
                        <h2><a href="/" >Crisis Management System</a></h2>
                        <Subscribe />
                    </header>
                    {main}
                </div>
            </MuiThemeProvider>
        );
    }
}

Public.propTypes = {
    main: PropTypes.object.isRequired,
};