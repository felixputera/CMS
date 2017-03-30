// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import GoogleMapReact, { Marker } from 'google-map-react';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';

import SideBar from './SideBarUI.jsx';
// import { googleMapsClient } from '../utils/maps-client.js'

const AnyReactComponent = ({ text, kelas }) => <div className={kelas}>{text}</div>;
// import { googleMapsClient } from '../utils/maps-client.js'

export default class MapUI extends Component {
    constructor(props){
        super(props);
        this.state = {
            order: this.props.order,
        }
    }

    placeShelterMarkers(){
        /*let filtered = [];
        this.state.order.forEach(category => {
            filtered.unshift(this.props.markers[category].map((marker) => {
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
        return filtered;*/
        let orderedMarkers = this.props.markers;
        // if (this.state.hideCompleted) {
        // filteredTasks = filteredTasks.filter(task => !task.checked);
        // }
        return orderedMarkers.Shelters.map((marker) => {
            return this.props.order.map((value, index) => {
                if(value.name == "Shelters"){
                    let zIndex;
                    if(!value.hide){
                        zIndex = classnames("shelters", 'index' + index);
                    }
                    else {
                        zIndex = classnames("shelters", 'index' + index, 'hiddenMarkers')
                    }
                    return (
                        <AnyReactComponent
                        key={marker._id}
                        lat={marker.latitude}
                        lng={marker.longitude}
                        text={marker.name}
                        kelas={zIndex}
                        />
                    );}
                });
            });
    }

    placeCrisesMarkers(){
        let orderedMarkers = this.props.markers;

        return orderedMarkers.Crises.map((marker) => {
            return this.props.order.map((value, index) => {
                if(value.name.toLowerCase() == marker.type){
                    let zIndex;
                    if(!value.hide){
                        zIndex = classnames(marker.type, 'index' + index);
                    }
                    else {
                        zIndex = classnames(marker.type, 'index' + index, 'hiddenMarkers')
                    }
                    return (
                    <AnyReactComponent
                    key={marker._id}
                    lat={marker.latitude}
                    lng={marker.longitude}
                    text={marker.name}
                    kelas={zIndex}
                    />
                    );
                }
            });
        });
    }

    // refresh() {
    //     ReactDOM.findDOMNode(this.refs.map).innerHTML = placeMarkers();
    //     console.log("refresh called!");
    // }

    render(){
        // console.log(this.props.order);
        return (
            <div className="map-ui">
                <GoogleMapReact ref="map"
                center={{lat: 1.378461, lng: 103.848988}}
                zoom={12}
                bootstrapURLKeys={{
                    key: 'AIzaSyDbhCpS4q1-0LzbLuepBT9JI7bV5PzcP2I',
                    language: 'en'
                }} >

                {this.placeCrisesMarkers()}
                {this.placeShelterMarkers()}

                </GoogleMapReact>
            </div>
        );
    }
}

MapUI.propTypes = {
    markers: PropTypes.object.isRequired,
    order: PropTypes.array.isRequired,
}