import React, {Component, PropTypes} from 'react';
import Sidebar from 'react-sidebar';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MapUI from './MapUI.jsx';
import Reports from './Reports.jsx';
import Requests from './Requests.jsx';

import { Shelters } from '../api/shelters/shelters.js';
import { Crises } from '../api/crises/crises.js';
import { Psi } from '../api/psi/psi.js';


class SideBarUI extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            // mainMap: <MapUI order={['Shelters','Crises']} />,
            order: [{'name':'Shelters','hide':true},
                    {'name':'Fire','hide':false},
                    {'name':'Flood','hide':false},
                    {'name':'Road','hide':false},
                    {'name':'GasLeak','hide':false},
                    {'name':'PSI','hide':false},
                    ],
            // hidePSI: false,
            tempMarker: null,
            mapCenter: {lat: 1.360441703738914, lng: 103.81276744946285},
            hideForm: true,
        }
    }

    handleChange(newOrder){
        this.setState({
            order: newOrder,
            // hidePSI: this.hidePSIstate(newOrder),
        });
        // if(newOrder.forEach((value) => { if(value.name == 'Shelters'){ return value.hide }})){
        //     Meteor.subscribe('shelters');
        // } else {
        //     Meteor.stop('shelters');
        // }
    }

    hidePSIstate(newOrder){
        newOrder.forEach((value) => {
            if(value.name == 'PSI'){
                return value.hide;
            }
        })
    }

    setTempMarker({x, y, lat, lng, event}){
        // console.log(lat,lng);
        if(!this.state.hideForm){
            this.setState({
                tempMarker: {'lat': lat, 'lng': lng},
            });
        }
        console.log(lat, lng);
    }

    clearTempMarker(){
        this.setState({
            tempMarker: null,
        })
    }

    findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }
    setCenter(event){
        // console.log(event.target);
        let storage = this.findAncestor(event.target, "request-item");
        // console.log(storage);
        let lat = parseFloat(storage.getElementsByClassName("lat")[0].value);
        let lng = parseFloat(storage.getElementsByClassName("lng")[0].value);
        // console.log(lat,lng);
        // console.log(storage.getElementsByClassName("lat")[0].value);
        this.setState({
            mapCenter: {'lat': lat, 'lng': lng}
        })
    }

    hideShowForm(event){
        this.setState({
            hideForm: !this.state.hideForm,
        })
        if(!this.state.hideForm){
            this.clearTempMarker();
        }
    }

    sidebarContent() {
        return (
            <div className="side-bar-content">
                <Reports order={this.state.order} info={this.props.reportInfo} onOrderChanged={this.handleChange.bind(this)}/>
                { this.props.user?
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Requests requestlist={this.props.mapMarkers.Requests} setMapCenter={this.setCenter.bind(this)}
                    tempMarker={this.state.tempMarker} hideShowForm={this.hideShowForm.bind(this)} hideForm={this.state.hideForm}/>
                </MuiThemeProvider> : null
                 }
            </div>
        )
    }

    render(){
        // console.log('Bullshit ', this.props.mapMarkers)
        return(
            <div className="side-bar">
                <Sidebar ref="sideBar"
                    children={<MapUI
                    hidePSI={this.state.hidePSI}
                    order={this.state.order}
                    markers={this.props.mapMarkers}
                    tempMarker={this.state.tempMarker}
                    center={this.state.mapCenter}
                    setTempMarker={this.setTempMarker.bind(this)}
                    setCenter={this.setCenter.bind(this)}
                    clearTempMarker={this.clearTempMarker.bind(this)}
                    />}
                sidebar={
                    this.sidebarContent()
                }
                docked={true}
                styles={
                    {root:
                        {
                            top: '60px',
                            backgroundColor: '#fcfcfc',
                        },
                    sidebar:
                        {
                            zIndex:999,
                        }
                    }
                }
                />
            </div>
        );
    }
}

SideBarUI.propTypes = {
    mapMarkers: React.PropTypes.object.isRequired,
}

export default createContainer(() => {
    Meteor.subscribe('shelters');
    Meteor.subscribe('psi');
    Meteor.subscribe('crises.fire');
    Meteor.subscribe('crises.flood');
    Meteor.subscribe('crises.road');
    Meteor.subscribe('crises.gasleak');
    return{
        mapMarkers:{
            "Shelters": Shelters.find().fetch(),
            "PSI": Psi.find().fetch().slice(0,1),
            "Crises": Crises.find().fetch(),
            "Requests": Crises.find({ assistance: true, resolved: false }).fetch(),
        },
        reportInfo:{
            "Shelters": Shelters.find().count(),
            "Fire": Crises.find({type:"fire"}).count(),
            "Flood": Crises.find({type:"flood"}).count(),
            "Road": Crises.find({type:"road"}).count(),
            "GasLeak": Crises.find({type:"gasleak"}).count(),
        },
        user: Meteor.userId(),
    };
}, SideBarUI)