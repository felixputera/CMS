import React, {Component, PropTypes} from 'react';
import GoogleMapReact from 'google-map-react';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';

import MapMarker from './MapMarker.jsx';
import { SouthWestPoints, NorthWestPoints, CentralPoints, NorthEastPoints, SouthEastPoints } from './AreaPSIMap.js';

const PSIMarkerLoc = {
    west: { lat:1.3611281555974557, lng:103.72350353344723 },
    north: { lat:1.428742690377561, lng:103.81208080395504 },
    central: { lat:1.3679926634189457, lng:103.84529728039547},
    east: { lat:1.3758010171840738, lng:103.91851085766598},
    south: { lat:1.3294653618669372, lng:103.9470066462402},
}

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
                    <MapMarker
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
                        zIndex = classnames("marker", "shelters", 'index' + index);
                    }
                    else {
                        return;
                        // zIndex = classnames("marker", "shelters", 'index' + index, 'hiddenMarkers')
                    }
                    return (
                        <MapMarker
                        key={marker._id}
                        lat={marker.latitude}
                        lng={marker.longitude}
                        name={marker.name}
                        type={"shelters"}
                        address={marker.address}
                        postalCode={marker.postalCode}
                        region={marker.region}
                        kelas={zIndex}
                        hour={null}
                        unitNumber={null}
                        desc={marker.type}
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
                        zIndex = classnames("marker", marker.type, 'index' + index);
                    }
                    else {
                        return;
                        // zIndex = classnames("marker", marker.type, 'index' + index, 'hiddenMarkers')
                    }
                    return (
                    <MapMarker
                    key={marker._id}
                    taianjing={marker._id}
                    lat={marker.latitude}
                    lng={marker.longitude}
                    type={marker.type}
                    address={marker.address}
                    postalCode={marker.postalCode}
                    region={marker.region}
                    kelas={zIndex}
                    hour={marker.hour}
                    unitNumber={marker.unitNumber}
                    desc={marker.description}
                    />
                    );
                }
            });
        });
    }

    placePSIMarkers(){
        let i=0
        if(this.props.markers.PSI != false){
            let orderedMarkers = this.props.markers.PSI[0];
            return (Object.keys(orderedMarkers)).map((region) => {
                if(region == "time" || region == "_id") return null;
                return this.props.order.map((value, index) => {
                    if(value.name == "PSI"){
                        let zIndex;
                        if(!value.hide){
                            zIndex = classnames("marker", "PSI", 'index' + index);
                        }
                        else {
                            return;
                            // zIndex = classnames("marker", "PSI", 'index' + index, 'hiddenMarkers');
                        }
                        return (
                            <MapMarker
                            key={i++}
                            lat={PSIMarkerLoc[region].lat}
                            lng={PSIMarkerLoc[region].lng}
                            type={"psi"}
                            address={region}
                            kelas={zIndex}
                            hour={null}
                            desc={orderedMarkers[region]}
                            />
                        )
                    }
                })
        })}}
        

    placeTempMarker(){
        if(this.props.tempMarker){
            // console.log(this.props.tempMarker);
            return (
                <MapMarker
                lat={this.props.tempMarker.lat}
                lng={this.props.tempMarker.lng}
                type="add"
                kelas="temp-marker"
                clearSelf={this.props.clearTempMarker.bind(this)} />
            )
        } else {
            return;
        }
    }

    drawAreaPSI(map, maps, boolHide){
        // console.log("rerender psi");

        const SouthWest = new maps.Polygon({
            paths: SouthWestPoints,
            strokeColor:'#FF6F00',
            strokeWeight: 1,
            strokeOpacity: 0.5,
            fillColor: '#FF6F00',
            fillOpacity: 0.2,
        });

        const NorthWest = new maps.Polygon({
            paths: NorthWestPoints,
            strokeColor:'#64DD17',
            strokeWeight: 1,
            strokeOpacity: 0.5,
            fillColor: '#64DD17',
            fillOpacity: 0.2,
        });

        const Central = new maps.Polygon({
            paths: CentralPoints,
            strokeColor:'#00838F',
            strokeWeight: 1,
            strokeOpacity: 0.5,
            fillColor: '#00838F',
            fillOpacity: 0.2,
        });

        const NorthEast = new maps.Polygon({
            paths: NorthEastPoints,
            strokeColor:'#4527A0',
            strokeWeight: 1,
            strokeOpacity: 0.5,
            fillColor: '#4527A0',
            fillOpacity: 0.2,
        });

        const SouthEast = new maps.Polygon({
            paths: SouthEastPoints,
            strokeColor:'#FFD600',
            strokeWeight: 1,
            strokeOpacity: 0.5,
            fillColor: '#FFD600',
            fillOpacity: 0.2,
        });

        if(boolHide){
            SouthWest.setMap(null);
            NorthWest.setMap(null);
            Central.setMap(null);
            NorthEast.setMap(null);
            SouthEast.setMap(null);
        } else {
            SouthWest.setMap(map);
            NorthWest.setMap(map);
            Central.setMap(map);
            NorthEast.setMap(map);
            SouthEast.setMap(map);
        }
    }

    // refresh() {
    //     ReactDOM.findDOMNode(this.refs.map).innerHTML = placeMarkers();
    //     console.log("refresh called!");
    // }

    render(){
        // console.log(this.props.order);
        // console.log("rerenderMapUI")
        return (
            <div className="map-ui">
                <GoogleMapReact ref="map"
                center={this.props.center}
                zoom={11}
                bootstrapURLKeys={{
                    key: 'AIzaSyDbhCpS4q1-0LzbLuepBT9JI7bV5PzcP2I',
                    language: 'en'
                }}
                onClick={this.props.setTempMarker.bind(this)}
                onGoogleApiLoaded={({map, maps}) => this.drawAreaPSI(map, maps, false)}
                yesIWantToUseGoogleMapApiInternals >

                {this.placeTempMarker()}
                {this.placeCrisesMarkers()}
                {this.placeShelterMarkers()}
                {this.placePSIMarkers()}

                </GoogleMapReact>
            </div>
        );
    }
}

MapUI.propTypes = {
    markers: PropTypes.object.isRequired,
    order: PropTypes.array.isRequired,
}