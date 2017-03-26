// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import GoogleMapReact, { Marker } from 'google-map-react';
import { createContainer } from 'meteor/react-meteor-data';

import SideBar from './SideBarUI.jsx';
import { Shelters } from '../api/shelters/shelters.js';
// import { googleMapsClient } from '../utils/maps-client.js'

const AnyReactComponent = ({ text }) => <div className="markers">{text}</div>;

class MapUI extends Component {

    placeMarkers(){
        let markers = this.props.markers;
        return markers.map((marker) => {
            return (
                <AnyReactComponent
                key={marker._id}
                lat={marker.latitude}
                lng={marker.longitude}
                text={marker.name}
                />
            );
        });
    }

    render(){
        return (
            <div className="map-ui">
                <GoogleMapReact
                center={{lat: 1.378461, lng: 103.848988}}
                zoom={12}
                bootstrapURLKeys={{
                    key: 'AIzaSyDbhCpS4q1-0LzbLuepBT9JI7bV5PzcP2I',
                    language: 'en'
                }} >

                {this.placeMarkers()}

                </GoogleMapReact>
            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('shelters');
    return{
        markers: Shelters.find().fetch().slice(1,30),
    };
}, MapUI)

MapUI.PropTypes = {
    markers: PropTypes.array.isRequired,
}