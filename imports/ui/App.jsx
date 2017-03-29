// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SideBarUI from './SideBarUI.jsx';
import LoginUI from './LoginUI.jsx';
// import MapUI from './MapUI.jsx';

class App extends Component {

    render(){
        return(
            <MuiThemeProvider>
                <div className="container">
                    <header>
                        <h2>Crisis Management System</h2>
                    </header>
                        <SideBarUI/>
                    <LoginUI/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;