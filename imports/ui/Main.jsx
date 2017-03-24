// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'React';

import SideBar from './SideBar.jsx';
import MapUI from './MapUI.jsx';

class Main extends Component {

    render(){
        return(
            <div className="container">
                <header>
                    <h1>Container!</h1>
                </header>
                <SideBar />
                <MapUI />
            </div>
        );
    }
}

export default Main;