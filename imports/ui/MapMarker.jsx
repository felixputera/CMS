import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

const mapIcon = {
    shelters: "nature",
    flood: "pool",
    fire: "whatshot",
    road: "traffic",
    add: "add_location",
}

const hoverColor = {
    shelters: "#FFE082",
    fire: "#EF9A9A",
    flood: "#81D4FA",
    road: "#FFCC80",
    gasleak: "#B2DFDB",
    add: "#404040",
}

const iconColor = {
    shelters: "#f4c20d",
    fire: "#db3236",
    flood: "#4885ed",
    road: "#FF9800",
    gasleak: "00695C",
    add: "#404040",
}

export default class MapMarker extends Component {
    constructor(props){
        super(props);
        this.state = {
            showInfo: false,
        };
    }

    deleteMarker(){
        console.log("tai");
        Meteor.call('crises.setResolved', this.props.taianjing);
    }

    render(){
        return(
            <div className={this.props.kelas}>
                {/*<IconButton onTouchTap={this.toggleClickOrClear.bind(this)}>*/}
                <FontIcon className="material-icons md-48"
                color={iconColor[this.props.type]}
                hoverColor={hoverColor[this.props.type]}
                >
                    {mapIcon[this.props.type]}
                </FontIcon>
                {/*</IconButton>*/}
                <div className="marker-info" style={{backgroundColor:"#FAFAFA"}}>
                    {this.props.address}
                    <RaisedButton onTouchTap={this.deleteMarker.bind(this)} label="Delete" />
                </div>
            </div>
        )
    }
}