// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'React';
import GoogleMapReact from 'google-map-react';

import SideBar from './SideBar.jsx';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class MapUI extends Component {
    
    props = {
        center: {lat: 59.95, lng: 30.33},
        zoom: 11
    };

    render(){
        return (
            <div className="map-ui">
                <GoogleMapReact
                defaultCenter={{lat: 59.95, lng: 30.33}}
                defaultZoom={11}>

                <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text={'Kreyser Avrora'}/>

                </GoogleMapReact>
            </div>
        );
    }
}