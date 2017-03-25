// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import GoogleMapReact, { Marker } from 'google-map-react';

import SideBar from './SideBarUI.jsx';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class MapUI extends Component {
    
    // static defaultProps = {
    //     center: {lat: 59.95, lng: 30.33},
    //     zoom: 11
    // };

    render(){
        return (
            <div className="map-ui">
                <h2>MapUI!</h2>
                <GoogleMapReact
                center={{lat: 59.95, lng: 30.33}}
                zoom={11}
                bootstrapURLKeys={{
                    key: 'AIzaSyDbhCpS4q1-0LzbLuepBT9JI7bV5PzcP2I',
                    language: 'en'
                }} >

                <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text={'Kreyser Avrora'}/>

                </GoogleMapReact>
            </div>
        );
    }
}