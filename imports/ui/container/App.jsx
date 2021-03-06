import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createContainer } from 'meteor/react-meteor-data';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AccountsButton from  '../AccountsButton.jsx'


export default class App extends Component {
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
                        <h2><a href="/admin" >Crisis Management System</a></h2>
                        <AccountsButton/>
                    </header>
                    {main}
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    main: PropTypes.object.isRequired,
};