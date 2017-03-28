// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import Sidebar from 'react-sidebar'
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import MapUI from './MapUI.jsx';
import Reports from './Reports.jsx';
import Requests from './Requests.jsx';

import { Shelters } from '../api/shelters/shelters.js';
import { Crises } from '../api/crises/crises.js';

class SideBarUI extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            // mainMap: <MapUI order={['Shelters','Crises']} />,
            order: ['Shelters', 'Fire', 'Flood', 'Road'],
        }

        // let map = <MapUI order={this.state.order} ref={(mainMap) => this._mainMap = mainMap}/>;
        // this.setState({
        //     mainMap: <MapUI/>,
        // });

        // this.state = {
        // hideShelter: false,
        // hideCrises: false,
        // };
    }
    
    // toggleHideShelter() {
    //     this.setState({
    //     hideShelter: !this.state.hideShelter,
    //     });
    // }

    handleChange(newOrder){
        this.setState({
            order: newOrder,
        });
        console.log("sidebar now: " + this.state.order);
        // console.log(this._mainMap);
        // this._mainMap.placeMarkers();
        // console.log(this.refs.sideBar.props.children.props.refresh());
    }

    sidebarContent() {
        return (
            <div className="side-bar-content">
                <Reports order={this.state.order} onOrderChanged={this.handleChange.bind(this)}/>
                {/*{ Meteor.userId() in adminWololo?
                }*/}
                <Requests/>
            </div>
        )
    }

    // createMap(){
    //     return createContainer(() => {
    //         return{
    //             order: this.state.order,
    //         }},
    //     this.props.mainMap);
    // }

    render(){
        // console.log('Bullshit ', this.props.mapMarkers)
        return(
            <div className="side-bar">
                <Sidebar ref="sideBar"
                children={<MapUI order={this.state.order} markers={this.props.mapMarkers}/>}
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
    Meteor.subscribe('crises.fire');
    Meteor.subscribe('crises.flood');
    Meteor.subscribe('crises.road');
    return{
        mapMarkers:{
            "Shelters": Shelters.find().fetch().slice(0,30),
            "Crises": Crises.find().fetch(),
        },
    };
}, SideBarUI)

// SideBarUI.propTypes = {
//     mainMap: PropTypes.object.isRequired,
// }