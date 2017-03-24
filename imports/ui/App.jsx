// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';

import SideBar from './SideBar.jsx';
import MapUI from './MapUI.jsx';

class App extends Component {

    render(){
        return(
            <div className="container">
                <header>
                    <h1>Container!</h1>
                </header>
                <MapUI />
                <SideBar />
            </div>
        );
    }
}

export default App;