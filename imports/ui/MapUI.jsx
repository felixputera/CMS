// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import GoogleMapReact, { Marker } from 'google-map-react';
import { createContainer } from 'meteor/react-meteor-data';

import SideBar from './SideBarUI.jsx';
import { Shelters } from '../api/shelters/shelters.js';
// import { googleMapsClient } from '../utils/maps-client.js'

const AnyReactComponent = ({ text, kelas }) => <div className={kelas}>{text}</div>;
// import { googleMapsClient } from '../utils/maps-client.js'

class MapUI extends Component {
    constructor(props){
        super(props);
        this.state = {
            order: this.props.order,
        }
    }

    placeMarkers(){
        let markers = this.props.markers;
        let filtered = [];
        this.state.order.forEach(category => {
            filtered.unshift(markers[category].map((marker) => {
                return (
                    <AnyReactComponent
                    key={marker._id}
                    lat={marker.latitude}
                    lng={marker.longitude}
                    text={marker.name}
                    kelas={category}
                    />
                    );
            }));
        });
        return filtered;
    }

    // refresh() {
    //     ReactDOM.findDOMNode(this.refs.map).innerHTML = placeMarkers();
    //     console.log("refresh called!");
    // }

    render(){
        return (
            <div className="map-ui">
                <GoogleMapReact ref="map"
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
        markers:{
            "Shelters": Shelters.find().fetch().slice(1,30),
            "Crises": Shelters.find().fetch().slice(31,60),
        },
    };
}, MapUI)

MapUI.PropTypes = {
    markers: PropTypes.object.isRequired,
    order: PropTypes.array.isRequired,
}