//import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';

import SideBarUI from './SideBarUI.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
// import MapUI from './MapUI.jsx';

class App extends Component {
    render(){
        return(
            <div className="container">
                <header>
                    <h2>Crisis Management System</h2>
                </header>
                <SideBarUI/>
                <AccountsUIWrapper className="login"/>
            </div>
        );
    }
}

export default App;