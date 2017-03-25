// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';

import SideBarUI from './SideBarUI.jsx';

class App extends Component {

    render(){
        return(
            <div className="container">
                <header>
                    <h1>Crisis Management System</h1>
                </header>
                <SideBarUI/>
            </div>
        );
    }
}

export default App;