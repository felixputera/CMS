// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import Sidebar from 'react-sidebar'
import ReactDOM from 'react-dom';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import MapUI from './MapUI.jsx';
import Reports from './Reports.jsx';
import Requests from './Requests.jsx';

class SideBarUI extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            // mainMap: <MapUI order={['Shelters','Crises']} />,
            order: [{'name':'Shelters','hide':false},
                    {'name':'Fire','hide':false},
                    {'name':'Flood','hide':false},
                    {'name':'Road','hide':false}],
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
        // console.log("sidebar now: " + this.state.order);
        // console.log(this._mainMap);
        // this._mainMap.placeMarkers();
        // console.log(this.refs.sideBar.props.children.props.refresh());
    }

    sidebarContent() {
        return (
            <div className="side-bar-content">
                <Reports order={this.state.order} info={this.props.reportInfo} onOrderChanged={this.handleChange.bind(this)}/>
                {/*{ Meteor.userId() in adminWololo?
                }*/}
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Requests requestlist={this.props.mapMarkers.Requests}/>
                </MuiThemeProvider>
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

export default SideBarUI;