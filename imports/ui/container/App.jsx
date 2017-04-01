import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createContainer } from 'meteor/react-meteor-data';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Meteor } from 'meteor/meteor';

import AccountsButton from  '../AccountsButton.jsx'

injectTapEventPlugin();

class App extends Component {
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

const logoutHandler = () => {
    Meteor.logout();
    location.reload();
};

export default createContainer(() => {
    return{ };
}, App)