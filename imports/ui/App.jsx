// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createContainer } from 'meteor/react-meteor-data';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import SideBarUI from './SideBarUI.jsx';
import LoginUI from './LoginUI.jsx';

import { Shelters } from '../api/shelters/shelters.js';
import { Crises } from '../api/crises/crises.js';

class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <MuiThemeProvider>
                <div className="container">
                    <header>
                        <h2>Crisis Management System</h2>
                    </header>
                        <SideBarUI mapMarkers={this.props.mapMarkers} reportInfo={this.props.reportInfo}/>
                    <LoginUI/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('shelters');
    Meteor.subscribe('crises.fire');
    Meteor.subscribe('crises.flood');
    Meteor.subscribe('crises.road');
    return{
        mapMarkers:{
            "Shelters": Shelters.find().fetch().slice(0,30),
            "Crises": Crises.find().fetch(),
            "Requests": Crises.find({ assistance: true, resolved: false }).fetch(),
        },
        reportInfo:{
            "Shelters": Shelters.find().count(),
            "Fire": Crises.find({type:"fire"}).count(),
            "Flood": Crises.find({type:"flood"}).count(),
            "Road": Crises.find({type:"road"}).count(),
        }
    };
}, App)